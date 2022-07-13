import React from "react";
import styled from "styled-components";
import { config } from "../../config";
import { useDispatch, useSelector } from "react-redux";
import { SELECT_SENSOR } from "../../redux/store";
import { SENSOR, STATE } from "../../redux/interface";

const SelectSensorRow = styled.tr<{
    sensor_id: string,
    selected_node: string,
}>`
    ${(props) => {
        return "background:" + (props.sensor_id === props.selected_node ? config.layout.sensor_list.selected_bg+";" : config.layout.sensor_list.bg+";")
    }}
    cursor:pointer;
`

const TableCell = styled.td`
    width:110px;
`

interface SensorListProps {
    sensor_id: string,
    sensor_data?: {
        [sensor_name: string] : SENSOR
    },
    row_index: number
}
const SensorListRowComponent = (props: SensorListProps) => {         
        const dispatch = useDispatch();       
        const selected_factory = useSelector((state:STATE) => state.selected_factory);
        const selected_node = useSelector((state:STATE) => state.selected_node);
        const selected_factory_useable_sensor_list = useSelector((state:STATE) => state.selected_factory_useable_sensor_list)
        const selected_factory_sensor_data = useSelector((state:STATE) => state.selected_factory_sensor_data)
        const update_time = useSelector((state:STATE) => state.update_time);

        let start_time: Date, end_time: Date;        
        let start_date_str = ''
        let end_date_str = ''
        let mode = ""
        let last_data_time_str = ''
                            
        end_time = new Date((selected_factory_sensor_data?.[props.sensor_id]?.service?.timestamp ?? 0) * 1000)
        start_time = new Date(end_time.getTime() - 3600000)
        start_date_str = `${start_time.getFullYear()}/${start_time.getMonth() + 1}/${start_time.getDate()}-${start_time.getHours()}:${start_time.getMinutes()}:${start_time.getSeconds()}`
        end_date_str = `${end_time.getFullYear()}/${end_time.getMonth() + 1}/${end_time.getDate()}-${end_time.getHours()}:${end_time.getMinutes()}:${end_time.getSeconds()}`
        
        let h = 0, m = 0, s = 0;
        console.debug(end_time.getTime())
        s = Math.round((new Date().getTime() - end_time.getTime()) / 1000);
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
        mode = selected_factory_sensor_data?.[props.sensor_id]?.data.node_info?.[1]?.info?.mode ?? 'default_mode';
        
        const select_sensor_action = {
            type: SELECT_SENSOR,
            data: {
                selected_node: props.sensor_id
            }
        }                        
        const tsdb_url = "http://io.energyiotlab.com:54242/#start=${start_date_str}&end=${end_date_str}&m=sum:${selected_factory}%7Bmac=${sensor_id},sensor=*%7D&o=&key=out%20center%20top%20horiz&wxh=1024x768&style=linespoint"
    return (
        <SelectSensorRow
            onClick={() => dispatch(select_sensor_action)}
            sensor_id={props.sensor_id}
            selected_node={selected_node}
        >
            <TableCell><b>{mode}</b></TableCell>
            <TableCell>                
                <a href={tsdb_url} target='_blank'>{props.sensor_id}</a>                                    
            </TableCell>
            <TableCell>
                {last_data_time_str}
            </TableCell>
            { selected_factory_useable_sensor_list.map((item) => {                                 
                let value: string | number = props.sensor_data?.[item]?.value ?? '';
                if (typeof(value) == "number") {
                    value = value.toFixed(5);
                }
                return <TableCell key={props.row_index + "_" + item}>{value}</TableCell>
            })}
        </SelectSensorRow>
    );
};

export default SensorListRowComponent;
