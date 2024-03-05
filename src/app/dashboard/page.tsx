'use client';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import { Plus } from 'lucide-react';
import Link from 'next/link';

const page = () => {
	return (
		<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
			{Array(3)
				.fill([])
				.map((_, index) => (
					<Skeleton key={index} />
				))}
			<Button
				variant={'outline'}
				className="h-full hover:bg-secondary/20 min-h-32 outline-1 outline-dashed outline-secondary"
			>
				Create board <Plus />
			</Button>
		</section>
	);
};

export default page;
