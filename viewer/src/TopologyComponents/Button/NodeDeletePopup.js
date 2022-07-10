import React, {useState} from "react";
import styled from "styled-components";
import sensor_data_api from "../../API/sensor_data";
import Btn from "../../Btn";
import { config } from "../../config";
import { useDispatch, useSelector } from "react-redux";
import { NODE_MOVE_STOP } from "../../reducer/store";

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
;    `

const WrapDiv = styled.div`
    display:inline-block;
`

const NodeDeletePopup = () => {
    const dispatch = useDispatch();

    const sensor_list = useSelector((state) => {
        return Object.keys(state.all_sensor_data).length > 0 && state.selected_factory ? Object.keys(state.all_sensor_data[state.selected_factory]) : []       
    })    

    const visulazation_sensor_list = useSelector((state) => Object.keys(state.sensor_position))
    const non_visulazation_sensor_list = sensor_list.filter(x => !visulazation_sensor_list.includes(x));        
    const selected_factory = useSelector(state => state.selected_factory);

    const [is_show, set_is_show] = useState(false);

    const open = () => {
        set_is_show(true);
    };

    const close = () => {
        set_is_show(false);
    };

    const delete_node_post = (sensor_id) => {        
        const post_data = {
            factory: selected_factory,
            sensor_id: sensor_id,            
        };
        const url = "/delete_node_position";                
        sensor_data_api.post(url, post_data)   
        .then(d => {            
            if (d.status == 200){
                const node_move_stop_action = {
                    type: NODE_MOVE_STOP,
                    data: {
                        item: '',
                        sensor_position: d.data.sensor_position
                    }
                }
                dispatch(node_move_stop_action)
            }
        })                         
    }
    return (
        <WrapDiv>
            <Btn value={"노드 삭제"} onClick={() => open()} />
            {           
                is_show && 
                <PopupBackground>
                    <PopupItem>                        
                    <button
                            onClick={() => close()}
                            style={{        
                                position:"sticky",
                                top: "0",                        
                                float:"right",                                
                            }}
                        >close</button> 
                        {visulazation_sensor_list.map(item => {
                            return(
                                <div
                                key={item}
                                onClick={() => {                                    
                                    delete_node_post(item)
                                    close()
                                }}
                                >{item}</div>
                            )
                        })
                        }                                                                                                                                     
                    </PopupItem>     
                </PopupBackground>           
            }
        </WrapDiv>    
    )
};

export default NodeDeletePopup;