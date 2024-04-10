import React, { ReactNode } from "react";
import Button from "../components/Button";

const WelcomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="centered-mobile-max-width">
      <div>Navbar</div>
      {children}
      <Button className="bg-primary w-full">Test Button</Button>
    </div>
  );
};

export default WelcomeLayout;
