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
            icon={<PlusIcon/>}
            type="primary"
            style={{
                width: 75,
                height: 75,
                display:'flex',
                justifyContent:'center',
                // right: 24,
            }}
        />
    )
}

export default FloatingCreateButton;

const StyledFloatButton = styled(FloatButton)`


  @media only screen and (max-width: 600px) {
    //display: none;

  }
`
