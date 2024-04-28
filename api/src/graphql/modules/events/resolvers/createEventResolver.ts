import { GraphQLError } from "graphql";

import {
  MutationCreateEventArgs,
  Event,
  EventToType,
  Causality,
  AntecedentSuccedent,
} from "../../../../types/graphqlTypesGenerated";
import { CustomContext } from "../../../../types/types";
import { PoolClient } from "pg";
import { format } from "date-fns";

export const createEventResolver = async (
  _: unknown,
  { event: args }: MutationCreateEventArgs,
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

  const formattedHappened = new Date(happened);
  const endDate = ended ? new Date(ended) : null;

  try {
    const new_event = await dbConnection.query<Event>(
      `INSERT INTO events (user_id, happened, ended, description, label, sentiment_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [user_id, formattedHappened, endDate, description, label, sentiment_id],
    );

    if (new_event.rowCount !== null && new_event.rowCount > 0) {
      const event_id = new_event.rows[0].event_id;

      await dbConnection.query<EventToType>(
        `INSERT INTO events_to_types (event_id, event_type_id) VALUES ($1, $2) RETURNING *`,
        [event_id, event_type_id],
      );

      if (causality_id && (antecedent || succedent)) {
        await dbConnection.query<Causality>(
          `INSERT INTO causalities (event_id, causality_type_id, antecedent, succedent) VALUES ($1, $2, $3, $4) RETURNING *`,
          [event_id, causality_id, antecedent, succedent],
        );

        if (antecedent) {
          await addRelation(
            event_id,
            event_type_id,
            antecedent,
            1,
            dbConnection,
          );
        }

        if (succedent) {
          await addRelation(
            event_id,
            event_type_id,
            succedent,
            2,
            dbConnection,
          );
        }
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
    } else {
      throw new GraphQLError("No event created", {
        extensions: { code: "NO_EVENT_CREATED" },
      });
    }
  } catch (err) {
    throw new GraphQLError("Failed to create event", {
      extensions: { code: "EVENT_CREATION_FAILED" },
    });
  }
};

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
