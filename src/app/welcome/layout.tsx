import React, { ReactNode } from "react";
import Button from "../components/Button";

const WelcomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative centered-mobile-max-width min-h-screen">
      <div className="pb-16">{children}</div>
      <div className="absolute bottom-0 w-full">
        <div className="w-full border-t-2 border-gray-200"></div>
        <div className="px-6 py-6">
          <Button className="bg-primary w-full">Next</Button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeLayout;
