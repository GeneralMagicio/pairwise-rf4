import React, { useCallback, useEffect, useState } from 'react';
import { useAccount, useSignMessage } from 'wagmi';
import { formatAddress } from '../helpers/text-helpers';
import { getMembersGroup, addMemberByApiKey, getGroup } from "../connect/anonvote/utils/bandadaApi"
import { getRoot } from "../connect/anonvote/utils/useSemaphore"
import Button from './Button';
import Image from 'next/image';
import { Identity } from "@semaphore-protocol/identity";
import IconCheck from 'public/images/icons/IconCheck';
import { useRouter } from "next/navigation"
import supabase from "../connect/anonvote/utils/supabaseClient"

enum CollectVotingPowerState {
	Not_Started,
	Collecting,
	Collected,
}

interface ICollectionsVotingPowerContentProps {
	setIsClaimDrawerOpen: (isOpen: boolean) => void;
}

const groupId = process.env.NEXT_PUBLIC_BANDADA_GROUP_ID!
const localStorageTag = process.env.NEXT_PUBLIC_LOCAL_STORAGE_TAG!

const CollectVotingPowerContent = ({
	setIsClaimDrawerOpen,
}: ICollectionsVotingPowerContentProps) => {

	const { address } = useAccount();
	const router = useRouter();
	const [_loading, setLoading] = useState<boolean>(false)

	const { signMessageAsync } = useSignMessage()
	const [collectState, setCollectState] = useState(
		CollectVotingPowerState.Not_Started,
	);

	const createIdentity = async () => {

		const message = `Sign this message to generate your Semaphore identity.`
		const signature = await signMessageAsync({
			message: message,
		})
		console.log("got the signature for semaphore identity: ", signature);
		const identity = new Identity(signature)
		console.log("identity.trapdoor: ", identity?.trapdoor);
		console.log("identity.nullifier: ", identity?.nullifier);
		console.log("identity.commitment: ", identity?.commitment);
		console.log("identity: ", identity);
		localStorage.setItem(localStorageTag, identity.toString())
		console.log("Your new Semaphore identity was just created 🎉")
		//get users in the group
		const users = await getMembersGroup(groupId)
		console.log("fetched users in the group: ", users?.length)

		if (users == null || !users?.includes(identity!.getCommitment().toString())) {
			console.log("joining the group as user is not already a member")
			setLoading(true)
			try {
				const apiKey = process.env.NEXT_PUBLIC_BANDADA_GROUP_API_KEY!
				console.log("going to add the user in the anonymous group")
				let commitment = identity?.getCommitment().toString();
				if (commitment) {
					await addMemberByApiKey(groupId, commitment, apiKey)
				}
				const group = await getGroup(groupId)
				if (group) {
					const groupRoot = await getRoot(groupId, group.treeDepth, group.members)
					const { error } = await supabase
						.from("root_history")
						.insert([{ root: groupRoot.toString() }])

					if (error) {
						console.error("error in getting group root: ", error)
					}
				}
			} finally {
				setLoading(false)
			}
		} else {
			console.log("user is already in the group");
		}
	}

	const handleCollect = async () => {
		//Handle collect functionality here
		setCollectState(CollectVotingPowerState.Collecting);

		// create bandada anonymous identity if not already present
		await createIdentity();
		setCollectState(CollectVotingPowerState.Collected);

	};

	switch (collectState) {
		case CollectVotingPowerState.Not_Started:
			return (
				<div className='px-4 py-6'>
					<div>
						<p className='pb-2 text-lg font-bold'>
							Collect Voting Power
						</p>
						<p className='text-ph'>
							Claim your badges to start voting on projects.
						</p>
					</div>
					<div className='py-6 text-center'>
						<p className='mb-6 text-lg font-semibold'>
							{formatAddress(address!)}
						</p>
						{/* add badges here */}
						<div className='mb-4'>Badges</div>
						<p className='text-ph'>4 badges found</p>
					</div>
					<Button
						onClick={handleCollect}
						className='w-full bg-primary'
					>
						Collect Voting Power
					</Button>
				</div>
			);
		case CollectVotingPowerState.Collecting:
			return (
				<div className='flex flex-col items-center justify-center gap-6 px-4 py-6'>
					<Image
						src='/images/collect-loading.png'
						width={50}
						height={50}
						alt='loading'
					/>
					<p className='text-lg font-semibold'>
						{formatAddress(address)}
					</p>
					{/* add badges here */}
					<p>badges</p>
					<p className='text-ph'>Collecting Voting Power</p>
				</div>
			);
		case CollectVotingPowerState.Collected:
			return (
				<div className='flex flex-col items-center justify-center gap-6 px-4 py-6'>
					<div className='inline-flex items-center justify-center rounded-full border-2 border-red-500 bg-red-200 p-2'>
						<IconCheck color='red' />
					</div>
					<p className='text-lg font-semibold'>
						{formatAddress(address)}
					</p>
					{/* add badges here */}
					<p>badges</p>
					<p>Voting Power Collected</p>
					<Button
						onClick={() => {
							setIsClaimDrawerOpen(false);
						}}
						className='w-full bg-primary'
					>
						Done
					</Button>
				</div>
			);
		default:
			return <div>{collectState}</div>;
	}
};

export default CollectVotingPowerContent;
