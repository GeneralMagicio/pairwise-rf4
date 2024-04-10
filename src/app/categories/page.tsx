import React from "react";
import CategoryItem from "./components/CategoryItem";

const page = () => {
  return (
    <div className="px-4">
      <h1 className="text-2xl font-bold mt-6">Categories</h1>
      <p className="text-ph mb-6 ">Select one to begin ranking</p>
      <CategoryItem />
      <CategoryItem />
      <CategoryItem />
    </div>
  );
};

export default page;
