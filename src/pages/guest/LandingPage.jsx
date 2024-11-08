import React from "react";
import LandingItem1 from "../../components/guest/LandingItem1";
import LandingItem2 from "../../components/guest/LandingItem2";
import LandingItem3 from "../../components/guest/LandingItem3";
import LandingItem4 from "@/src/components/guest/LandingItem4";
import FadeInUpComponent from "@/src/components/guest/FadeInUpComponent";

const LandingPage = () => {
  return (
    <div>
      <LandingItem1 />
      <FadeInUpComponent>
        <LandingItem2 />
        <LandingItem3 />
      </FadeInUpComponent>
        <LandingItem4 />
    </div>
  );
};

export default LandingPage;
