import React from "react";
import { json } from "stream/consumers";

const WelcomePage = () => {
  return (
    <div className="max-w-96 mx-auto">
      <h1 className="text-2xl font-bold">Mobile Only Page</h1>
      <p>This content is only visible on mobile devices.</p>
    </div>
  );
};

export default WelcomePage;
