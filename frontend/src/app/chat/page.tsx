'use client'

import { useActionState, useState } from "react";
import css from "./page.module.css";
import Image from "next/image";
import Link from "next/link";

// =============================================================================
// Header Ribbon
// =============================================================================

function HeaderRibbon({ username }: { username: string }) {
	const handleBackButton = () => {
		alert('placeholder for chat panel');
	};

	return (
		<div className={css['header']}>
			<BackButton destination={'/chat'} />
			<UsernameDisplay img={`/profile-pictures/${username}.png`} text={username} />
			<SettingsGear />
		</div>
	);
}

function BackButton({ destination }: { destination: string }) {
	return (
		<Link href={destination}>
			<Image alt="Back" src={"/icons/back-arrow.png"} width={30} height={30} className={css['icon']} />
		</Link>
	);
}

function UsernameDisplay({ img, text }: { img: string, text: string }) {
	return (
		<div className={css['username-display']}>
			<Image alt="" src={img} width={50} height={50} className={css['username-display-avatar']} />
			<p className={css['username-display-username']}>{text}</p>
		</div>
	);
}

function SettingsGear() {
	return (
		<Link href={'/chat'}>
			<Image alt="Settings" src={"/icons/gear.png"} width={30} height={30} className={css['icon']} />
		</Link>
	);
}

// =============================================================================
// Message History
// =============================================================================

interface MessageContent {
	id: number;
	senderAvatar: string;
	senderDisplayName: string;
	time: Date;
	bodyText?: string;
	bodyImages?: string[];
};

function Message({ content }: { content: MessageContent }) {
	const sentTime = content.time.toLocaleTimeString();

	const imageElems = content.bodyImages?.map(x => (
		<Image key={x} alt="Sent image" src={`/sent-media/${x}`} width={200} height={200} className={css['message-image']} />
	));

	return (
		<div className={css['message']}>
			<div>
				<Image alt={content.senderDisplayName} src={`/profile-pictures/${content.senderAvatar}`} width={50} height={50} className={css['message-avatar']} />
			</div>
			<div>
				<div className={css['message-sender']}>
					<p className={css['message-sender-name']}>{content.senderDisplayName}</p>
					<p className={css['message-sender-time']}>{sentTime}</p>
				</div>
				<div>
					{content.bodyText && (
						<p>{content.bodyText}</p>
					)}
					{content.bodyImages && (
						<div className={css['message-images-area']}>{imageElems}</div>
					)}
				</div>
			</div>
		</div>
	)
}

function MessageHistory({ }) {
	const messageData: MessageContent[] = [
		{
			id: 1,
			senderAvatar: 'sam_of_lan24.png',
			senderDisplayName: 'Sam',
			time: new Date(2024, 5, 1, 10, 53, 12),
			bodyText: `that's great, I think I'll be there later tonight but I might get busy with this lab`,
		},
		{
			id: 2,
			senderAvatar: 'sam_of_lan24.png',
			senderDisplayName: 'Sam',
			time: new Date(2024, 5, 1, 10, 54, 23),
			bodyText: `🙃`,
		},
		{
			id: 3,
			senderAvatar: 'sam_of_lan24.png',
			senderDisplayName: 'Sam',
			time: new Date(2024, 5, 1, 14, 3, 58),
			bodyImages: [
				'lab01.png',
				'lab02.png',
				'lab03.png',
			]
		},
		{
			id: 4,
			senderAvatar: 'blue_capoo.png',
			senderDisplayName: 'Blue Capoo',
			time: new Date(2024, 5, 1, 14, 5, 2),
			bodyText: `Love the stock photo vibe 🗣`,
		},
		{
			id: 5,
			senderAvatar: 'blue_capoo.png',
			senderDisplayName: 'Blue Capoo',
			time: new Date(2024, 5, 1, 14, 5, 41),
			bodyText: `I got like halfway through the labwork before we ran out of materials`,
		},
	];

	const messageElems = messageData.map(x => (
		<Message content={x} key={x.id} />
	));

	return (
		<div className={css['message-history']}>
			{messageElems}
		</div>
	);
}

// =============================================================================
// Composer
// =============================================================================

function sendMessage() {
}

function Composer({ }) {
	const [bodyText, setBodyText] = useState('');
	const [state, formAction, isPending] = useActionState(sendMessage, null);

	return (
		<form action={formAction} className={css['composer']}>
			<input type="text" name="body" id="body" value={bodyText} onChange={x => setBodyText(x.target.value)} className={css['composer-text']} placeholder="Send a message" />
			<button type="submit" disabled={isPending} className={css['button']}>
				<Image alt="Send" src="/icons/up-arrow.png" width={20} height={20} className={css['icon']} />
			</button>
		</form>
	);
}

// =============================================================================
// Main Component
// =============================================================================

export default function Chat({ }) {
	const recipient = 'sam_of_lan24';

	return (
		<div className={css.main}>
			<HeaderRibbon username={recipient} />
			<MessageHistory />
			<Composer />
		</div>
	);
}