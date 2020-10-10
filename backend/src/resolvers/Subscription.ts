import mongoose from "mongoose";

import { pubsub } from "../server";

const newChatSubscription = {
	subscribe: (parent: any, args: { room: string }, context: { pubsub: any }) =>
		context.pubsub.asyncIterator(["NEW_CHAT"]),
};

const Subscription = {
	newChatSubscription,
};

export default Subscription;
