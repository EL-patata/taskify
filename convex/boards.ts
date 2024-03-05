import { v } from 'convex/values';
import { query } from './_generated/server';

export const getLists = query({
	args: { id: v.id('boards') },
	async handler(ctx, args) {
		return await ctx.db
			.query('lists')
			.filter((q) => q.eq(q.field('boardId'), args.id))
			.collect();
	},
});
