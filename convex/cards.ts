import { v } from 'convex/values';
import { mutation } from './_generated/server';

export const updateList = mutation({
	args: {
		cardId: v.id('cards'),
		listId: v.id('lists'),
		order: v.number(),
	},

	async handler(ctx, args) {
		return await ctx.db.patch(args.cardId, {
			listId: args.listId,
			order: args.order,
		});
	},
});
