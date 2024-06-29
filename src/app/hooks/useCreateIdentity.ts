import { Identity } from '@semaphore-protocol/identity';
import { useSignMessage } from 'wagmi';
import {
	getMembersGroup,
	addMemberByApiKey,
	getGroup,
} from '../connect/anonvote/utils/bandadaApi';
import supabase from '../connect/anonvote/utils/supabaseClient';
import { getRoot } from '../connect/anonvote/utils/useSemaphore';
import { useCallback, useState } from 'react';

/**
 * identity local storage key
 */
export const identityLsKey = process.env.NEXT_PUBLIC_LOCAL_STORAGE_TAG!;
const groupId = process.env.NEXT_PUBLIC_BANDADA_GROUP_ID!;

export const useCreateIdentity = () => {
	const { signMessageAsync } = useSignMessage();
	const [isLoading, setIsLoading] = useState(false);

	const createIdentity = useCallback(async (signature: string) => {
		setIsLoading(true);
		try {
			console.log(
				'got the signature for semaphore identity: ',
				signature,
			);
			const identity = new Identity(signature);
			console.log('identity.trapdoor: ', identity?.trapdoor);
			console.log('identity.nullifier: ', identity?.nullifier);
			console.log('identity.commitment: ', identity?.commitment);
			console.log('identity: ', identity);
			localStorage.setItem(identityLsKey, identity.toString());
			console.log('Your new Semaphore identity was just created 🎉');
			//get users in the group
			const users = await getMembersGroup(groupId);
			console.log('fetched users in the group: ', users?.length);

			if (
				users == null ||
				!users?.includes(identity!.getCommitment().toString())
			) {
				console.log(
					'joining the group as user is not already a member',
				);
				const apiKey = process.env.NEXT_PUBLIC_BANDADA_GROUP_API_KEY!;
				console.log('going to add the user in the anonymous group');
				let commitment = identity?.getCommitment().toString();
				if (commitment) {
					await addMemberByApiKey(groupId, commitment, apiKey);
				}
				const group = await getGroup(groupId);
				if (group) {
					const groupRoot = await getRoot(
						groupId,
						group.treeDepth,
						group.members,
					);
					console.error('adding root to supabase: ', groupRoot.toString());
					const { error } = await supabase
						.from('root_history')
						.insert([{ root: groupRoot.toString() }]);

					if (error) {
						console.error('error in getting group root: ', error);
					}
				}
			} else {
				console.log('user is already in the group');
			}
		} finally {
			setIsLoading(false);
		}
	}, [signMessageAsync]);

	return { createIdentity, isLoading };
};
