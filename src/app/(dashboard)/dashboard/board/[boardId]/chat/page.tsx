'use client';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { useMutation, useQuery } from 'convex/react';
import { Send } from 'lucide-react';
import { useRef, useState } from 'react';
import { api } from '../../../../../../../convex/_generated/api';
import { Id } from '../../../../../../../convex/_generated/dataModel';
import { useParams } from 'next/navigation';
import { format } from 'date-fns';
import Image from 'next/image';
import Message from '@/components/chat/Message';

const Page = () => {
	const params = useParams();
	const boardId = params.boardId;

	const [message, setMessage] = useState('');

	const messages = useQuery(api.messages.getMessages, {
		boardId: boardId as any,
	});

	const ref = useRef<HTMLTextAreaElement>(null!);
	const scrollRef = useRef<HTMLDivElement>(null!);

	const addMessage = useMutation(api.messages.addMessage);

	function handleAddMessage() {
		if (!message) return;
		addMessage({ boardId: boardId as any, text: message }).then(() => {
			scrollRef.current.scrollIntoView();
		});
		setMessage('');
	}

	return (
		<div className="w-full h-screen flex flex-col bg-dot-primary-hsl/[0.3]  relative ">
			<ScrollArea className="w-full h-[90vh] m-0">
				<div className="p-4 mt-auto  bg-gradient-to-tr flex flex-col-reverse  from-accent/50 to-background/20">
					{messages?.map((message) => (
						<Message
							key={message.message._id}
							image={message.author?.image!}
							text={message.message.text}
							id={message.message._id}
							userName={message.author?.userName!}
							createdAt={message.message._creationTime}
						/>
					))}
				</div>
				<div aria-hidden="true" ref={scrollRef}></div>
			</ScrollArea>
			<div className="p-4 flex gap-2 items-center h-[10vh] mt-auto">
				<Textarea
					placeholder="Write your message here..."
					className="resize-none"
					ref={ref}
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === 'Enter' && !e.shiftKey) {
							if (message.length === 0) return;

							e.preventDefault();

							handleAddMessage();

							ref.current?.focus();
						}
					}}
				/>
				<Button
					size={'icon'}
					disabled={message.length === 0}
					onClick={handleAddMessage}
				>
					<Send />
				</Button>
			</div>
		</div>
	);
};

export default Page;
