import React from "react";
import SensorListHeaderComponent from "./SensorListElement/SensorListHeaderComponent";
import SensorListRowComponent from "./SensorListElement/SensorListRowComponent";
import styled from "styled-components";
import Btn from "../Btn";
import { STATE } from "../redux/interface";
import { config } from "../config";
import { useSelector, useDispatch } from "react-redux";
import { SELECT_GATEWAY } from "../redux/store";


const TableContainer = styled.div<{size: number}>`
    ${(props) => "width:" + props.size + 'px;'}        
    border-spacing: 0;        
`

const SensorListTable = styled.table`
    width:100%;
`
const GatewayWrapper = styled.div`
    background:${config.layout.theme_color};    
`

const SensorListComponent = () => {        
    const dispatch = useDispatch();
    const update_time = useSelector((state: STATE) => state.update_time);
    
    const selected_factory_useable_sensor_list = useSelector((state: STATE) => state.selected_factory_useable_sensor_list)
    const selected_factory_sensor_data = useSelector((state:STATE) => state.selected_factory_sensor_data)        
    const selected_factory_gateway = useSelector((state:STATE) => state.selected_factory_gateway)
    const selected_gateway = useSelector((state:STATE) => state.selected_gateway)  
    const in_gateway_node = useSelector((state:STATE) => state.in_gateway_node)
    
    const sensor_id_list = Object.keys(selected_factory_sensor_data)    
    const selected_factory_gateway_list = Object.keys(selected_factory_gateway)    
    
    return (
        <div>
        <GatewayWrapper>
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
                        <Btn 
                        key={gateway} 
                        value={gateway} 
                        bg_color={button_color}
                        onClick={() => dispatch(select_gateway_action)}
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
                    {sensor_id_list.map((id, index) => {    
                        let mac_addr: string = ""
                        try {
                            mac_addr = selected_factory_sensor_data?.[id]?.data?.node_info?.[0]?.id ?? '';
                        } catch {
                            console.log("mac주소가 없습니다.");
                        }

                        let show_sensor = false;
                        if (selected_gateway === "")
                            show_sensor = true
                        else 
                            if (in_gateway_node.includes(mac_addr))
                                show_sensor = true
                        return show_sensor && <SensorListRowComponent                            
                                key={"sensor_row_data_" + index}
                                sensor_id={id}
                                row_index={index}                                                         
                                sensor_data={selected_factory_sensor_data?.[id]?.data?.sensors}
                            />
                    })}
                </tbody>
            </SensorListTable>
        </TableContainer>
        </div>
    );
};

export default SensorListComponent;
