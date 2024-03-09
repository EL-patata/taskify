'use client';
import { useInterval } from '@/hooks/useInterval';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useState } from 'react';

const ChatGenerator = () => {
	const generatedMessage = [
		{
			message: 'Hey john do you have the plan PDF?',
			image: (
				<img
					alt="avatar preview"
					src="https://img.clerk.com/preview.png?size=50&amp;seed=seed&amp;initials=AD&amp;isSquare=true&amp;bgType=marble&amp;bgColor=2563eb%2C4f46e5&amp;fgType=silhouette&amp;fgColor=FFFFFF&amp;type=user"
					className="rounded-full"
				/>
			),
		},
		{
			message: 'Nope',
			image: (
				<img
					alt="avatar preview"
					className="rounded-full"
					src="https://img.clerk.com/preview.png?size=50&amp;seed=seed&amp;initials=AD&amp;isSquare=true&amp;bgType=marble&amp;bgColor=84cc16%2Ca3e635&amp;fgType=silhouette&amp;fgColor=FFFFFF&amp;type=user"
				/>
			),
		},
		{
			message: 'Maybe Jane has it',
			image: (
				<img
					alt="avatar preview"
					className="rounded-full"
					src="https://img.clerk.com/preview.png?size=50&amp;seed=seed&amp;initials=AD&amp;isSquare=true&amp;bgType=marble&amp;bgColor=84cc16%2Ca3e635&amp;fgType=silhouette&amp;fgColor=FFFFFF&amp;type=user"
				/>
			),
		},
		{
			message: 'I have the file',
			image: (
				<img
					alt="avatar preview"
					src="https://img.clerk.com/preview.png?size=50&seed=seed&initials=AD&isSquare=true&bgType=marble&bgColor=c026d3%2Cec4899&fgType=silhouette&fgColor=FFFFFF&type=user"
					className="rounded-full"
				/>
			),
		},
		{
			message: 'Just uploaded it to the dashboard',
			image: (
				<img
					alt="avatar preview"
					src="https://img.clerk.com/preview.png?size=50&seed=seed&initials=AD&isSquare=true&bgType=marble&bgColor=c026d3%2Cec4899&fgType=silhouette&fgColor=FFFFFF&type=user"
					className="rounded-full"
				/>
			),
		},
		{
			message: 'Thanks Jane!',
			image: (
				<img
					alt="avatar preview"
					src="https://img.clerk.com/preview.png?size=50&amp;seed=seed&amp;initials=AD&amp;isSquare=true&amp;bgType=marble&amp;bgColor=2563eb%2C4f46e5&amp;fgType=silhouette&amp;fgColor=FFFFFF&amp;type=user"
					className="rounded-full"
				/>
			),
		},
	];
	const [messages, setMessage] = useState<typeof generatedMessage>([]);

	const [index, setIndex] = useState(0);

	const len = generatedMessage.length;

	useInterval(() => {
		setIndex((p) => p + 1);

		setMessage((prev) => {
			if (prev.length === 0) return [generatedMessage[index]];
			if (prev.length === generatedMessage.length) {
				let arr = prev;

				return [
					...arr.slice(1, len),
					generatedMessage[((index % len) + len) % len],
				];
			} else return [...prev, generatedMessage[index]];
		});
	}, 1000);

	return (
		<div className="h-[520px] rounded-lg  w-full lg:max-w-7xl mx-auto  flex flex-col bg-gradient-to-tr from-accent/50 to-background/20  p-2">
			{messages.map((message, _index) => {
				if (_index === messages.length - 1) {
					return (
						<motion.div
							key={_index * index}
							id={`${_index}`}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.1 }}
							className={cn(
								'p-4 w-full bg-background/10 rounded transition-all flex items-center gap-3 font-semibold'
							)}
						>
							{message.image}
							{message.message}
						</motion.div>
					);
				} else
					return (
						<motion.div
							key={_index * index}
							id={`${_index}`}
							className={cn(
								'p-4 w-full bg-background/10 rounded transition-all flex items-center gap-3 font-semibold'
							)}
						>
							{message.image}
							{message.message}
						</motion.div>
					);
			})}
		</div>
	);
};

export default ChatGenerator;
