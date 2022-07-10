import React from "react";
import styled from "styled-components";
import MapControlButtonComponent from "./MapControlButtonComponent";
import MapComponent from "./MapComponent";


const WrapperDIV = styled.div`    
    height:100%;    
    overflow:hidden;        
`

const TopologyComponent = () => {                
    return (
        <WrapperDIV>            
            <MapControlButtonComponent/> 
            <MapComponent/>             
        </WrapperDIV>
    );
};

export default TopologyComponent;
