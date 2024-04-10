import Image from "next/image"; // Make sure to install 'next/image'

const CategoryItem = () => {
  return (
    <div className="flex justify-between gap-2 border-b border-b-gray-400 py-3 items-center">
      <Image
        src="/images/characters/welcome-character.png"
        alt="Logo"
        width={40}
        height={40}
      />
      <div>
        <p className="font-bold">Developer Ecosystem</p>
        <p className="text-ph">Some description about the category here.</p>
      </div>
      <div className="py-1 px-2 bg-gray-300 whitespace-nowrap rounded-full">
        Not ranked
      </div>
    </div>
  );
};

export default CategoryItem;
