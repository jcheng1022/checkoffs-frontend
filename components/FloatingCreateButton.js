'use client';

import {FloatButton} from "antd";
import {Plus} from "react-feather";
import styled from "styled-components";
import {PlusIcon} from "lucide-react";
import {useAppContext} from "@/context/AppContext";

const FloatingCreateButton = ({ onClick }) => {
    const { setCreatingNewActivity } = useAppContext()
     return (
        <StyledFloatButton
            onClick={() => setCreatingNewActivity(true)}
            icon={<span className={'add-icon'}>+</span>}
            type="primary"
            style={{
                width: 50,
                height: 50,
                display:'flex',
                justifyContent:'center',
                zIndex: 2
                // right: 24,
            }}
        />
    )
}

export default FloatingCreateButton;

const StyledFloatButton = styled(FloatButton)`


  .add-icon {
    font-size: 30px;
    margin-bottom: 5px;
  }
  @media only screen and (max-width: 650px) {
    display: none;
  }
`
