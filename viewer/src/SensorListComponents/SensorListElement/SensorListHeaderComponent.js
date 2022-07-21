import React from "react";
import styled from "styled-components";
import { config } from "../../config";
import { useSelector } from "react-redux";

const TableHeaderCell = styled.th`
    width:110px;
    color:white;
    background:${config.layout.theme_color};
`
const TR = styled.tr`
    position:sticky;
    top: 0;
    z-index: 999;
`
const SensorListHeaderComponent = () => {
    const selected_factory_useable_sensor_list = useSelector(state => state.selected_factory_useable_sensor_list)
    const selected_factory = useSelector(state => state.selected_factory);
    return (
        <TR>
            {selected_factory && <>
                <TableHeaderCell key="name" className="cell">node</TableHeaderCell>
                <TableHeaderCell key="is_router" className="cell">mode</TableHeaderCell>
                <TableHeaderCell key="last_data" className="cell">last_data</TableHeaderCell>
            </>}

            {selected_factory_useable_sensor_list.map((item) => {
                return <TableHeaderCell key={item}>{item}</TableHeaderCell>
            })}
        </TR>
    );
};

export default SensorListHeaderComponent;
