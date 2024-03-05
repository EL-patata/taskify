'use client';

import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react';
import { Meteors } from './meteors';

export const InfiniteMovingCards = ({
	items,
	direction = 'left',
	speed = 'fast',
	pauseOnHover = true,
	className,
}: {
	items: {
		quote: string;
		name: string;
		title: React.ReactNode;
	}[];
	direction?: 'left' | 'right';
	speed?: 'fast' | 'normal' | 'slow';
	pauseOnHover?: boolean;
	className?: string;
}) => {
	const containerRef = React.useRef<HTMLDivElement>(null);
	const scrollerRef = React.useRef<HTMLUListElement>(null);

	useEffect(() => {
		addAnimation();
	}, []);
	const [start, setStart] = useState(false);
	function addAnimation() {
		if (containerRef.current && scrollerRef.current) {
			const scrollerContent = Array.from(scrollerRef.current.children);

			scrollerContent.forEach((item) => {
				const duplicatedItem = item.cloneNode(true);
				if (scrollerRef.current) {
					scrollerRef.current.appendChild(duplicatedItem);
				}
			});

			getDirection();
			getSpeed();
			setStart(true);
		}
	}
	const getDirection = () => {
		if (containerRef.current) {
			if (direction === 'left') {
				containerRef.current.style.setProperty(
					'--animation-direction',
					'forwards'
				);
			} else {
				containerRef.current.style.setProperty(
					'--animation-direction',
					'reverse'
				);
			}
		}
	};
	const getSpeed = () => {
		if (containerRef.current) {
			if (speed === 'fast') {
				containerRef.current.style.setProperty('--animation-duration', '20s');
			} else if (speed === 'normal') {
				containerRef.current.style.setProperty('--animation-duration', '40s');
			} else {
				containerRef.current.style.setProperty('--animation-duration', '80s');
			}
		}
	};
	return (
		<div
			ref={containerRef}
			className={cn(
				'scroller relative z-20  max-w-7xl overflow-hidden  [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]',
				className
			)}
		>
			<ul
				ref={scrollerRef}
				className={cn(
					' flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap',
					start && 'animate-scroll ',
					pauseOnHover && 'hover:[animation-play-state:paused]'
				)}
			>
				{items.map((item) => (
					<li
						className="w-[350px] max-w-full relative rounded-2xl border border-b-0 flex-shrink-0 border-border px-8 py-6 md:w-[450px] bg-gradient-to-tr from-accent/50 to-background/20 overflow-hidden "
						key={item.name}
					>
						<blockquote className="flex flex-col gap-2  h-full">
							<div
								aria-hidden="true"
								className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
							/>
							<p className="  z-20 flex-1 text-sm leading-[1.6] text-foreground font-normal">
								{item.quote}
							</p>
							<div className=" z-20 flex flex-row items-center justify-between">
								<p className="mt-auto text-lg font-semibold leading-[1.6] text-muted-foreground">
									{item.name}
								</p>
								<p className="mt-auto">{item.title}</p>
							</div>
						</blockquote>
						<Meteors number={5} className="z-[9000]" />
					</li>
				))}
			</ul>
		</div>
	);
};