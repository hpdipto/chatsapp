import mongoose from "mongoose";

const newChatSubscription = {
	subscribe: (parent: any, args: { room: string }, context: { pubsub: any }) =>
		context.pubsub.asyncIterator([args.room]),
};

const Subscription = {
	newChatSubscription,
};

export default Subscription;
