import { v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { getUser } from './users';

export const getCards = query({
	args: { id: v.id('lists') },
	async handler(ctx, args) {
		const cards = await ctx.db
			.query('cards')
			.filter((q) => q.eq(q.field('listId'), args.id))
			.collect();

		return cards.sort((s1, s2) => s1.order - s2.order);
	},
});

export const createList = mutation({
	args: { title: v.string(), boardId: v.id('boards') },
	async handler(ctx, args) {
		const user = await getUser({ ...ctx }, {});

		const authorId = user?._id!;

		const { boardId, title } = args;

		await ctx.db.insert('lists', { authorId, boardId, title });
	},
});
