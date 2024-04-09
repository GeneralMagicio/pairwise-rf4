import React, { ReactNode } from "react";

const WelcomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="centered-mobile-max-width">
      <div>Navbar</div>
      {children}
    </div>
  );
};

export default WelcomeLayout;
