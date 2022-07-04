import React from "react";
import styled from "styled-components";
import MapControlButtonComponent from "./ButtonComponent/MapControlButtonComponent";
import NodeViewerComponent from "./NodeVisualization/Background/NodeViewerComponent";

const WrapperDIV = styled.div`    
    height:100%;
    display: grid;
    overflow:hidden;    
    grid-template-rows: 40px 1fr;
    grid-template-columns: 1fr;
    grid-template-areas:
        "btn_space"
        "node_space";    
`

const TopologyComponent = () => {                
    return (
        <WrapperDIV>            
            <MapControlButtonComponent/> 
            <NodeViewerComponent/>                      
        </WrapperDIV>
    );
};

export default TopologyComponent;
