import mongoose from "mongoose";

const newChatSubscription = {
	subscribe: (
		parent: any,
		args: { rooms: [string] },
		context: { pubsub: any }
	) => context.pubsub.asyncIterator(args.rooms),
};

const Subscription = {
	newChatSubscription,
};

export default Subscription;
