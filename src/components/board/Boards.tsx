'use client';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { format } from 'date-fns';
import Link from 'next/link';

const Boards = () => {
	const data = useQuery(api.boards.getUserBoards);

	const boards = data?.boards;

	return (
		<main className="flex flex-col w-screen">
			<div className="w-screen lg:max-w-screen-xl mx-auto min-h-[50vh] h-full bg-accent/10">
				<div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{boards?.map((board, index) => (
						<Link
							href={`/dashboard/board/${board?._id}`}
							key={index}
							className="rounded-lg border md:min-h-72 flex flex-col"
						>
							<div
								aria-hidden="true"
								className="bg-primary p-3 h-28 rounded-t-lg"
							/>
							<div className="p-3 mt-auto">
								<h2 className="text-xl font-semibold">{board?.title}</h2>
								<p>
									Created at: {format(board?._creationTime!, 'dd MMM yyyy')}
								</p>
							</div>
						</Link>
					))}
				</div>
			</div>
		</main>
	);
};

export default Boards;
