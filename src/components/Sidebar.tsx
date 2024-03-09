'use client';
import { cn } from '@/lib/utils';
import { ChevronRight, Files, KanbanSquare, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import NavLink from './NavLink';
import { useParams, usePathname } from 'next/navigation';

const Sidebar = () => {
	const [expand, setExpand] = useState<boolean>(false);

	const params = useParams();

	const boardId = params.boardId;

	const paths = [
		{ icon: <KanbanSquare />, path: '', label: 'Board' },
		{ icon: <MessageCircle />, path: '/chat', label: 'Chat' },
		{ icon: <Files />, path: '/files', label: 'Files' },
	];

	return (
		<nav
			className={cn(
				'h-screen w-20 flex flex-col gap-3 items-center bg-gradient-to-tr from-accent/50 to-background/10 p-4 border-r sticky top-0 left-0 z-[10] transition-all backdrop-blur',
				expand && 'w-72'
			)}
		>
			{paths.map((path) => (
				<NavLink
					key={path.path}
					className={cn(expand && 'w-full justify-start gap-3 px-2')}
					href={`/dashboard/board/${boardId}${path.path}`}
				>
					{path.icon}
					{expand ? <p>{path.label}</p> : null}
				</NavLink>
			))}

			<Button
				variant={'ghost'}
				className={cn(
					'mt-auto h-12 justify-center gap-2',
					expand ? 'w-full justify-start' : 'w-12'
				)}
				onClick={() => setExpand((prev) => !prev)}
			>
				<ChevronRight
					className={cn('min-w-6 min-h-6', expand && 'rotate-180')}
				/>
				{expand ? <p>Minimize bar</p> : null}
			</Button>
		</nav>
	);
};

export default Sidebar;
