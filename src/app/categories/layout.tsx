import React, { ReactNode } from "react";
import Header from "../components/Header"; // Adjust the path as necessary

const CategoriesLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="centered-mobile-max-width">
      <Header />
      {children}
    </div>
  );
};

export default CategoriesLayout;
