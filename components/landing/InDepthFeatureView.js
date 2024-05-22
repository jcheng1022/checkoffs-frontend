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
                <img className={'feature-img'} src={'post_image_creation.jpg'} />
            </div>,
        },
        {
            title:<div className={'step-title'}> Share your post with your friends and/or group </div>,
            subTitle: <div className={'step-subtitle'}> Keep each other accountable with group updates </div>,
            description: <div className={'img-container'}>
                <img className={'feature-img'} src={'post_image_confirm.png'} />
            </div>,
        },
        {
            title:<div className={'step-title'}> Check in with your friends </div>,
            subTitle: <div className={'step-subtitle'}> We all need a friendly reminder sometimes. Give them a nudge. </div>,
            description: <div className={'img-container'}>
                <img className={'feature-img'} src={'nudge_example.png'} />
            </div>,
        },
    ]

    const pulsingDot = () => {
        return (
            <div className={'dot'} />
        )
    }
    return (
        <ScrollAnimation className={'parent-scroll-selector'} duration={4} animateOnce animateIn={'fadeIn'} >
            <Container>
                <Steps
                    progressDot={pulsingDot}

                    direction={'vertical'}
                    current={3}
                >
                    {steps.map((step, index) => (
                        // <ScrollAnimation scrollableParentSelector={'parent-scroll-selector'} key={`feature-step-${index}`} duration={2} animateIn={'fadeIn'} >
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
  
  .dot {
    
    position: relative;
    top: -15px; /* Adjust this value as needed */
    left: -3px;
    animation: pulseDot 1.25s cubic-bezier(0.455, 0.03, 0.515, 0.955) -.4s infinite;
    background-color: var(--pulsating-dot, #00BEFF);
    border-radius: 50%;
    box-sizing: border-box;
    height: 15px;
    width: 15px;
    
    }

    .dot:before {
      animation: pulseRing 1.25s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
      background-color: var(--pulsating-dot, #00BEFF);
      border-radius: 45px;
      content: '';
      display: block;
      height: 300%;
      left: -100%;
      position: relative;
      top: -100%;
      width: 300%;
    }

    @keyframes pulseRing {
      0% { transform: scale(.5); }
      80%, 100% { opacity: 0; }
    }

    @keyframes dot {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.1); }
    }
  }
  
  .step-container {
    //margin: 12px 0;

  }

  .step-title {
    margin-left: 24px;
    font-size: 3rem;
    font-weight: 700;
    color: white;
    line-height: 1;
    //margin-bottom: 12px;
    
  }
  
  .background-needed-img-container {
    margin-left: 24px;
    max-width: 60%;
    background-color: ${theme.jetGrey};
    border-radius: 24px;
    padding: 24px;
    
  }
  
  .step-subtitle {
    margin-left: 24px;

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
    margin-left: 24px;

    width: 60%;
    //height: 300px;
    //padding: 0px 24px;

  }
  
  .feature-img {
    width: 100%;
    max-width: 400px;
    height: 100%;
    object-fit: cover;
    border-radius: 4px
    //border-radius: 24px;

  }

  @media only screen and (max-width: 650px) {
    .img-container {
      width: 100%;
    }
    .background-needed-img-container{
      max-width: 100%;
  }
  
`
