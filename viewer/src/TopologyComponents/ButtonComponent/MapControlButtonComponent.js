import React from "react";
import styled from "styled-components";
import FloorEditPopupComponent from "../Popup/FloorEditPopupComponent";
import NodeAddPopup from "../Popup/NodeAddPopup";
import NodeDeletePopup from "../Popup/NodeDeletePopup";


const BtnSpace = styled.div`
    grid-area: btn_space;
`

const MapControlButtonComponent = () => {            
    return (
        <BtnSpace>            
            <FloorEditPopupComponent/>
            <NodeAddPopup />                                        
            <NodeDeletePopup/>
        </BtnSpace>
    );
};

export default MapControlButtonComponent;
