import React, { useState, useEffect } from 'react';
import './App.css';
import sensor_data_api from "./API/sensor_data";
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { config } from './config';

import { SET_INIT_STATE, set_init_state } from './redux/store';
import InfoComponent from './InfoComponents/InfoComponent';
import SidebarComponent from './SidebarComponents/SidebarComponent';
import SensorListComponent from './SensorListComponents/SensorListComponent';

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

const LayoutSidebar = styled.div`  
    grid-area: sidebar;    
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
                dispatch(set_init_state(d.data))
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
    <LayoutTopology>
      
    </LayoutTopology>
    <LayoutSensorList>
      <SensorListComponent/>  
    </LayoutSensorList>
</Wrapper>   
  );
}

export default App;
