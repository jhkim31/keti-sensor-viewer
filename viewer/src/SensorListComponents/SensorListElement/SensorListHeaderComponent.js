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
`
const SensorListHeaderComponent = () => {
    const selected_factory_useable_sensor_type_list = useSelector(state => state.selected_factory ? state.useable_sensor_by_factory[state.selected_factory] : [])        
    return (
        <TR>
            <TableHeaderCell key="is_router" className="cell">mode</TableHeaderCell>            
            <TableHeaderCell key="name" className="cell">sensor_name</TableHeaderCell>            
            { 
                selected_factory_useable_sensor_type_list.map((item) => {
                    return <TableHeaderCell key={item}>{item}</TableHeaderCell>
                })
            }
        </TR>
    );
};

export default SensorListHeaderComponent;
