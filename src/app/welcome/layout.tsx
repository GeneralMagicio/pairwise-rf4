import React, { ReactNode } from "react";

const WelcomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="centered-mobile-max-width">
      <div>Navbar</div>
      {children}
      <button className="bg-primary w-full">Button</button>
    </div>
  );
};

export default WelcomeLayout;
