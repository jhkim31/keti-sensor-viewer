import React from "react";
import styled from "styled-components";
import { config } from "../../config";
import { useDispatch, useSelector } from "react-redux";
import { SET_SELECTED_SENSOR } from "../../reducer/store";

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
        row_index, // key를 위한 행 인덱스        
    }) => {         
        const dispatch = useDispatch();       
        const selected_sensor = useSelector(state => state.selected_sensor) 
        const selected_factory_useable_sensor_type_list = useSelector(state => state.selected_factory ? state.useable_sensor_by_factory[state.selected_factory] : [])        
        const selected_factory_sensor_data = useSelector(state => state.selected_factory ? state.all_sensor_data[state.selected_factory] : {})        

        let mode = ""
        try{
            mode = selected_factory_sensor_data[sensor_id].data.node_info[1].info.mode;
        } catch{
            console.log("mode정보가 없습니다.");
        }
        const select_sensor_action = {
            type: SET_SELECTED_SENSOR,
            data: {
                selected_sensor: sensor_id
            }
        }        
    return (
        <SelectSensorRow
            onClick={() => dispatch(select_sensor_action)}
                
            
            sensor_id={sensor_id}
            selected_sensor={selected_sensor}
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
                return <TableCell key={row_index + "_" + item}>{value}</TableCell>
            })}
        </SelectSensorRow>
    );
};

export default SensorListRowComponent;
