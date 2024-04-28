import { GraphQLError } from "graphql";
import {
  EventType,
  MutationDeleteUserArgs,
  User,
  Event,
} from "../../../../types/graphqlTypesGenerated";
import { CustomContext } from "../../../../types/types";

export const deleteUserResolver = async (
  _: unknown,
  { userId }: MutationDeleteUserArgs,
  { dbConnection }: CustomContext,
): Promise<string> => {
  try {
    // events
    const eventsSelected = await dbConnection.query<Event>(
      `SELECT * FROM events WHERE user_id = $1`,
      [userId],
    );

    const eventIds = eventsSelected.rows.map((event: Event) => event.event_id);

    // event to types
    const eventToTypes = await dbConnection.query(
      `DELETE FROM events_to_types WHERE event_id = ANY($1) RETURNING *`,
      [eventIds],
    );

    // event to types
    const antecedentsSuccedents = await dbConnection.query(
      `DELETE FROM antecedents_succedents WHERE event_id = ANY($1) RETURNING *`,
      [eventIds],
    );

    // event to types
    const causalities = await dbConnection.query(
      `DELETE FROM causalities WHERE event_id = ANY($1) OR antecedent = ANY($1) OR succedent = ANY($1) RETURNING *`,
      [eventIds],
    );

    // events
    const events = await dbConnection.query<Event>(
      `DELETE FROM events WHERE user_id = $1 RETURNING *`,
      [userId],
    );
    //event types
    const eventTypes = await dbConnection.query<EventType>(
      `UPDATE event_types SET user_id = null WHERE user_id = $1 RETURNING *`,
      [userId],
    );

    const user = await dbConnection.query<User>(
      `DELETE FROM users WHERE user_id = $1 RETURNING *`,
      [userId],
    );

    return "Success!";
  } catch (e) {
    throw new GraphQLError("Failed to delete user");
  }
};
