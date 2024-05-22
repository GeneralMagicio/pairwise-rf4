import React, { useCallback, useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { formatAddress } from '../helpers/text-helpers';
import { getMembersGroup, addMemberByApiKey, getGroup } from "../connect/anonvote/utils/bandadaApi"
import { getRoot } from "../connect/anonvote/utils/useSemaphore"
import Button from './Button';
import Image from 'next/image';
import { useActiveAccount } from 'thirdweb/react';
import { Identity } from "@semaphore-protocol/identity";
import IconCheck from 'public/images/icons/IconCheck';
import { useSearchParams, useRouter } from "next/navigation"
// import { useSigner } from '@/utils/eas';
import { useSignMessage } from 'wagmi'


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

	const { data: signMessageData, error, isLoading, signMessage, variables } = useSignMessage()

	const { address } = useAccount();
	const router = useRouter();
	const [_loading, setLoading] = useState<boolean>(false)

	const [_identity, setIdentity] = useState<Identity>()
	const [_isGroupMember, setIsGroupMember] = useState<boolean>(false)
  	const [_users, setUsers] = useState<string[]>([])

	const [collectState, setCollectState] = useState(
		CollectVotingPowerState.Not_Started,
	);

	const account = useActiveAccount();
	// const signer = useSigner();

	const createIdentity = async () => {
		if (!account) return;

		const message = `Sign this message to generate your Semaphore identity.`
		// const signature = await signer.signMessage(message)
		const signature = await signMessage({ message: message })
		console.log("got the signature for semaphore identity: ", signature);
		//   const signature = account.signMessage(message)
		const identity = new Identity(signature)
		console.log("identity.trapdoor: ",identity?.trapdoor);
		console.log("identity.nullifier: ",identity?.nullifier);
		console.log("identity.commitment: ",identity?.commitment);
		console.log("identity: ", identity);
		setIdentity(identity)
		localStorage.setItem(localStorageTag, identity.toString())
		console.log("Your new Semaphore identity was just created 🎉")
	  }

	  const getUsers = useCallback(async () => {
		setLoading(true)
		const users = await getMembersGroup(groupId)
		setUsers(users)
		setLoading(false)
		return users
	  }, [groupId])

	  async function isMember() {
		const users = await getUsers()
		const answer = users?.includes(_identity!.commitment)
		setIsGroupMember(answer || false)
	  }

	const joinGroup = async () => {
		setLoading(true)
		console.log("identity: ", _identity);
		const commitment = _identity?.commitment
		try {
  			const apiKey = process.env.NEXT_PUBLIC_BANDADA_GROUP_API_KEY!
			console.log("going to add the user in the anonymous group")
   			await addMemberByApiKey(groupId, commitment, apiKey)
    		const group = await getGroup(groupId)
    		if (group) {
      			const groupRoot = await getRoot(groupId, group.treeDepth, group.members)
      			const { error } = await supabase
        		.from("root_history")
        		.insert([{ root: groupRoot.toString() }])

      			if (error) {
        			console.error(error)
					console.log(await response.json)
        			return
     			}

				setIsGroupMember(true)
				const users = await getMembersGroup(groupId)
				setUsers(users!.reverse())
			} 
		} finally {
			setLoading(false)
		}
    }
	

	  //should be called before attestation is done
	  const sendVote = async () => {
		if (!_identity) {
			console.log("unable to sendVote as identity is null")
		  return
		}
	
		const feedback = prompt("Please enter your vote:")
	
		const users = await getMembersGroup(groupId)
	
		if (feedback && users) {
		  setLoading(true)
	
		  try {
			const group = new Group(groupId, 16, users)
	
			const signal = toBigInt(encodeBytes32String(feedback)).toString()
	
			// this proof should be put inside the attestation
			const { proof, merkleTreeRoot, nullifierHash } = await generateProof(
			  _identity,
			  group,
			  groupId,
			  signal
			)
	
			const response = await fetch("api/send-feedback", {
			  method: "POST",
			  headers: { "Content-Type": "application/json" },
			  body: JSON.stringify({
				feedback: signal,
				merkleTreeRoot,
				nullifierHash,
				proof
			  })
			})
	
			if (response.status === 200) {
			  const data = await response.json()
	
			  console.log(data[0].signal)
	
			  if (data) setFeedback([data[0].signal, ..._feedback])
	
			  console.log(`Your vote was recorded 🎉`)
			} else {
			  console.log(await response.text())
			  alert(await response.text())
			}
		  } catch (error) {
			console.error(error)
	
			alert("Some error occurred in submitting vote, please try again!")
		  } finally {
			setLoading(false)
		  }
		}
	  }

	const handleCollect = async () => {
		//Handle collect functionality here
		setCollectState(CollectVotingPowerState.Collecting);

		// create bandada anonymous identity if not already present
		await createIdentity();
		setCollectState(CollectVotingPowerState.Collected);

		//get users in the group
		const users = await getMembersGroup(groupId)
    	setUsers(users)
	  	isMember()

	  if (!_isGroupMember) {
		await joinGroup()
	  }
	  await sendVote()
	  
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
