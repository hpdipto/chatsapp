"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const newChatSubscription = {
    subscribe: (parent, args, context) => context.pubsub.asyncIterator(args.rooms),
};
const Subscription = {
    newChatSubscription,
};
exports.default = Subscription;
