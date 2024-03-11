'use client';
import { useInterval } from '@/hooks/useInterval';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import Message from '../chat/Message';

const ChatGenerator = () => {
	const generatedMessage = [
		{
			username: 'James Doe',
			message: 'Hey john do you have the plan PDF?',
			image:
				'https://img.clerk.com/preview.png?size=50&amp;seed=seed&amp;initials=AD&amp;isSquare=true&amp;bgType=marble&amp;bgColor=2563eb%2C4f46e5&amp;fgType=silhouette&amp;fgColor=FFFFFF&amp;type=user',
		},
		{
			username: 'John Doe',
			message: 'Nope',
			image:
				'https://img.clerk.com/preview.png?size=50&amp;seed=seed&amp;initials=AD&amp;isSquare=true&amp;bgType=marble&amp;bgColor=84cc16%2Ca3e635&amp;fgType=silhouette&amp;fgColor=FFFFFF&amp;type=user',
		},
		{
			username: 'John Doe',
			message: 'Maybe Jane has it',
			image:
				'https://img.clerk.com/preview.png?size=50&amp;seed=seed&amp;initials=AD&amp;isSquare=true&amp;bgType=marble&amp;bgColor=84cc16%2Ca3e635&amp;fgType=silhouette&amp;fgColor=FFFFFF&amp;type=user',
		},
		{
			username: 'Jane Doe',
			message: 'I have the file',
			image:
				'https://img.clerk.com/preview.png?size=50&seed=seed&initials=AD&isSquare=true&bgType=marble&bgColor=c026d3%2Cec4899&fgType=silhouette&fgColor=FFFFFF&type=user',
		},
		{
			username: 'Jane Doe',
			message: 'Just uploaded it to the dashboard',
			image:
				'https://img.clerk.com/preview.png?size=50&seed=seed&initials=AD&isSquare=true&bgType=marble&bgColor=c026d3%2Cec4899&fgType=silhouette&fgColor=FFFFFF&type=user',
		},
		{
			username: 'James Doe',
			message: 'Thanks Jane!',
			image:
				'https://img.clerk.com/preview.png?size=50&amp;seed=seed&amp;initials=AD&amp;isSquare=true&amp;bgType=marble&amp;bgColor=2563eb%2C4f46e5&amp;fgType=silhouette&amp;fgColor=FFFFFF&amp;type=user',
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
		<div className="h-[520px] rounded-lg  w-full lg:max-w-7xl mx-auto  flex flex-col bg-dot-primary-hsl/[0.3]  relative   p-2">
			<div className="p-4 my-auto  bg-gradient-to-tr flex flex-col-reverse  from-accent/50 to-background/20">
				{messages.map((message, _index) => {
					if (_index === messages.length - 1) {
						return (
							<motion.div
								key={_index * index}
								id={`${_index}`}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.1 }}
							>
								<Message
									id={`${message.message}` as any}
									createdAt={Date.now()}
									image={message.image}
									text={message.message}
									userName={message.username}
								/>
							</motion.div>
						);
					} else
						return (
							<motion.div key={_index * index} id={`${_index}`}>
								<Message
									id={`${message.message}` as any}
									createdAt={Date.now()}
									image={message.image}
									text={message.message}
									userName={message.username}
								/>{' '}
							</motion.div>
						);
				})}
			</div>
		</div>
	);
};

export default ChatGenerator;
