import Navbar from '@/components/Navbar';
import ConvexClientProvider from '@/context/ConvexClientProvider';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Taskify',
	description: 'Generated by create next app',
	icons: './taskify.svg',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ConvexClientProvider>
			<html lang="en">
				<body className={inter.className}>{children}</body>
			</html>
		</ConvexClientProvider>
	);
}
