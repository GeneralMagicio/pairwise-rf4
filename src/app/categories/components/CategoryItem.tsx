import Image from 'next/image'; // Make sure to install 'next/image'

const CategoryItem = () => {
	return (
		<div className='flex items-center justify-between gap-2 border-b border-b-gray-400 py-3'>
			<Image
				src='/images/characters/welcome-character.png'
				alt='Logo'
				width={40}
				height={40}
			/>
			<div>
				<p className='font-bold'>Developer Ecosystem</p>
				<p className='text-ph'>
					Some description about the category here.
				</p>
			</div>
			<div className='whitespace-nowrap rounded-full bg-gray-300 px-2 py-1'>
				Not ranked
			</div>
		</div>
	);
};

export default CategoryItem;
