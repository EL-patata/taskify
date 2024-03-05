import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const getCards = query({
	args: { id: v.id('lists') },
	async handler(ctx, args) {
		return await ctx.db
			.query('cards')
			.filter((q) => q.eq(q.field('listId'), args.id))
			.collect();
	},
});
