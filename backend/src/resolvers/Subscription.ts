import mongoose from "mongoose";

import { pubsub } from "../server";

const newChat = async (parent: any, args: any, context: { pubsub: any }) => {
	return context.pubsub.asyncIterator("NEW_CHAT");
};

const Subscription = {
	newChat,
};

export default Subscription;
