import React from "react";
import SensorListHeaderComponent from "./SensorListElement/SensorListHeaderComponent";
import SensorListRowComponent from "./SensorListElement/SensorListRowComponent";
import styled from "styled-components";
import Btn from "../MapComponents/ButtonComponent/Btn";
import { config } from "../config";

const TableContainer = styled.div`
    ${(props) => {
        return "width:" + props.size + 'px;'
    }}
    border-spacing: 0;    
    
`

const SensorListTable = styled.table`
    width:100%;
`

const SensorListComponent = ({
        properties,        
}) => {        
    const selected_factory_useable_sensor_type_list = properties.main_data.selected_factory_useable_sensor_type_list;
    var selected_factory_sensor_data = properties.main_data.selected_factory_sensor_data;
    const sensor_id_list = Object.keys(properties.main_data.selected_factory_sensor_data); // 현재 공장 센서 리스트   ["Floe1234", "FloeABCD", ...]      
    const selected_factory_gateway = properties.main_data.gateway_data[properties.main_state.selected_factory]
    var selected_factory_gateway_list = []
    try{
        selected_factory_gateway_list = Object.keys(selected_factory_gateway)
    } catch{}      

    const this_gateway = (e) => {
        var gateway = e.target.innerHTML
        const show_node_list = selected_factory_gateway[gateway];
        var show_node_data = {}
        show_node_list.forEach(node => {
            show_node_data[node] = (selected_factory_sensor_data[node])
        })
        console.log(selected_factory_gateway)
        if (properties.main_state.selected_gateway == gateway){
            properties.set_main_data({
                ...properties.main_data,
                "in_gateway_node" : [],
            })
            properties.set_main_state({
                ...properties.main_state,
                "selected_gateway" : ""
            })
        } else {
            properties.set_main_data({
                ...properties.main_data,
                "in_gateway_node" : show_node_list,
            })
            properties.set_main_state({
                ...properties.main_state,
                "selected_gateway" : gateway
            })
        }
    }
    return (
        <div>
        {            
            selected_factory_gateway_list.map((gateway, ind) => {      
                if (properties.main_state.selected_gateway == gateway){
                    return (<Btn key={gateway} value={gateway} bg_color="red" onClick={this_gateway}>123</Btn>)
                } else {
                    return (<Btn key={gateway} value={gateway} bg_color={config.layout.button.bg_color}  onClick={this_gateway}>123</Btn>)
                }
                
            })            
        }
        <TableContainer
            size={(selected_factory_useable_sensor_type_list.length + 1) * 120}
        >
            <SensorListTable>
                <thead>
                    <SensorListHeaderComponent
                        selected_factory_useable_sensor_type_list={selected_factory_useable_sensor_type_list}
                    />
                </thead>
                <tbody>
                    {sensor_id_list.map((id, index) => {    
                        var mac_addr = selected_factory_sensor_data[id].data.node_info[0].id;
                        if (properties.main_state.selected_gateway == ""){
                            return (
                                <SensorListRowComponent
                                    key={"sensor_row_data_" + index}
                                    sensor_id={id}
                                    row_index={index}
                                    selected_factory_useable_sensor_type_list={selected_factory_useable_sensor_type_list}      
                                    selected_factory_sensor_data={selected_factory_sensor_data}                          
                                    sensor_data={selected_factory_sensor_data[id].data.sensors}                                                                                                
                                    properties={properties}                                                   
                                />
                            );
                        } else {
                            if (properties.main_data.in_gateway_node.includes(mac_addr)){
                                return (
                                    <SensorListRowComponent
                                        key={"sensor_row_data_" + index}
                                        sensor_id={id}
                                        row_index={index}
                                        selected_factory_useable_sensor_type_list={selected_factory_useable_sensor_type_list}      
                                        selected_factory_sensor_data={selected_factory_sensor_data}                          
                                        sensor_data={selected_factory_sensor_data[id].data.sensors}                                                                                                
                                        properties={properties}                                                   
                                    />
                                );
                            }
                        }
                    })}
                </tbody>
            </SensorListTable>
        </TableContainer>
        </div>
    );
};

export default SensorListComponent;
