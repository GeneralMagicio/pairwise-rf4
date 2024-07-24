import { ApiSdk, Group } from '@bandada/api-sdk';

const bandadaApi = new ApiSdk(process.env.NEXT_PUBLIC_BANDADA_API_URL);

export async function getGroup(groupId: string): Promise<Group | null> {
	try {
		return await bandadaApi.getGroup(groupId);
	} catch (error: any) {
		console.error(error);

		if (error.response) {
			alert(error.response.statusText);
		} else {
			alert('Some error occurred!');
		}

		return null;
	}
}

export async function addMemberByApiKey(
	groupId: string,
	memberId: string,
	apiKey: string,
): Promise<void> {
	try {
		await bandadaApi.addMemberByApiKey(groupId, memberId, apiKey);
	} catch (error: any) {
		console.error(error);

		if (error.response) {
			alert(error.response.statusText);
		} else {
			alert('Some error occurred!');
		}
	}
}

export async function getMembersGroup(
	groupId: string,
): Promise<string[] | null> {
	try {
		const group = await bandadaApi.getGroup(groupId);
		return group.members;
	} catch (error: any) {
		console.error(error);

		if (error.response) {
			alert(error.response.statusText);
		} else {
			alert('Some error occurred!');
		}

		return null;
	}
}
