import React from "react";
import LandingItem1 from "../../components/guest/LandingItem1";
import LandingItem2 from "../../components/guest/LandingItem2";
import LandingItem3 from "../../components/guest/LandingItem3";
import LandingItem4 from "@/src/components/guest/LandingItem4";
import FadeInUpComponent from "@/src/components/guest/FadeInUpComponent";
import LandingItem5 from "@/src/components/guest/LandingItem5";
import LandingItem6 from "@/src/components/guest/LandingItem6";
import LandingItem7 from "@/src/components/guest/LandingItem7";

const LandingPage = () => {
  return (
      <div>
        <LandingItem1 />
        <FadeInUpComponent>
          <LandingItem2 />
          <LandingItem3 />
        </FadeInUpComponent>
        <LandingItem4 />
        <LandingItem7 />
        <LandingItem6 />
        <LandingItem5 />
      </div>
  );
};

export default LandingPage;
