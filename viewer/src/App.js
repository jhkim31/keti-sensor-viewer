import React, { useState, useEffect } from "react";
import { get_keys, get_gateway} from "./lib";
import SensorListComponent from "./SensorListComponents/SensorListComponent";
import SidebarComponent from "./SidebarComponents/SidebarComponent";
import TopologyComponent from "./MapComponents/TopologyComponent";
import styled from "styled-components";
import sensor_data_api from "./API/sensor_data";
import InfoComponent from "./InfoComponents/InfoComponent";
import { config } from "./config";

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

    const [main_state, set_main_state] = useState(config.init_state)
    const [main_data, set_main_data] = useState(config.init_data)    

    const properties = {
        "main_state" : main_state,
        "set_main_state" : set_main_state,
        "main_data" : main_data,
        "set_main_data" : set_main_data
    }

    function get_sensor_data(){
        console.log('test!')
        sensor_data_api.get('/all-sensor-data')                    
            .then(d => {
                console.log(get_gateway(d.data))
                set_main_state({
                    ...main_state,                    
                    "update_time" : new Date().toString()                    
                })
                set_main_data({
                    ...main_data,
                    "all_sensor_data" : d.data,
                    "keti_useable_sensor_by_factory" : get_keys(d.data),
                    "keti_factory_list" : Object.keys(get_keys(d.data)),
                    "gateway_data" : get_gateway(d.data)
                })                                
            })    
    }

    useEffect(() => {
        get_sensor_data();
    }, [])  

    const factory_select_event = (factory) => {             
        const url = `/sensor-position-data?factory=${factory}`;        
        sensor_data_api.get(url)        
            .then(d => {                                
                set_main_state({
                    ...main_state,                    
                    "selected_factory" : factory,
                    "min_floor" : d.data.factory_info.min_floor,                    
                    "max_floor" : d.data.factory_info.max_floor,                    
                    "current_floor" : d.data.factory_info.min_floor,
                    "map_index" : 0      ,
                    "selected_gateway" : ""      ,
                    "selected_sensor" : ""        
                })
                set_main_data({
                    ...main_data,
                    "map_list" : d.data.factory_info.floor,
                    "sensor_position" : d.data.sensor_position,
                    "selected_factory_useable_sensor_type_list" : main_data.keti_useable_sensor_by_factory[factory],                    
                    "selected_factory_sensor_data" : main_data.all_sensor_data[factory],
                    "in_gateway_node" : []
                })                            
            })                
    };
    
    return (
        <Wrapper>
            <InfoComponent
                main_state={main_state}
            ></InfoComponent>            
            <LayoutSidebar>
                <SidebarComponent
                    properties={properties}                    
                    factory_select_event={factory_select_event}
                />
            </LayoutSidebar>            
            <TopologyComponent
                properties={properties}             
                factory_select_event={factory_select_event}
            ></TopologyComponent>            
            <LayoutSensorList>
                <SensorListComponent 
                    properties={properties}
                    main_state={main_state}
                    main_data={main_data}
                    set_main_state={set_main_state}                  
                />
            </LayoutSensorList>
        </Wrapper>
    );
};
export default App;