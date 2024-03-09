'use client';

import { cn } from '@/lib/utils';
import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import { AnchorHTMLAttributes, FC } from 'react';
import { buttonVariants } from './ui/button';

type Props = LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>;

const NavLink: FC<Props> = ({ className, children, href, ...props }) => {
	const pathname = usePathname();

	const currentPath = pathname === href;

	return (
		<Link
			href={href}
			className={cn(
				'w-12 h-12 rounded flex items-center justify-center  transition-colors',
				className,
				currentPath
					? 'bg-gradient-to-tr  from-primary/40 to-primary/50  text-primary '
					: 'bg-transparent hover:bg-accent'
			)}
			{...props}
		>
			{children}
		</Link>
	);
};

export default NavLink;
