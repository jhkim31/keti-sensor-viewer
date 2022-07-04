import React from "react";
import SensorNodeComponent from "./SensorNodeComponent";
import styled from "styled-components";
import { useSelector } from "react-redux";

const MapContainer = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
`
  
const MapComponent = () => {
    const selected_factory_sensor_data = useSelector(state => state.selected_factory ? state.all_sensor_data[state.selected_factory] : {})        
    
    const sensor_id_list = useSelector(state => {        
        const sensor_data = state.all_sensor_data;
        let selected_factory_sensor_data = {};
        if (Object.keys(sensor_data).length != 0 && state.selected_factory)
            selected_factory_sensor_data = sensor_data[state.selected_factory]
        return Object.keys(selected_factory_sensor_data).length > 0 ? Object.keys(selected_factory_sensor_data) : [];        
    })
    
    const sensor_position = useSelector(state => state.sensor_position)    
    const current_floor = useSelector(state => state.current_floor)        
    const selected_gateway = useSelector(state => state.selected_gateway)
    const in_gateway_node = useSelector(state => state.in_gateway_node)          
    return (
        <MapContainer>    
            {sensor_id_list.map((item) => {         
                let show_node = false;      
                let mode = "";
                let mac_addr = ""
                try {
                    mac_addr = selected_factory_sensor_data[item].data.node_info[0].id
                    mode = selected_factory_sensor_data[item].data.node_info[1].info.mode;
                } catch (e){
                    console.log(e)
                }

                try {                    
                    if (sensor_position[item].x)
                        if (sensor_position[item].floor === current_floor){                               
                            if (selected_gateway == "")
                                show_node = true;                                                            
                            else 
                                if (in_gateway_node.includes(mac_addr))
                                    show_node = true;                                                                                                                                                                                              
                        }                                                                                         
                    return show_node && <SensorNodeComponent key={item + new Date().getTime()} mode={mode} item={item} />;
                } catch (e) {                    
                    return null;
                }                
            })}
        </MapContainer>
    );
};

export default MapComponent;
