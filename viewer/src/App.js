import React, { useState, useEffect } from "react";
import SensorListComponent from "./SensorListComponents/SensorListComponent";
import SidebarComponent from "./SidebarComponents/SidebarComponent";
import TopologyComponent from "./TopologyComponents/TopologyComponent";
import styled from "styled-components";
import sensor_data_api from "./API/sensor_data";
import InfoComponent from "./InfoComponents/InfoComponent";
import { config } from "./config";
import { useDispatch } from "react-redux";
import { SET_INIT_STATE } from "./reducer/store";

const Wrapper = styled.div`
    display: grid;
    height: 100%;
    grid-template-rows: ${config.layout.row[0]} ${config.layout.row[1]} ${config.layout.row[2]};
    grid-template-columns: ${config.layout.col[0]} ${config.layout.col[1]};
    grid-template-areas:
        "info_component info_component"
        "sidebar map "
        "sidebar sensorlist";
`;

const LayoutSidebar = styled.div`  
    grid-area: sidebar;
    /* background:yellow; */
    border:${config.layout.border};
    color:red;
    background:${config.layout.theme_color};
`

const LayoutSensorList = styled.div`
    border:${config.layout.border};
    grid-area:sensorlist;
    overflow:scroll;
    background:${config.layout.theme_color};
`

const App = () => {        
    const dispatch = useDispatch();

    useEffect(() => {        
        const url = '/all-sensor-data'
        sensor_data_api.get(url)
        .then(d => {
            if (d.status == 200){
                dispatch({
                    type: SET_INIT_STATE,
                    data: d.data
                })
            }
        })
        .catch(e => {
            console.log(e)
        })                
    }, [])  
    
    return (
        <Wrapper>
            <InfoComponent/>                            
            <LayoutSidebar>
                <SidebarComponent/>                                 
            </LayoutSidebar>            
            <TopologyComponent/>
            <LayoutSensorList>
                <SensorListComponent/>
            </LayoutSensorList>
        </Wrapper>
    );
};
export default App;