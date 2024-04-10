interface CircleNumberProps {
  number: number;
}

const CircleNumber: React.FC<CircleNumberProps> = ({ number }) => {
  return (
    <div className="flex items-center justify-center border-2 border-orange-500 text-orange-500 rounded-full h-12 w-12 font-bold">
      {number}
    </div>
  );
};

export default CircleNumber;
