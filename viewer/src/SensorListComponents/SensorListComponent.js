import React from "react";
import SensorListHeaderComponent from "./SensorListElement/SensorListHeaderComponent";
import SensorListRowComponent from "./SensorListElement/SensorListRowComponent";
import styled from "styled-components";
import Btn from "../Btn";
import { config } from "../config";
import { useSelector, useDispatch } from "react-redux";
import { SELECT_GATEWAY } from "../reducer/store";


const TableContainer = styled.div`
    ${(props) => "width:" + props.size + 'px;'}        
    border-spacing: 0;        
`

const SensorListTable = styled.table`

    width:100%;
`
const GatewayWrapper = styled.div`
    ${(props) => "width:" + props.size + 'px;'}        
    background:${config.layout.theme_color};    
`

const SensorListComponent = () => {        
    const dispatch = useDispatch();
    const last_update_time = useSelector(state => state.last_update_time);
    
    const selected_factory_useable_sensor_list = useSelector(state => state.selected_factory_useable_sensor_list)
    const selected_factory_data = useSelector(state => state.selected_factory_data)        
    const selected_factory_gateway_list = useSelector(state => state.selected_factory_gateway_list)
    const selected_gateway = useSelector(state => state.selected_gateway)  
    const selected_gateway_node_list = useSelector(state => state.selected_gateway_node_list)
    
    const node_id_list = Object.keys(selected_factory_data)        
    
    return (
        <div>
        <GatewayWrapper
            size={(selected_factory_gateway_list.length + 1) * 150}
        >
            {            
                selected_factory_gateway_list.map((gateway) => {      
                    const select_gateway_action = {
                        type: SELECT_GATEWAY,
                        data: {
                            gateway: gateway                                        
                        } 
                    }
                    let button_color = config.layout.button.bg_color;                
                    if (selected_gateway === gateway)
                        button_color = "red"                        
                    return (
                        <Btn key={gateway} 
                        value={(/^[A-F0-9]{2}(:[A-F0-9]{2}){5}$/).test(gateway) ? gateway : "error"} bg_color={button_color}
                            onClick={() => {
                                if ((/^[A-F0-9]{2}(:[A-F0-9]{2}){5}$/).test(gateway))
                                    dispatch(select_gateway_action)
                            }}
                        />                    
                    )                                                    
                })            
            }
        </GatewayWrapper>
       
        <TableContainer
            size={(selected_factory_useable_sensor_list.length + 1) * 120}
        >
            <SensorListTable>
                <thead>
                    <SensorListHeaderComponent/>                    
                </thead>
                <tbody>
                    {node_id_list.map((id, index) => {    
                        let mac_addr = ""
                        try {
                            mac_addr = selected_factory_data[id].data.node_info[0].id;
                        } catch {
                            console.log("mac주소가 없습니다.");
                        }

                        let show_sensor = false;
                        if (selected_gateway === "")
                            show_sensor = true
                        else 
                            if (selected_gateway_node_list.includes(mac_addr))
                                show_sensor = true
                        return show_sensor && <SensorListRowComponent                            
                                key={"sensor_row_data_" + index}
                                sensor_id={id}
                                row_index={index}                                                         
                                sensor_data={selected_factory_data[id].data.sensors}                                                                                                                                                                                   
                            />
                    })}
                </tbody>
            </SensorListTable>
        </TableContainer>
        </div>
    );
};

export default SensorListComponent;
