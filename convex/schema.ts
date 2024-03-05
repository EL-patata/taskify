import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
	users: defineTable({
		userId: v.string(),
		email: v.string(),
		userName: v.string(),
	}).index('by_userId', ['userId']),

	boards: defineTable({
		title: v.string(),
		imageUrl: v.optional(v.string()),
		authorId: v.id('users'),
	}).searchIndex('search_title', {
		searchField: 'title',
	}),

	boards_users: defineTable({
		boardId: v.id('boards'),
		userId: v.id('users'),
		role: v.union(v.literal('ADMIN'), v.literal('USER'), v.literal('CREATOR')),
	}),

	lists: defineTable({
		title: v.string(),
		boardId: v.id('boards'),
		authorId: v.id('users'),
	}),

	cards: defineTable({
		title: v.string(),
		description: v.string(),
		order: v.number(),
		authorId: v.id('users'),
		listId: v.id('lists'),
	}),

	messages: defineTable({
		text: v.string(),
		boardId: v.id('boards'),
		authorId: v.id('users'),
	}),
});
