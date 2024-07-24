import { axios as axiosInstance } from '@/lib/axios';
import { ICategory, IProject } from '@/app/categories/types';

export const pinFileToIPFS = async (list: object) => {
	try {
		const res = await axiosInstance.post<string>('/flow/pinJSONToIPFS', {
			json: list,
		});
		return res.data;
	} catch (error) {
		console.log(error);
	}
};

export const convertRankingToAttestationFormat = async (
	ranking: IProject[] | ICategory[],
	collectionName: string,
	collectionDescription: string,
) => {
	const obj = {
		listDescription: `${collectionDescription}`,
		impactEvaluationLink: 'https://pairwise.vote',
		impactCategory: ['PAIRWISE'],
		impactEvaluationDescription: `This list has been carefully curated and ranked by Pairwise among projects related to ${collectionName}.`,
		listContent: ranking.map(item => ({
			RPGF3_Application_UID: item.RPGF4Id,
		})),
	};

	const listName = collectionName;
	const listMetadataPtrType = 1;

	const url = await pinFileToIPFS(obj);

	return {
		listName,
		listMetadataPtrType,
		listMetadataPtr: `https://giveth.mypinata.cloud/ipfs/${url}`,
	};
};

export const getPrevAttestationIds = async (
	address: string,
	schemaId: string,
	gqlUrl: string,
	collectionName: string,
): Promise<string[]> => {
	const query = `
  query PrevAttestationsQuery($where: AttestationWhereInput) {
    groupByAttestation(
      where: $where,
      by: [id, decodedDataJson]
    ) {
      id
      decodedDataJson
    }
  }
`;

	const res = await axiosInstance.post(gqlUrl, {
		query: query,
		operationName: 'PrevAttestationsQuery',
		variables: {
			where: {
				revocable: { equals: true },
				revoked: { equals: false },
				schemaId: {
					equals: schemaId,
				},
				attester: { equals: address },
			},
			by: null,
		},
	});

	const temp = res.data.data.groupByAttestation.map((item: any) => ({
		...item,
		data: JSON.parse(item.decodedDataJson),
	}));

	return temp
		.filter((item: any) => item.data[0].value.value === collectionName)
		.map((item: any) => item.id);
};
