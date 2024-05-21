import React, { useCallback, useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { formatAddress } from '../helpers/text-helpers';
import { getMembersGroup, getGroup } from "../connect/utils/anonvote/bandadaApi"
import Button from './Button';
import Image from 'next/image';
import { useActiveWallet } from 'thirdweb/react';
import { Identity } from "@semaphore-protocol/identity";
import IconCheck from 'public/images/icons/IconCheck';

enum CollectVotingPowerState {
	Not_Started,
	Collecting,
	Collected,
}

interface ICollectionsVotingPowerContentProps {
	setIsClaimDrawerOpen: (isOpen: boolean) => void;
}

const CollectVotingPowerContent = ({
	setIsClaimDrawerOpen,
}: ICollectionsVotingPowerContentProps) => {
	const { address } = useAccount();
	const [_identity, setIdentity] = useState<Identity>()
	const [collectState, setCollectState] = useState(
		CollectVotingPowerState.Not_Started,
	);

	const createIdentity = async () => {

		const wallet = useActiveWallet();
		if (!wallet) return;
		const account = wallet.getAccount()
		if (!account) return;

		  const signer = library.getSigner(account)
		  const message = `Sign this message to generate your Semaphore identity.`
		  const signature = await (await signer).signMessage(message)
		  const identity = new Identity(signature)
	
		  setIdentity(identity)
	
		  localStorage.setItem(localStorageTag, identity.toString())
	
		  console.log("Your new Semaphore identity was just created 🎉")
	  }

	  async function isMember() {
		const users = await getUsers()
		const answer = users?.includes(identity!.commitment.toString())
		setIsGroupMember(answer || false)
	  }

	  const joinGroup = async () => {
		setLoading(true)
	
		const commitment = _identity?.commitment.toString()
	
		try {
		  const response = await fetch("api/join-api-key", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
			  groupId,
			  commitment
			})
		  })
	
		  if (response.status === 200) {
			setIsGroupMember(true)
			const users = await getMembersGroup(groupId)
			setUsers(users!.reverse())
		  } else {
			alert(await response.json)
		  }
		} catch (error) {
		  console.log(error)
	
		  alert("Some error occurred, please try again!")
		} finally {
		  setLoading(false)
		}
	  }

	  const sendFeedback = async () => {
		if (!_identity) {
		  return
		}
	
		const feedback = prompt("Please enter your feedback:")
	
		const users = await getMembersGroup(groupId)
	
		if (feedback && users) {
		  setLoading(true)
	
		  try {
			const group = new Group(groupId, 16, users)
	
			const signal = toBigInt(encodeBytes32String(feedback)).toString()
	
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
	
			  console.log(`Your feedback was posted 🎉`)
			} else {
			  console.log(await response.text())
			  alert(await response.text())
			}
		  } catch (error) {
			console.error(error)
	
			alert("Some error occurred, please try again!")
		  } finally {
			setLoading(false)
		  }
		}
	  }

	  const afterJoinCredentialGroup = useCallback(async () => {
		setLoading(true)
		const group = await getGroup(groupId)
		if (group === null) {
		  alert("Some error ocurred! Group not found!")
		  return
		}
		const groupRoot = await getRoot(groupId, group.treeDepth, group.members)
	
		try {
		  const response = await fetch("api/join-credential", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
			  groupRoot: groupRoot.toString()
			})
		  })
	
		  if (response.status === 200) {
			setLoading(false)
			router.push("/groups")
		  } else {
			alert(await response.json)
		  }
		} catch (error) {
		  console.log(error)
	
		  alert("Some error occurred, please try again!")
		} finally {
		  setLoading(false)
		}
	  }, [groupId, router])

	const handleCollect = () => {
		//Handle collect functionality here
		setCollectState(CollectVotingPowerState.Collecting);

		// create bandada anonymous identity if not already present
		await createIdentity();
		setCollectState(CollectVotingPowerState.Collected);

		//get users in the group
		const users = await getMembersGroup(groupId)
    	setUsers(users)
  
	  isMember()
	  
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
