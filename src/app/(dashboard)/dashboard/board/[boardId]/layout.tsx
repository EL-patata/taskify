import Sidebar from '@/components/Sidebar';

export default function layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main className="flex min-h-screen max-h-screen  overflow-y-hidden">
			<Sidebar />
			{children}
		</main>
	);
}
