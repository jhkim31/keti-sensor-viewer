import React from "react";
import styled from "styled-components";
import FixedButton from "./Button/FixedButton";
import FloorEditPopupComponent from "./Button/FloorEditPopupComponent";
import NodeAddPopup from "./Button/NodeAddPopup";
import NodeDeletePopup from "./Button/NodeDeletePopup";
import RefreshBtn from "./Button/RefreshBtn";
import EdgesButton from './Button/EdgesButton'
import { useSelector } from "react-redux";


const BtnSpace = styled.div`
    height: 40px;    
`

const MapControlButtonComponent = () => {            
    const selected_factory = useSelector(state => state.selected_factory)
    return (
        <>
            { 
            selected_factory && <BtnSpace>            
                <FloorEditPopupComponent/>
                <NodeAddPopup />                                        
                <NodeDeletePopup/>
                <RefreshBtn/>
                <FixedButton/>
                <EdgesButton/>
            </BtnSpace>
            }
        </>
    );
};

export default MapControlButtonComponent;
