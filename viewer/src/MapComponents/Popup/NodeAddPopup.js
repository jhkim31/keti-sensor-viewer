import React, {useState} from "react";
import styled from "styled-components";
import sensor_data_api from "../../API/sensor_data";
import Btn from "../ButtonComponent/Btn";
import { config } from "../../config";

const PopupItem = styled.div`
    z-index: 999;
    background:${config.layout.popup.bg_color};
    position:relative;
    left:25%;
    top:20%;
    width:50%;
    height:30%;    
    overflow:scroll;
`

const PopupBackground = styled.div`
    z-index:999;
    position:fixed;
    left:0;
    top:0;
    width:100%;
    height:100%;
    background:rgba(0,0,0,${config.layout.popup.bg_alpha}); 
`

const WrapDiv = styled.div`
    display:inline-block;
`

const NodeAddPopup = ({
    properties,
    non_visulazation_sensor_list
}) => {    
    const [is_show, set_is_show] = useState(false);

    const open = () => {
        set_is_show(true);
    };

    const close = () => {
        set_is_show(false);
    };

    const add_node_post = (sensor_id) => {        
        const post_data = {
            factory: properties.main_state.selected_factory,
            sensor_id: sensor_id,            
        };
        const url = "/add_node_position";                
        sensor_data_api.post(url, post_data)                  
        .then(d => {            
            properties.set_main_state({
                ...properties.main_state,
                "selected_sensor" : sensor_id
            })
            properties.set_main_data({
                ...properties.main_data,
                "sensor_position" : d.data.sensor_position
            })
        })        
    }
    return (
        <WrapDiv>
            <Btn
                onClick={() => {
                    open()
                }}                                   
                value={"노드 추가"}
            />
            {           
                is_show && 
                <PopupBackground>
                    <PopupItem>                        
                        {                        
                            non_visulazation_sensor_list.map(item => {
                                return(
                                    <div
                                    key={item}
                                    onClick={() => {                                    
                                        add_node_post(item)
                                        close()
                                    }}
                                    >{item}</div>
                                )
                            })
                        }                                                                                                                                      
                        <button
                            onClick={() => {
                                close()
                            }}
                            style={{                                
                                float:"right",
                            }}
                        >close</button>
                    </PopupItem>                         
                </PopupBackground>           
            }
        </WrapDiv>    
    )
};

export default NodeAddPopup;
