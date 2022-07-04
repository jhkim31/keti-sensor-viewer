import React, { useState } from "react";
import styled from "styled-components";
import Draggable from "react-draggable";
import sensor_data_api from "../../../API/sensor_data";
import { config } from "../../../config";
import { useSelector, useDispatch } from "react-redux";
import { NODE_MOVE_STOP } from "../../../reducer/store";

const SensorNode = styled.div`
    cursor: ${config.layout.sensor_node.cursor};
    color: ${config.layout.sensor_node.color};
    background: ${props => (props.sensor_id === props.selected_sensor ? config.layout.sensor_node.selected_node_color : props.node_color)};
    position: absolute;
    left: ${props => {
        return props.left + "px"
    }};
    top: ${props => {
        return props.top + "px"
    }};
    width: ${props => (props.sensor_id === props.selected_sensor ? "20px" : "10px")};
    height: ${props => (props.sensor_id === props.selected_sensor ? "20px" : "10px")};

    border:${(props) => {
        if (props.mode === "gateway"){
            return config.layout.sensor_node.gateway_node_border
        } else {
            return config.layout.sensor_node.border
        }
    }};    
    border-radius: 20px;
    visibility: ${props => (props.visible)};
`;

const SensorNodeInfo = styled.div`
    position: relative;
    background:white;
    z-index:2;
    width:300px;
    top: -20px;
    left: 20px;
    visibility: ${props => (props.isShown === true ? "visible" : "hidden")};
    pointer-events: none;
`;

const SensorNodeComponent = ({     
    mode,
    item
}) => {        
    const dispatch = useDispatch();
    
    const [isShown, set_isShown] = useState(false);    
    const selected_factory = useSelector(state => state.selected_factory);
    const selected_sensor = useSelector(state => state.selected_sensor);
    const sensor_position = useSelector(state => state.sensor_position[item]);

    const selected_factory_sensor_data = useSelector(state => state.selected_factory ? state.all_sensor_data[state.selected_factory] : {})        

    const width = window.innerWidth - 200;
    const height = config.layout.topology_component.height;    
    const left = sensor_position.x * width;
    const top = sensor_position.y * height; 
    let service_time = ""
    try{
        service_time = selected_factory_sensor_data[item].service.timestamp;
    } catch {

    }
    
    const node_color = (() => {
        const dif_minutes = (new Date().getTime() - (service_time * 1000)) / (1000 * 60);                       
        if (dif_minutes < config.layout.sensor_node.sensor_color_change_time[0])
            return config.layout.sensor_node.node_color[0];
        else if (dif_minutes < config.layout.sensor_node.sensor_color_change_time[1])
            return config.layout.sensor_node.node_color[1];
        else if (dif_minutes < config.layout.sensor_node.sensor_color_change_time[2])
            return config.layout.sensor_node.node_color[2];
        else if (dif_minutes < config.layout.sensor_node.sensor_color_change_time[3])
            return config.layout.sensor_node.node_color[3];
        else if (dif_minutes < config.layout.sensor_node.sensor_color_change_time[4])
            return config.layout.sensor_node.node_color[4];
        else 
            return config.layout.sensor_node.node_color[5];
        
    })();                          
    return (
        <Draggable
            onStop={(_, data) => {
                const rat_x = (left + data.x) / width;
                const rat_y = (top + data.y) / height;                
                const post_data = {
                    factory: selected_factory,
                    sensor_id: item,
                    x: rat_x,
                    y: rat_y,
                    floor: 1,
                };
                const url = "/sensor-position";                       
                sensor_data_api.post(url, post_data)         
                .then(d => {                         
                    if (d.status == 200){
                        const node_move_stop_action = {
                            type: NODE_MOVE_STOP,
                            data: {
                                item: item,
                                sensor_position: d.data.sensor_position
                            }
                        }
                        dispatch(node_move_stop_action)                        
                    }                                                                         
                })  
            }}
        >
            <SensorNode
                left={left}
                top={top}
                mode={mode}
                node_color={node_color}
                sensor_id={item}
                selected_sensor={selected_sensor}
                onMouseOver={() => set_isShown(true)}
                onMouseLeave={() => set_isShown(false)}
            >
                <SensorNodeInfo isShown={isShown}>
                    <div> {item} </div>
                    <div> {new Date(service_time).toString()} </div>                    
                </SensorNodeInfo>
            </SensorNode>
        </Draggable>
    );
};

export default SensorNodeComponent;
