import React, { useState, useEffect } from "react";
import SensorListComponent from "./SensorListComponents/SensorListComponent";
import SidebarComponent from "./SidebarComponents/SidebarComponent";
import TopologyComponent from "./TopologyComponents/TopologyComponent";
import InfoComponent from "./InfoComponents/InfoComponent";

import styled from "styled-components";
import sensor_data_api from "./API/sensor_data";

import { config } from "./config";
import { useDispatch } from "react-redux";
import { SET_INIT_STATE } from "./reducer/store";
import { useMediaQuery } from "react-responsive";

const Wrapper = styled.div`
    display: grid;
    height: 100%;
    grid-template-rows: ${config.layout.row};
    grid-template-columns: ${config.layout.col};    
    grid-template-areas:
        "info_component info_component"
        "sidebar map "
        "sidebar sensorlist";
`;

const Mobile_Wrapper = styled.div`
    display: grid;
    height: 100%;
    grid-template-rows: ${config.mobile_layout.row};
    grid-template-columns: ${config.mobile_layout.col};    
    grid-template-areas:
        "info_component"
        "map"
        "sensorlist";
`

const LayoutSidebar = styled.div`  
    grid-area: sidebar;    
    border:${config.layout.border};
    color:red;
    background:${config.layout.theme_color};
`

const Mobile_LayoutSidebar = styled.div`  
    position:fixed;
    top:0;
    left:0;
    visibility:${props => props.show ? "visible" : "hidden"};        
    width:200px;
    height:100%;
    border:${config.layout.border};
    color:red;
    background:${config.layout.theme_color};
`

const LayoutTopology = styled.div`
    grid-area: map;        
    color:white;
    background:white;
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

    const is_mobile = useMediaQuery({ maxDeviceWidth: 1199 })
    const [show_sidebar, set_show_sidebar] = useState(false)
    
    return (                  
        <>
        {
            !is_mobile && 
            <Wrapper>
                <InfoComponent/>              
                <LayoutSidebar>
                    <SidebarComponent/>                                 
                </LayoutSidebar>
                <LayoutTopology>
                    <TopologyComponent/>
                </LayoutTopology>
                <LayoutSensorList>
                    <SensorListComponent/>
                </LayoutSensorList>
            </Wrapper>                    
        }
        {
            is_mobile && 
            <>
            <Mobile_Wrapper>
                <InfoComponent set_show_sidebar = {set_show_sidebar} />                
                <TopologyComponent/>
                <LayoutSensorList>
                    <SensorListComponent/>
                </LayoutSensorList>                
            </Mobile_Wrapper>      
            <Mobile_LayoutSidebar  show={show_sidebar}>
                <SidebarComponent set_show_sidebar = {set_show_sidebar}  />                                 
            </Mobile_LayoutSidebar>                                               
            </>
        }
        </>  
    );
};
export default App;