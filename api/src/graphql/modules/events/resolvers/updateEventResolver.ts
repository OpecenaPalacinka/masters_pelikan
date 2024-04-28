import { GraphQLError } from "graphql";

import {
  Event,
  EventToType,
  Causality,
  AntecedentSuccedent,
  MutationUpdateEventArgs,
} from "../../../../types/graphqlTypesGenerated";
import { CustomContext } from "../../../../types/types";
import { PoolClient } from "pg";
import { format } from "date-fns";

export const updateEventResolver = async (
  _: unknown,
  { id: eventId, event: args }: MutationUpdateEventArgs,
  { dbConnection }: CustomContext,
): Promise<Event> => {
  const {
    user_id,
    happened,
    ended,
    description,
    label,
    sentiment_id,
    event_type_id,
    succedent,
    antecedent,
    causality_id,
  } = args;

  try {
    const oldEvent = await dbConnection.query<Event>(
      `SELECT * FROM events WHERE event_id = $1`,
      [eventId],
    );

    if (oldEvent.rowCount === 0) {
      throw new GraphQLError(`Event with id ${eventId} does not exist`);
    }

    const formattedHappened = new Date(happened);
    const endDate = ended ? new Date(ended) : null;

    const new_event = await dbConnection.query<Event>(
      `UPDATE events SET user_id = $1, happened = $2, ended = $3, description = $4, label = $5, sentiment_id = $6 WHERE event_id = $7 RETURNING *`,
      [
        user_id,
        formattedHappened,
        endDate,
        description,
        label,
        sentiment_id,
        eventId,
      ],
    );

    // Event type
    const eventType = await dbConnection.query<EventToType>(
      `SELECT * FROM events_to_types WHERE event_id = $1`,
      [eventId],
    );

    if (eventType.rows[0].event_type_id.event_type_id !== event_type_id) {
      await dbConnection.query<EventToType>(
        `UPDATE events_to_types SET event_type_id = $1 WHERE event_id = $2 RETURNING *`,
        [event_type_id, eventId],
      );
    }

    const oldCausality = await dbConnection.query<Causality>(
      `SELECT * FROM causalities WHERE event_id = $1`,
      [eventId],
    );

    // Causality
    if (
      oldCausality.rowCount == 0 &&
      causality_id &&
      (antecedent || succedent)
    ) {
      await dbConnection.query<Causality>(
        `INSERT INTO causalities (event_id, causality_type_id, antecedent, succedent) VALUES ($1, $2, $3, $4) RETURNING *`,
        [eventId, causality_id, antecedent, succedent],
      );
    } else if (!antecedent && !succedent) {
      await dbConnection.query<AntecedentSuccedent>(
        `DELETE FROM causalities WHERE event_id = $1`,
        [eventId],
      );
    } else if (
      causality_id !==
        oldCausality.rows[0].causality_type_id.causality_types_id ||
      antecedent !== oldCausality.rows[0].antecedent ||
      succedent !== oldCausality.rows[0].succedent
    ) {
      await dbConnection.query<Causality>(
        `UPDATE causalities SET causality_type_id = $2, antecedent = $3, succedent = $4 WHERE event_id = $1 RETURNING *`,
        [eventId, causality_id, antecedent, succedent],
      );
    }

    if (
      antecedent &&
      (oldCausality.rows[0] === undefined ||
        antecedent !== oldCausality.rows[0].antecedent)
    ) {
      if (
        oldCausality.rows[0] === undefined ||
        oldCausality.rows[0].antecedent === null
      ) {
        await addRelation(eventId, event_type_id, antecedent, 1, dbConnection);
      } else {
        await updateRelation(
          eventId,
          event_type_id,
          antecedent,
          1,
          dbConnection,
        );
      }
    } else if (
      antecedent === null &&
      oldCausality.rows[0] !== undefined &&
      oldCausality.rows[0].antecedent !== null
    ) {
      await dbConnection.query(
        `DELETE FROM antecedents_succedents WHERE event_id = $1 AND relationship = 1`,
        [eventId],
      );
    }

    if (
      succedent &&
      (oldCausality.rows[0] === undefined ||
        succedent !== oldCausality.rows[0].succedent)
    ) {
      if (
        oldCausality.rows[0] === undefined ||
        oldCausality.rows[0].succedent === null
      ) {
        await addRelation(eventId, event_type_id, succedent, 2, dbConnection);
      } else {
        await updateRelation(
          eventId,
          event_type_id,
          succedent,
          2,
          dbConnection,
        );
      }
    } else if (
      succedent === null &&
      oldCausality.rows[0] !== undefined &&
      oldCausality.rows[0].succedent !== null
    ) {
      await dbConnection.query(
        `DELETE FROM antecedents_succedents WHERE event_id = $1 AND relationship = 2`,
        [eventId],
      );
    }

    new_event.rows[0].happened = format(
      new Date(new_event.rows[0].happened),
      "yyyy-MM-dd",
    );
    if (new_event.rows[0].ended) {
      new_event.rows[0].ended = format(
        new Date(new_event.rows[0].ended),
        "yyyy-MM-dd",
      );
    }

    return new_event.rows[0];
  } catch (err) {
    throw new GraphQLError("Failed to update event", {
      extensions: { code: "EVENT_UPDATE_FAILED" },
    });
  }
};

async function updateRelation(
  event_id: Number,
  event_type_id: Number,
  related_id: Number,
  relation: Number,
  dbConnection: PoolClient,
): Promise<void> {
  const eventTypeRel = await dbConnection.query(
    `SELECT event_type_id FROM events_to_types WHERE event_id = $1`,
    [related_id],
  );

  await dbConnection.query<AntecedentSuccedent>(
    `UPDATE antecedents_succedents SET event_type_id = $1, related_type_id = $2 WHERE event_id = $3 AND relationship = $4 RETURNING *`,
    [event_type_id, eventTypeRel.rows[0].event_type_id, event_id, relation],
  );
}

async function addRelation(
  event_id: Number,
  event_type_id: Number,
  related_id: Number,
  relation: Number,
  dbConnection: PoolClient,
): Promise<void> {
  const eventTypeRel = await dbConnection.query(
    `SELECT event_type_id FROM events_to_types WHERE event_id = $1`,
    [related_id],
  );

  await dbConnection.query<AntecedentSuccedent>(
    `INSERT INTO antecedents_succedents (event_id, event_type_id, related_type_id, relationship) VALUES ($1, $2, $3, $4) RETURNING *`,
    [event_id, event_type_id, eventTypeRel.rows[0].event_type_id, relation],
  );
}
