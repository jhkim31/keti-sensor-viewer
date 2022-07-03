import React from "react";
import styled from "styled-components";
import { config } from "../../config";

const SelectSensorRow = styled.tr`
    ${(props) => {
        return "background:" + (props.sensor_id === props.selected_sensor ? config.layout.sensor_list.selected_bg+";" : config.layout.sensor_list.bg+";")
    }}
    cursor:pointer;
`

const TableCell = styled.td`
    width:110px;
`

const SensorListRowComponent = ({
        sensor_id, // 센서 아이디        
        sensor_data, // 현재 센서의 센서 데이터        
        selected_factory_useable_sensor_type_list,      
        selected_factory_sensor_data,  
        row_index, // key를 위한 행 인덱스
        properties        
    }) => {                 
        let mode = ""
        try{
            mode = selected_factory_sensor_data[sensor_id].data.node_info[1].info.mode;
        } catch{
            mode = ""
        }
    return (
        <SelectSensorRow
            onClick={() => {
                properties.set_main_state({
                    ...properties.main_state,
                    "selected_sensor" : sensor_id
                })                
            }}
            sensor_id={sensor_id}
            selected_sensor={properties.main_state.selected_sensor}
        >
            <TableCell><b>{mode}</b></TableCell>
            <TableCell>{sensor_id}</TableCell>
            { selected_factory_useable_sensor_type_list.map((item) => {
                let value = "";
                try {
                    if (sensor_data[item].value) {
                        value = sensor_data[item].value;
                        if (!Number.isInteger(value)) {
                            value = value.toFixed(5);
                        }
                    }
                } catch {}
                return (
                    <TableCell
                        key={row_index + "_" + item}                    
                    >
                        {value}
                    </TableCell>
                );
            })}
        </SelectSensorRow>
    );
};

export default SensorListRowComponent;
