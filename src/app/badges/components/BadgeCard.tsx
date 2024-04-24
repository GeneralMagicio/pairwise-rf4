import Image from 'next/image';

const BadgeCard = () => {
	return (
		<div>
			<div className='rounded-lg bg-[#F2F3F8] p-4'>
				<Image
					className='mx-auto'
					src='/images/badges/badge-1.png'
					width={128}
					height={128}
					alt='badge'
				/>
				<div className='border-b border-b-gray-300 py-2'>
					<div className='flex justify-between'>
						<p className='mt-2 text-center font-bold'>BADGE</p>
						<p className='mt-2 text-center'>Holder</p>
					</div>
					<div className='flex justify-between'>
						<p className='mt-2 text-center font-bold'>TYPE</p>
						<p className='mt-2 text-center'>Whale</p>
					</div>
				</div>
				<div className='flex flex-col gap-4'>
					<p className='mt-2 font-semibold'>BADGE INFO</p>
					<div className='flex items-center gap-2'>
						<Image
							src='/images/tokens/op.png'
							width={16}
							height={16}
							alt='token'
							className='h-4 w-4'
						/>
						<p className='font-semibold'>10M</p>
					</div>
					<div className='flex items-center gap-1'>
						<p className='font-semibold'>Weight</p>
						<p className='text-sm text-primary'>100</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BadgeCard;
