import React from "react";
import ChatSection from "./ChatSection";
import ContactSection from "./ContactSection";

const HomePage = () => {
  return (
    <div className="h-screen bg-light flex">
      <ContactSection />
      <div className="w-3/5 mx-5">
        <ChatSection />
      </div>
    </div>
  );
};

export default HomePage;
