// import React from 'react'
import { Button, Divider, Input, Progress, Select, Slider } from "antd";
import OnboardingLayout from "./onboarding/OnboardingLayout";
import { ReactNode } from "react";
import LastStep from "./LastStep";



type Props = {
    children: ReactNode;
    heading: string;
    subheading: ReactNode;
    backButton?: boolean;
    currentStep?: number;
    totalSteps?: number;
    steps?: boolean;
  };


const LastPage = (props: Props) => {
  return (
    <div className="font-[Inter]">
        <OnboardingLayout
        steps
        currentStep={5}
        totalSteps={5}
        heading="Summary"
        subheading="Review details before proceeding to payment "
        children= {<LastStep />}
        
        />

     
    </div>
  )
}

export default LastPage;
