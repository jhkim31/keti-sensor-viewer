import React from "react";
import styled from "styled-components";
import MapControlButtonComponent from "./ButtonComponent/MapControlButtonComponent";

import NodeViewerComponent from "./NodeVisualization/Background/NodeViewerComponent";


const WrapperDIV = styled.div`
    border:1px solid black;
    display: grid;
    overflow:hidden;    
    grid-template-rows: 40px 1fr;
    grid-template-columns: 1fr;
    grid-template-areas:
        "btn_space"
        "node_space";    
`

const TopologyComponent = ({
    properties,
    factory_select_event
}) => {
    const sensor_list = Object.keys(properties.main_data.selected_factory_sensor_data);
    const visulazation_sensor_list = Object.keys(properties.main_data.sensor_position);        
    const non_visulazation_sensor_list = sensor_list.filter(x => !visulazation_sensor_list.includes(x));
    return (
        <WrapperDIV>            
            <MapControlButtonComponent
                properties={properties}          
                non_visulazation_sensor_list={non_visulazation_sensor_list}
                factory_select_event={factory_select_event}   
                visulazation_sensor_list={visulazation_sensor_list}
            /> 
            <NodeViewerComponent
                properties={properties}             
            />                            
        </WrapperDIV>
    );
};

export default TopologyComponent;
