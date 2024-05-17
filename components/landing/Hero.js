'use client';

import styled from "styled-components";
import {FlexBox} from "@/components/core";
import {Button} from "antd";
import {theme} from "@/styles/themes";
import {useAuthContext} from "@/context/AuthContext";
import {useCurrentUser} from "@/hooks/user.hook";
import {useRouter} from "next/navigation";

const Hero = () => {
    const { logOut, handleSignIn } = useAuthContext();
    const {data: user} = useCurrentUser();
    const router = useRouter();

    const handleGetStarted = () => {
        if (user) {
            router.push(`/user/${user?.id}`)
        } else {
            handleSignIn();
        }
    }

    return (
        <Container justify={'space-between'}>
            <div className={'left-side'}>
                <div className={'main-text'}>
                    Get things done and <span className={'share-text'}> share it with others</span>
                </div>
                <div> </div>
                <FlexBox className={'btn-container'} justify={'flex-start'}>
                    <Button className={'get-started-btn'} onClick={handleGetStarted}>
                        Get Started
                    </Button>
                </FlexBox>
            </div>
            <div className={'img-container'}>
                <img className={'img'} src={'/hero.png'} alt={'hero'} />
            </div>
        </Container>
    )
}


export default Hero;

const Container = styled(FlexBox)`
  width: 100%;
  padding:  150px 5rem 24px 7.5rem;
  margin-bottom: 150px;
  //padding-top: 150px;
  //border-radius: 24px;
  //margin: 24px;
  //height: 300px;
  

    .img-container {
        width: 800px;
        //height: 220px;
      padding: 0px 24px;
      
    }
  
    .left-side {
      max-width: 500px;
    }

    .img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      border-radius: 24px;

    }
  
  .main-text {
    font-size: 1.875rem;
    //font-size: 3.75rem;
    font-weight: 600;
    font-style: italic;
    letter-spacing: 1.01px;
    //text-align: center;
  }
  
  
  
  .get-started-btn {
    width: 250px;
    height:  75px;
    background-color: ${theme.primaryBlue};
    color: ${theme.SNOW};
    font-weight: 600;
    font-size: 24px;
    letter-spacing: 1.2px;
    border-radius: 12px;
    box-shadow: 0px 0px 30px   ${theme.primaryBlue}; /* Noticeable Drop shadow */
  }
  
  .get-started-btn:hover {
    color: red;
  }
  
  .btn-container {
    margin: 24px 0px;
  }
  
  .share-text {
    // color: ${theme.primaryBlue};
    // text-shadow: 0px 2px 150px   ${theme.primaryBlue}; /* Noticeable Drop shadow */

    background-image: linear-gradient(to right, ${theme.primaryBlue}, ${theme.secondaryPink});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;


  }

  @media only screen and (min-width: 840px) {
    .main-text {
      font-size: 3.75rem;
      line-height: 1;
    }

  }
  

  @media only screen and (max-width: 1501px) {
    & {
      flex-direction: column;
      align-items: center;
      
    }
    
    .left-side {
      max-width: 100%;
      
      min-width: 100%;
    }
    .img-container {
      max-width: 100%;
    }
    .main-text {
      
      //width: 100%;
      font-size: 3rem;
      line-height: 1;
      text-align: center;
    }
    
    .btn-container {
        justify-content: center;
      padding: 50px 0px;
    }
    
    .get-started-btn {
      width: 200px;
      height:  70px;
    }

    @media only screen and (max-width: 600px) {
      padding:  100px 1.5rem 24px 1.5rem;
      margin-bottom: 20px;

      .main-text{
        font-size: 2rem;
        line-height: 1;
      }
      .get-started-btn {
        width: 200px;
        height:  70px;
      }
      
      //.img-container {
      //  width: 100%;
      //}
      .img {
        border-radius: 12px;
      }
      
      .btn-container {
        padding: 30px 0px;
      }
    }

  }
`
