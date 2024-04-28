import { type Resolvers } from "../types/graphqlTypesGenerated";
import { signInResolver, signUpResolver } from "./modules/user/resolvers";
import { getAllUsersResolver } from "./modules/user/resolvers";
import { resetPasswordResolver } from "./modules/user/resolvers";
import {
  createEventTypeResolver,
  declineEventTypeResolver,
  eventTypeCreatorResolver,
  resendEventTypeResolver,
} from "./modules/eventTypes/resolvers";
import { getAllEventTypesResolver } from "./modules/eventTypes/resolvers";
import { acceptEventTypeResolver } from "./modules/eventTypes/resolvers";
import {
  createCausalityTypeResolver,
  getAllCausalityTypesResolver,
} from "./modules/causality_types/resolvers";
import { createSentimentResolver } from "./modules/sentiment/resolvers";
import { causalityEventResolver } from "./modules/causalities/resolvers";
import { causalityCausalityTypeResolver } from "./modules/causalities/resolvers";
import {
  createEventResolver,
  eventCreatorResolver,
  updateEventResolver,
} from "./modules/events/resolvers";
import { eventSentimentResolver } from "./modules/events/resolvers";
import {
  eventToTypesEventResolver,
  getAllEventsByEventTypeResolver,
  getAllEventTypesByEventIdResolver,
} from "./modules/EventToTypes/resolvers";
import { eventToTypesEventTypeResolver } from "./modules/EventToTypes/resolvers";
import { getAllEventsByUserIdResolver } from "./modules/events/resolvers";
import {
  getTopThreeAntecedentsResolver,
  getTopThreeSuccedentsResolver,
  parentEventResolver,
  parentEventTypeResolver,
  relatedEventTypeResolver,
} from "./modules/antecedentsSuccedents/resolvers";
import { userRoleResolver } from "./modules/user/resolvers/userRoleResolver";
import { getNotFilledEventTypesByUserIdResolver } from "./modules/eventTypes/resolvers";
import { updateEventTypeResolver } from "./modules/eventTypes/resolvers";
import { getCustomEventTypesByUserIdResolver } from "./modules/eventTypes/resolvers/getCustomEventTypesByUserIdResolver";
import { deleteEventTypeResolver } from "./modules/eventTypes/resolvers/deleteEventTypeResolver";
import { getAllEventsByUserIdsResolver } from "./modules/events/resolvers/getAllEventsByUserIdsResolver";
import { getEventTypesForReviewResolver } from "./modules/eventTypes/resolvers/getEventTypesForReviewResolver";
import { getAllEventTypesForLegendResolver } from "./modules/eventTypes/resolvers/getAllEventTypesForLegendResolver";
import { deleteUserResolver } from "./modules/user/resolvers/deleteUserResolver";
import { getNumberOfEventsByUserIdResolver } from "./modules/events/resolvers/getNumberOfEventsByUserIdResolver";
import { getNumberOfEventsByUserIdsResolver } from "./modules/events/resolvers/getNumberOfEventsByUserIdsResolver";
import { getNumberOfEventTypesByUserIdResolver } from "./modules/events/resolvers/getNumberOfEventTypesByUserIdResolver";
import { getAllEventsWithTypesByUserIdResolver } from "./modules/events/resolvers/getAllEventsWithTypesByUserIdResolver";
import { getAllCausalitiesByEventIdsResolver } from "./modules/causalities/resolvers/getAllCausalitiesByEventIdsResolver";

const resolvers: Resolvers = {
  //Mutations
  Mutation: {
    //Auth
    signUp: signUpResolver,
    resetPassword: resetPasswordResolver,
    signIn: signInResolver,
    deleteUser: deleteUserResolver,

    //Event types
    createEventType: createEventTypeResolver,
    acceptEventType: acceptEventTypeResolver,
    resendEventType: resendEventTypeResolver,
    declineEventType: declineEventTypeResolver,
    updateEventType: updateEventTypeResolver,
    deleteEventType: deleteEventTypeResolver,

    //Causality types
    createCausalityType: createCausalityTypeResolver,

    //Sentiment
    createSentiment: createSentimentResolver,

    //Event
    createEvent: createEventResolver,
    updateEvent: updateEventResolver,
  },

  //Queries
  Query: {
    //User
    getAllUsers: getAllUsersResolver,

    //Event types
    getAllEventTypes: getAllEventTypesResolver,
    getNotFilledEventTypesByUsedId: getNotFilledEventTypesByUserIdResolver,
    getCustomEventTypesByUserId: getCustomEventTypesByUserIdResolver,
    getEventTypesForReview: getEventTypesForReviewResolver,
    getAllEventTypesForLegend: getAllEventTypesForLegendResolver,
    getNumberOfEventTypesByUserId: getNumberOfEventTypesByUserIdResolver,

    //Event to types
    getAllEventsByEventType: getAllEventsByEventTypeResolver,
    getAllEventTypesByEventId: getAllEventTypesByEventIdResolver,

    //Events
    getAllEventsByUserId: getAllEventsByUserIdResolver,
    getAllEventsByUserIds: getAllEventsByUserIdsResolver,
    getNumberOfEventsByUserId: getNumberOfEventsByUserIdResolver,
    getNumberOfEventsByUserIds: getNumberOfEventsByUserIdsResolver,
    getAllEventsWithTypeByUserId: getAllEventsWithTypesByUserIdResolver,

    //Antecedents / Succedents
    getTopThreeAntecedents: getTopThreeAntecedentsResolver,
    getTopThreeSuccedent: getTopThreeSuccedentsResolver,

    // Causalities
    getAllCausalitiesByEventIds: getAllCausalitiesByEventIdsResolver,

    // Causality types
    getAllCausalityTypes: getAllCausalityTypesResolver,
  },

  //Parents Definitions
  Event: {
    user_id: eventCreatorResolver,
    sentiment_id: eventSentimentResolver,
  },
  EventType: {
    user_id: eventTypeCreatorResolver,
  },
  EventToType: {
    event_id: eventToTypesEventResolver,
    event_type_id: eventToTypesEventTypeResolver,
  },
  Causality: {
    event_id: causalityEventResolver,
    causality_type_id: causalityCausalityTypeResolver,
  },
  AntecedentSuccedent: {
    event_id: parentEventResolver,
    event_type_id: parentEventTypeResolver,
    related_type_id: relatedEventTypeResolver,
  },
  User: {
    role_id: userRoleResolver,
  },
};

export default resolvers;
