import React from "react";
import styled from "styled-components";
import { config } from "../../config";
import { useSelector } from "react-redux";
import { STATE } from "../../redux/interface";

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
    const selected_factory_useable_sensor_list = useSelector((state:STATE) => state.selected_factory_useable_sensor_list)
    const selected_factory = useSelector((state:STATE) => state.selected_factory);
    return (
        <TR>
            {   
                selected_factory && <>
                <TableHeaderCell key="is_router" className="cell">mode</TableHeaderCell>            
                <TableHeaderCell key="name" className="cell">sensor_name</TableHeaderCell>            
                <TableHeaderCell key="last_data" className="cell">last_data</TableHeaderCell>
                </>
            }
            { 
                selected_factory_useable_sensor_list.map((item) => {
                    return <TableHeaderCell key={item}>{item}</TableHeaderCell>
                })
            }
        </TR>
    );
};

export default SensorListHeaderComponent;
