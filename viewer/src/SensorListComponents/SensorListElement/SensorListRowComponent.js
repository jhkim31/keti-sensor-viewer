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
        const selected_factory = useSelector(state => state.selected_factory);
        const selected_sensor = useSelector(state => state.selected_sensor);
        const selected_factory_useable_sensor_type_list = useSelector(state => state.selected_factory ? state.useable_sensor_by_factory[state.selected_factory] : [])        
        const selected_factory_sensor_data = useSelector(state => state.selected_factory ? state.all_sensor_data[state.selected_factory] : {})                
        
        let end_time = 0
        let start_time = 0
        let start_date_str = ''
        let end_date_str = ''
        let mode = ""
        let last_data_time_str = ''
        try{            
            end_time = new Date(selected_factory_sensor_data[sensor_id].service.timestamp * 1000)
            start_time = new Date(end_time - 3600000)
            start_date_str = `${start_time.getYear() + 1900}/${start_time.getMonth() + 1}/${start_time.getDate()}-${start_time.getHours()}:${start_time.getMinutes()}:${start_time.getSeconds()}`
            end_date_str = `${end_time.getYear() + 1900}/${end_time.getMonth() + 1}/${end_time.getDate()}-${end_time.getHours()}:${end_time.getMinutes()}:${end_time.getSeconds()}`

            let h = 0, m = 0, s = 0;
            s = Math.round((new Date() - end_time.getTime()) / 1000);
            h = Math.round(s / 3600);
            s %= 3600;
            m = Math.round(s / 60);
            s %= 60
            
            if (h > 0)
                last_data_time_str = `${h}시간`
            else if (m > 0)
                last_data_time_str = `${m}분`
            else 
            last_data_time_str = `${s}초`
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
        const tsdb_url = `http://io.energyiotlab.com:54242/#start=${start_date_str}&end=${end_date_str}&m=sum:${selected_factory}%7Bmac=${sensor_id},sensor=*%7D&o=&key=out%20center%20top%20horiz&wxh=1024x768&style=linespoint`
    return (
        <SelectSensorRow
            onClick={() => dispatch(select_sensor_action)}
            sensor_id={sensor_id}
            selected_sensor={selected_sensor}
        >
            <TableCell><b>{mode}</b></TableCell>
            <TableCell>                
                <a href={tsdb_url} target='_blank'>{sensor_id}</a>                                    
            </TableCell>
            <TableCell>
                {last_data_time_str}
            </TableCell>
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
