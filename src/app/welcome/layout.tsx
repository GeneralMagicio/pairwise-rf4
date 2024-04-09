import React, { ReactNode } from "react";

const WelcomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <div>Navbar</div>
      {children}
    </div>
  );
};

export default WelcomeLayout;
