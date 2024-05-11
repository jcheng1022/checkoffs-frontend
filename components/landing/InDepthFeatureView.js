'use client';

import styled from "styled-components";
import {FlexBox} from "@/components/core";
import {Steps} from "antd";
import {theme} from "@/styles/themes";
import ScrollAnimation from "react-animate-on-scroll";

const {StepItem} = Steps;

const InDepthFeatureView = () => {
    const steps = [
        {
            title:<div className={'step-title'}> Logging in seconds </div>,
            subTitle: <div className={'step-subtitle'}> We keep it simple. You already did the hard part, creating a post should feel like a reward </div>,
            description: <div className={'img-container'}>
                <img className={'feature-img'} src={'create-activity-modal.png'} />
            </div>,
        },
        {
            title:<div className={'step-title'}> Share your post with your friends and/or group </div>,
            subTitle: <div className={'step-subtitle'}> Keep each other accountable with group updates </div>,
            description: <div className={'img-container'}>
                <img className={'feature-img'} src={'creating-activity.png'} />
            </div>,
        },
        {
            title:<div className={'step-title'}> Check in with your friends </div>,
            subTitle: <div className={'step-subtitle'}> We all need a friendly reminder sometimes. Give them a nudge. </div>,
            description: <div className={'img-container background-needed-img-container'}>
                <img className={'feature-img'} src={'nudge-action.png'} />
            </div>,
        },
    ]
    return (
        <ScrollAnimation duration={4} animateIn={'fadeIn'} animateOnce={true}>
            <Container>
                <Steps
                    progressDot
                    direction={'vertical'}
                    current={3}
                >
                    {steps.map((step, index) => (
                        // <ScrollAnimation key={`feature-step-${index}`} duration={2} animateIn={'fadeIn'} >
                        <StepItem
                            className={'step-container'}
                            key={index}
                            title={step.title}
                            subTitle={step.subTitle}
                            description={step.description}
                        />
                        // </ScrollAnimation>
                    ))}
                </Steps>
            </Container>
        </ScrollAnimation>
    )
}

export default InDepthFeatureView;

const Container = styled(FlexBox)`
  margin: 48px 24px;
  height: 300px;
  
  .step-container {
    //margin: 12px 0;

  }

  .step-title {
    font-size: 3rem;
    font-weight: 700;
    color: white;
    line-height: 1;
    //margin-bottom: 12px;
    
  }
  
  .background-needed-img-container {
    background-color: ${theme.jetGrey};
    border-radius: 24px;
    padding: 24px;
    
  }
  
  .step-subtitle {
    font-size: 1.5rem;
    font-weight: 500;
    color: white;
    margin-bottom: 24px;
  }
  .ant-steps-item-container{
    //height: 300px;
    margin: 12px 0;
  }



  .img-container {
    width: 60%;
    //height: 300px;
    //padding: 0px 24px;

  }
  
  .feature-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 4px
    //border-radius: 24px;

  }

  @media only screen and (max-width: 650px) {
    .image-container {
      width: 100%;
    }
  }
  
`
