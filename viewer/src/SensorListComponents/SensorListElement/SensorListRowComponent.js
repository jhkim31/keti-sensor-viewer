import React from "react";
import styled from "styled-components";
import { config } from "../../config";
import { useDispatch, useSelector } from "react-redux";
import { SELECT_NODE } from "../../reducer/store";

const SelectSensorRow = styled.tr`
    ${(props) => {
        return "background:" + (props.node_id === props.selected_node ? config.layout.sensor_list.selected_bg+";" : config.layout.sensor_list.bg+";")
    }}
    cursor:pointer;
`

const TableCell = styled.td`
    width:110px;
`

const SensorListRowComponent = ({
        node_id,
        row_index,
    }) => {

        const dispatch = useDispatch();
        const selected_factory = useSelector(state => state.selected_factory);
        const selected_node = useSelector(state => state.selected_node);
        const useable_sensor_list = useSelector(state => state.selected_factory_useable_sensor_list)
        const node_data = useSelector(state => state.selected_factory_data[node_id])
        const sensor_data = node_data?.data.sensors;
        const last_update_time = useSelector(state => state.last_update_time);

        const end_time = new Date((node_data?.service?.timestamp ?? 0) * 1000)
        const start_time = new Date(end_time - 3600000)
        const start_date_str = `${start_time.getFullYear()}/${start_time.getMonth() + 1}/${start_time.getDate()}-${start_time.getHours()}:${start_time.getMinutes()}:${start_time.getSeconds()}`
        const end_date_str = `${end_time.getFullYear()}/${end_time.getMonth() + 1}/${end_time.getDate()}-${end_time.getHours()}:${end_time.getMinutes()}:${end_time.getSeconds()}`
        const mode = node_data?.data?.node_info?.[1]?.info?.mode ?? "None";
        let last_data_time_str = ''

        let s = Math.round((new Date() - end_time.getTime()) / 1000);
        const h = Math.round(s / 3600);
        s %= 3600;
        const m = Math.round(s / 60);
        s %= 60

        if (h > 0)
            last_data_time_str = `${h}시간`
        else if (m > 0)
            last_data_time_str = `${m}분`
        else
        last_data_time_str = `${s}초`

        const select_sensor_action = {
            type: SELECT_NODE,
            data: {
                selected_node: node_id
            }
        }
        const tsdb_url = `http://io.energyiotlab.com:54242/#start=${start_date_str}&end=${end_date_str}&m=sum:${selected_factory}%7Bmac=${node_id},sensor=*%7D&o=&key=out%20center%20top%20horiz&wxh=1024x768&style=linespoint`
    return (
        <SelectSensorRow
            onClick={() => dispatch(select_sensor_action)}
            node_id={node_id}
            selected_node={selected_node}
        >
            <TableCell style={{position: "sticky", left: 0, background:"gray", textAlign:"center",  }}>
                <a href={tsdb_url} target='_blank'>{node_id}</a>
            </TableCell>
            <TableCell><b>{mode}</b></TableCell>
            <TableCell>
                {last_data_time_str}
            </TableCell>
            {useable_sensor_list.map((item) => {
                let value = sensor_data[item]?.value ?? '';
                if (value !== '' && !Number.isInteger(value))
                    value = value.toFixed(5);
                return <TableCell key={row_index + "_" + item}>{value}</TableCell>
            })}
        </SelectSensorRow>
    );
};

export default SensorListRowComponent;
