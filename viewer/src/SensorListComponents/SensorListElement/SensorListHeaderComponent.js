import React from "react";
import styled from "styled-components";
import { config } from "../../config";

const TableHeaderCell = styled.th`
    width:110px;
    color:white;
    background:${config.layout.theme_color};
`
const TR = styled.tr`
    position:sticky;
    top: 0;
`
const SensorListHeaderComponent = ({
    selected_factory_useable_sensor_type_list // 현재 선택된 공장에서 사용 가능한 센서 종류 (pm25, pm10 등)
}) => {
    return (
        <TR>
            <TableHeaderCell 
                key="is_router" 
                className="cell"
            >
                mode
            </TableHeaderCell>
            <TableHeaderCell 
                key="name" 
                className="cell"
            >
                sensor_name
            </TableHeaderCell>
            { 
                selected_factory_useable_sensor_type_list.map((item) => {
                    return (
                        <TableHeaderCell 
                            key={item} 
                        >
                            {item}
                        </TableHeaderCell>
                    );
                })
            }
        </TR>
    );
};

export default SensorListHeaderComponent;
