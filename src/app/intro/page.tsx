import Image from "next/image";
import React from "react";
import CircleNumber from "../components/CircleNumber";

const IntroPage = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold mt-4 mb-16">Easy as 1-2-3</h1>
      <div className="flex flex-col justify-center text-center  gap-9">
        <div className="flex flex-col justify-center items-center gap-4">
          <CircleNumber number={1} />
          <p className="text-ph">
            Select the category where your expertise shines brightest
          </p>
        </div>
        <div className="flex flex-col justify-center items-center gap-4">
          <CircleNumber number={2} />
          <p className="text-ph">
            Learn about each project and decide if they should be funded
          </p>
        </div>
        <div className="flex flex-col justify-center items-center gap-4">
          <CircleNumber number={3} />
          <p className="text-ph">Rank projects using Pairwise voting</p>
        </div>
      </div>
    </div>
  );
};

export default IntroPage;
