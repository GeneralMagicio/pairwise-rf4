import { ICategory, InclusionState, IProject } from './types';

export const Categories: ICategory[] = [
	{
		id: 34,
		name: 'NFTs',
		poll_id: 1,
		url: 'url',
		impactDescription: 'NFTs',
		contributionDescription: null,
		RPGF3Id: null,
		parentId: 5,
		image: '',
		metadataUrl: null,
		created_at: '2023-11-22T13:24:48.100Z',
		type: 'collection',
	},
	{
		id: 35,
		name: 'Development & Infrastructure',
		poll_id: 1,
		url: 'url',
		impactDescription: 'Development & Infrastructure',
		contributionDescription: null,
		RPGF3Id: null,
		parentId: 5,
		image: '',
		metadataUrl: null,
		created_at: '2023-11-22T13:24:48.735Z',
		type: 'collection',
	},
	{
		id: 36,
		name: 'Community Building',
		poll_id: 1,
		url: 'url',
		impactDescription: 'Community Building',
		contributionDescription: null,
		RPGF3Id: null,
		parentId: 5,
		image: '',
		metadataUrl: null,
		created_at: '2023-11-22T13:24:49.375Z',
		type: 'collection',
	},
];

export const projects: IProject[] = [
	{
		id: 45,
		name: 'Hats Protocol',
		poll_id: 1,
		url: 'https://www.hatsprotocol.xyz/',
		impactDescription:
			'Hats Protocol has been deployed to OP Mainnet, with 29 Hats trees deployed to OP Mainnet as of October 13, 2023, providing Optimism-based communities with core infrastructure for flexibly creating and managing their roles and permissions while embedding automation throughout their organization to unlock the power of decentralized work.\n\nHats protoDAO runs on the OP Mainnet, engaging over 100 contributors across the Hats ecosystem and bringing users into the Optimism ecosystem. Hats protoDAO is a DAOaus Moloch v3 contract deployed to Optimism.\n\nWe have recently developed the Hats Modules Stack and deployed it to OP Mainnet, giving Optimism builders the power to create programmable roles that users can bring with them across the internet.',
		contributionDescription:
			'Hats is the onchain roles protocol, providing programmable, revocable, and legible roles for decentralized work. Hats empowers groups to get things done by delegating responsibilities to the right contributors, giving them the hard and soft authorities they need to do their work, and installing the automated granting and revocation of permissions and real-time accountability mechanisms to ensure people follow through.',
		RPGF3Id:
			'0xe481da7dcea63794d734fbbd156f0327a4b6905852d6865a5437b722c80871ab',
		parentId: 34,
		image: 'https://content.optimism.io/profile/v0/profile-image/10/0x03f7a3FD58B090Abe577651fb92Fb4789826191e.png',
		metadataUrl:
			'https://content.optimism.io/rpgf3Application/v0/metadata/10/0x03f7a3FD58B090Abe577651fb92Fb4789826191e.json',
		created_at: '2023-11-22T13:24:57.576Z',
		type: 'project',
		inclusionState: InclusionState.Pending,
	},
	{
		id: 46,
		name: 'Zengo: Decentralized Budget',
		poll_id: 1,
		url: 'https://go.zenbit.mx',
		impactDescription:
			'- 35 citizens participated in Ciudades DAO public test\n- 6 POAPs from Zengo private test 1\n- 12 Modeators POAPs from Zengo private test 2\n- 4 Citizen POAPS from Zengo private test 2\n- We published one article in the "Transparent Mexico" magazine about the decentralized budget in Queretaro.\n- Special Mention for Ciudades DAO in The Innovation in Transparency Contest 2022\n- Optimism mentioned during the Zengo presentation at the Innovation in Transparency Contest 2023',
		contributionDescription:
			'The zengoDAO contracts enable the addition of a decentralized budget for cities, empowering citizens to participate in urban governance with proposals to address community needs in public spaces.\n\nModerators allocate the decentralized budget through an iterative verification process with local, regional, and national government instances. Then, they vote to distribute the funds among the verified submissions with a plural voting round.\n\nZengo results from R&D around urban governance and retroactive funding carried out by zenbit.eth. This process started with the Cities Protocol in 2021 followed by CiudadesDAO in 2022. In the same year, We started to test Optimism, deploying RegensDAO, and Eneagon, and now, in 2023, we are integrating these solutions with Zengo in the OP Goerli testnet.',
		RPGF3Id:
			'0xa0e0d386a862f8f1ee625bf5837bfb8ef5a8201d70c459efbe9172602ff3d831',
		parentId: 35,
		image: 'https://content.optimism.io/profile/v0/profile-image/10/0x04cc6b487566B1C821bEa04d7ac0d23CEDe05cC9.png',
		metadataUrl:
			'https://content.optimism.io/rpgf3Application/v0/metadata/10/0x04cc6b487566B1C821bEa04d7ac0d23CEDe05cC9.json',
		created_at: '2023-11-22T13:24:58.444Z',
		type: 'project',
		inclusionState: InclusionState.Pending,
	},
	{
		id: 47,
		name: 'Pods',
		poll_id: 1,
		url: 'https://pods.media/',
		impactDescription:
			'We’re the only platform focused solely on podcasts, and deployed natively on Optimism. \n\nIn addition to the existing episodes, we have committed dozens of creators in the past few months to releasing episodes on the platform, including Bankless, The Defiant, Overpriced Jpegs, Green Pill, Alfalfa, Rehash, and more. \n\nGiven the novelty of the platform, Pods is targeting and bringing in an entirely new audience the ecosystem -- notably with strong distribution across major crypto podcasts. \n',
		contributionDescription:
			'We deployed Pods natively on Optimism in late September. \n\nSince then, we’ve released 12+ episodes onchain across multiple creators during our private beta, including:\n\nOP Radio\nInvest in Music\nSeed Club\n\nThese episodes have culminated nearly 700 mints across 250 unique collector since our release ~1 month ago .  ',
		RPGF3Id:
			'0xd61045d17bdd1312b455d49bcaf58eab5f8eca9825d145aabc848507cd692d82',
		parentId: 35,
		image: 'https://content.optimism.io/profile/v0/profile-image/10/0x050549F8c196Bf1bcC293172746c847fD4D77d9d.png',
		metadataUrl:
			'https://content.optimism.io/rpgf3Application/v0/metadata/10/0x050549F8c196Bf1bcC293172746c847fD4D77d9d.json',
		created_at: '2023-11-22T13:24:59.294Z',
		type: 'project',
		inclusionState: InclusionState.Pending,
	},
	{
		id: 48,
		name: 'Thank Optimism | by ThriveCoin',
		poll_id: 1,
		url: 'https://app.thrivecoin.com/communities/thank-optimism',
		impactDescription:
			'ThriveCoin’s trust-less, open, human validation infrastructure impacted the Optimism community and the broader web3 environment. \n\nFor Optimism, we helped grow Ambassador contributions and pipeline, create artifacts documenting the impact of rPGF grants, and market that impact via Medium, Mirror, Twitter, and more. We far exceeded all milestones: \n\n- 1.703 discrete marketing content (429% above critical milestone) \n- 638 discrete research artifacts (1,276% above critical milestone)\n- 309 contributors (412% above critical milestone)\n- 1.6m+ total views of approved content\n- 5,000+ pieces of total generated content\n\nFor web3, our infrastructure opens the door for a world of contributors who can trust that their contributions will now be equitably rewarded in decentralized environments. ',
		contributionDescription:
			"Many talented people don’t trust that their contributions will be equitably rewarded in web3. So they contribute less value, or don’t contribute at all, because their talents are more dependably incentivized elsewhere. \n\nFor 'Thank Optimism', ThriveCoin built trust-less, open, incentive infrastructure that makes it possible to reward contributors proportionate to the value they create. \n\nOP Ambassadors used our tech to create content that helps our Optimism community better understand the value of rPGF grants. Quality content can’t be auto-validated via traditional quests, so it required custom human validations capability to function. \n\nWe far exceeded all impact expectations - attracting significantly more Ambassadors, more quality content, and more engagement than expected.",
		RPGF3Id:
			'0x271a5f83a4a79b1e0e65dedef46a10e22fe6ec6b8c5a9828546182026d4c6067',
		parentId: 34,
		image: 'https://content.optimism.io/profile/v0/profile-image/10/0x055D602C940b3cd7A158df0FD600C75744C9690e.png',
		metadataUrl:
			'https://content.optimism.io/rpgf3Application/v0/metadata/10/0x055D602C940b3cd7A158df0FD600C75744C9690e.json',
		created_at: '2023-11-22T13:25:00.117Z',
		type: 'project',
		inclusionState: InclusionState.Pending,
	},
];
