import { v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { getUser } from './users';
import { Id } from './_generated/dataModel';

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

export const createCard = mutation({
	args: {
		title: v.string(),
		description: v.string(),
		order: v.number(),
		boardId: v.id('boards'),
		listId: v.id('lists'),
	},
	async handler(ctx, args) {
		const user = await getUser({ ...ctx }, {});

		const authorId = user?._id!;

		const { boardId, title, listId } = args;

		return await ctx.db.insert('cards', {
			boardId,
			authorId,
			listId,
			title,
			description: '',
			order: 9,
		});
	},
});

export const getLists = query({
	args: { id: v.id('boards') },
	async handler(ctx, args) {
		const lists = await ctx.db
			.query('lists')
			.filter((q) => q.eq(q.field('boardId'), args.id))
			.collect();

		let cards: {
			listId: Id<'lists'>;
			cards: {
				_id: Id<'cards'>;
				_creationTime: number;
				title: string;
				authorId: Id<'users'>;
				description: string;
				order: number;
				listId: Id<'lists'>;
			}[];
		}[] = [];

		for (let i = 0; i < lists?.length; i++) {
			const result = await ctx.db
				.query('cards')
				.filter((q) => q.eq(q.field('listId'), lists[i]._id))
				.collect();

			cards.push({
				listId: lists[i]?._id,
				cards: result.sort((c1, c2) => c1.order - c2.order),
			});
		}

		return { lists, cards };
	},
});

export const getCards = query({
	args: { listId: v.id('lists') },
	async handler(ctx, args) {
		return await ctx.db
			.query('cards')
			.filter((q) => q.eq(q.field('listId'), args.listId))
			.collect();
	},
});
