'use client';

import styled from "styled-components";
import {FlexBox} from "@/components/core";
import {Button} from "antd";
import {theme} from "@/styles/themes";

const Hero = () => {
    return (
        <Container justify={'space-between'}>
            <div className={'left-side'}>
                <div className={'main-text'}>
                    A more visually appealing way of tracking your wins
                </div>
                <FlexBox className={'btn-container'} justify={'center'}>
                    <Button className={'get-started-btn'}>
                        Get Started
                    </Button>
                </FlexBox>
            </div>
            <div className={'img-container'}>
                <img className={'img'} src={'/activity-pic.png'} alt={'hero'} />
            </div>
        </Container>
    )
}


export default Hero;

const Container = styled(FlexBox)`
  width: 100%;
  padding: 24px;
  //margin: 24px;
  //height: 300px;
  

    .img-container {
        width: 700px;
        height: 240px;
      border-radius: 12px;
      padding: 0px 24px;
      
    }
  
    .left-side {
      max-width: 500px;
      margin-left: 24px;
    }

    .img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  
  .main-text {
    font-size: 28px;
    font-weight: 600;
    font-style: italic;
    letter-spacing: 1.01px;
    text-align: center;
  }
  
  .get-started-btn {
    width: 250px;
    height:  75px;
    background-color: ${theme.softBlue_2};
    color: ${theme.SNOW};
    font-weight: 600;
    font-size: 24px;
    letter-spacing: 1.2px;
    box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.2); /* Drop shadow */
  }
  
  .get-started-btn:hover {
    color: red;
  }
  
  .btn-container {
    margin: 24px 0px;
  }
`
