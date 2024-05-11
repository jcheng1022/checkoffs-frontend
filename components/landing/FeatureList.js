'use client'

import {FlexBox} from "@/components/core";
import styled from "styled-components";
import ScrollAnimation from 'react-animate-on-scroll';
const FeatureList = () => {

    const features = [
        {
            label: 'Activity Feed',
            description: 'Fill up your feed to build streaks toward your goals',
        },
        {
            label: 'Join or create a group ',
            description: 'Groups are a great way to stay motivated and stay up to date with your friends',
        },
        {
            label: 'Share with friends',
            description: 'Post on your feed to share with friends and other users',
        }
    ]
    return (
        <ScrollAnimation duration={2} animateIn={'fadeIn'}>
            <Container justify={'center'} gap={48}>
                {features.map((feature, index) => (
                    <div className={'feature'} key={index}>
                        <div className={'count-container'}>
                            <span className={'count'}>
                                {index + 1}
                            </span>
                        </div>
                        <div className={'label'}>
                            {feature.label}
                        </div>
                        <div className={'description'}>
                            {feature.description}
                        </div>
                    </div>
                ))}
            </Container>
        </ScrollAnimation>
    )
}


export default FeatureList;

const Container = styled(FlexBox)`
  margin: 48px 24px;
  height: 300px;
  
  .feature {
    text-align: center;
  }

  .count-container {
    margin-bottom: 6px;
  }
  .count {
    border: 2px solid #1890ff;
    border-radius: 50%; /* Make it a circle */
    width: 20px;
    padding: 14px;
    height: 20px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }


  .label {
    font-weight: 600;
  }
  
  .description {
    
    font-size: 12px;
    color: grey;
    max-width: 200px;
    height: 200px;
  }
`
