import React from "react";
import SensorNodeComponent from "./SensorNodeComponent";
import styled from "styled-components";

const MapContainer = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
`
  
const MapComponent = ({ 
    properties
}) => {
    const sensor_id_list = Object.keys(properties.main_data.selected_factory_sensor_data); // 현재 공장 센서 리스트
    const selected_factory_sensor_data = properties.main_data.selected_factory_sensor_data;
    console.log('reuder')
    // debugger;   
    return (
        <MapContainer>    
            {sensor_id_list.map((item) => {         
                let show_node = false;      
                let mode = "";
                var mac_addr = selected_factory_sensor_data[item].data.node_info[0].id
                try {
                    if (properties.main_data.sensor_position[item].x) {                                                
                        if (properties.main_data.sensor_position[item].floor === properties.main_state.current_floor){   
                            console.trace("gateway: " , properties.main_state.selected_gateway);
                            if (properties.main_state.selected_gateway == ""){
                                show_node = true;                            
                                mode = selected_factory_sensor_data[item].data.node_info[1].info.mode;
                            } else {
                                if (properties.main_data.in_gateway_node.includes(mac_addr)){
                                    show_node = true;                            
                                    mode = selected_factory_sensor_data[item].data.node_info[1].info.mode;
                                }
                            }                                          
                            
                        }                                                                           
                    }
                } catch (e) {console.log(e)}            
                    return show_node ? <SensorNodeComponent key={item + new Date().getTime()} mode={mode} properties={properties} item={item} /> : null ;
            })}
        </MapContainer>
    );
};

export default MapComponent;
