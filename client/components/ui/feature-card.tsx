import React from "react";
import { FeaturesSectionWithHoverEffects } from "@/components/blocks/feature-section-with-hover-effects";

function FeatureCards() {
  return (
    <div className=" w-full py-2 shadow-2xl rounded-4xl">
      <div className=" top-0 left-0 w-full">
        <FeaturesSectionWithHoverEffects />
      </div>
    </div>
  );
}

export { FeatureCards };
