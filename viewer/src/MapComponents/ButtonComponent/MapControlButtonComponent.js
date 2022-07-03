import React, {useState} from "react";
import styled from "styled-components";
import FloorEditPopupComponent from "../Popup/FloorEditPopupComponent";
import NodeAddPopup from "../Popup/NodeAddPopup";
import NodeDeletePopup from "../Popup/NodeDeletePopup";
import sensor_data_api from "../../API/sensor_data";
import Btn from "./Btn";

const BtnSpace = styled.div`
    grid-area: btn_space;
`

const MapControlButtonComponent = ({    
    properties,
    non_visulazation_sensor_list,
    factory_select_event,
    visulazation_sensor_list
}) => {
    const [p1, set_p1] = useState(1)
    const down_stair = () => {     
        if (properties.main_state.current_floor > properties.main_state.min_floor) {                        
            let last_floor = properties.main_state.current_floor;
            const min_floor = properties.main_state.min_floor;            
            properties.set_main_state({
                ...properties.main_state,
                "current_floor" : last_floor - 1,
                "map_index" : min_floor - (last_floor - 1)
            })
        }
    }

    const up_stair = () => {        
        if (properties.main_state.current_floor < properties.main_state.max_floor) {                        
            let last_floor = properties.main_state.current_floor;
            const min_floor = properties.main_state.min_floor;            
            properties.set_main_state({
                ...properties.main_state,
                "current_floor" : last_floor + 1,
                "map_index" : min_floor - (last_floor + 1)
            })                                                                      
        }
    }
    return (
        <BtnSpace>
            <Btn
                onClick={down_stair}
                value={"down"}
            />
            
            <Btn
               onClick={up_stair}
               value={"up"}
            />            
            <Btn
                onClick={() => {
                    const url = '/add-floor';
                    const post_data = {
                        factory: properties.main_state.selected_factory,
                        floor: properties.main_state.max_floor + 1
                    };
                    sensor_data_api.post(url, post_data)
                    .then(d => {          
                        properties.set_main_state({
                            ...properties.main_state,                    
                            "min_floor" : d.data.min_floor,                    
                            "max_floor" : d.data.max_floor,                    
                            "current_floor" : d.data.max_floor,
                            "map_index" : d.data.min_floor - d.data.max_floor
                        })                        
                    })
                }}
                value={"add floor"}
            />                
            <Btn
                onClick={() => {
                    const url = '/delete-floor';
                    const post_data = {
                        factory: properties.main_state.selected_factory                        
                    }                    
                    sensor_data_api.post(url, post_data)                                                  
                    .then(d => {                                    
                        properties.set_main_state({
                            ...properties.main_state,                    
                            "min_floor" : d.data.min_floor,                    
                            "max_floor" : d.data.max_floor,                    
                            "current_floor" : d.data.max_floor,
                            "map_index" : d.data.min_floor - d.data.max_floor 
                        })
                    })                    
                }}
                value={"delete floor"}
            />                            
            <FloorEditPopupComponent
                properties={properties}             
            />       
            <NodeAddPopup
                properties={properties}             
                non_visulazation_sensor_list={non_visulazation_sensor_list}
                factory_select_event={factory_select_event}
            ></NodeAddPopup>
            
            <NodeDeletePopup
                properties={properties}             
                visulazation_sensor_list={visulazation_sensor_list}
                factory_select_event={factory_select_event}
            ></NodeDeletePopup>              
        </BtnSpace>
    );
};

export default MapControlButtonComponent;
