import React from "react";
import SensorListHeaderComponent from "./SensorListElement/SensorListHeaderComponent";
import SensorListRowComponent from "./SensorListElement/SensorListRowComponent";
import styled from "styled-components";
import Btn from "../Btn";
import { config } from "../config";
import { useSelector, useDispatch } from "react-redux";
import { SELECT_GATEWAY, RESET_SELECT_GATEWAY } from "../reducer/store";


const TableContainer = styled.div`
    ${(props) => "width:" + props.size + 'px;'}
    border-spacing: 0;
`

const SensorListTable = styled.table`
    width:100%;
`
const GatewayWrapper = styled.div`
    ${(props) => "width:" + props.size + 'px;'}
    background:${config.layout.theme_color};
    white-space: nowrap;
    overflow: scroll;
`

const SensorListComponent = () => {
    const dispatch = useDispatch();
    const last_update_time = useSelector(state => state.last_update_time);
    const num_useable_sensors = useSelector(state => state.selected_factory_useable_sensor_list.length)
    const selected_factory_data = useSelector(state => state.selected_factory_data)
    const selected_factory_gateway_list = useSelector(state => state.selected_factory_gateway_list)
    const selected_gateway = useSelector(state => state.selected_gateway)
    const selected_gateway_node_list = useSelector(state => state.selected_gateway_node_list)

    const nodes = Object.keys(selected_factory_data)

    function gateway_click_func(gateway){
        if ((/^[A-F0-9]{2}(:[A-F0-9]{2}){5}$/).test(gateway))
            dispatch({
                type: SELECT_GATEWAY,
                data: {
                    gateway: gateway
                }
            })
    }

    return (
        <div>
            <GatewayWrapper size={(num_useable_sensors) * 120}>
                {
                    //선택된 게이트웨이가 있다면 RESET 버튼 추가
                    selected_gateway && <Btn value="RESET" onClick={() => dispatch({ type: RESET_SELECT_GATEWAY })} />
                }
                {selected_factory_gateway_list.map((gateway) => {
                    let button_color = config.layout.button.bg_color;
                    if (selected_gateway === gateway)
                        button_color = "red"
                    return (
                        <Btn key={gateway} bg_color={button_color}
                            onClick={() => gateway_click_func(gateway)}
                            value={(/^[A-F0-9]{2}(:[A-F0-9]{2}){5}$/).test(gateway) ? gateway : "error"}
                        />
                    )
                })}
            </GatewayWrapper>

            <TableContainer size={(num_useable_sensors) * 120}>
                <SensorListTable>
                    <thead>
                        <SensorListHeaderComponent />
                    </thead>
                    <tbody>
                        {nodes.map((node, index) => {
                            let mac_addr = selected_factory_data[node]?.data?.node_info?.[0]?.id ?? '';
                            let show_node = false;
                            if (selected_gateway === "")
                                show_node = true
                            else
                                if (selected_gateway_node_list.includes(mac_addr))
                                    show_node = true

                            return (show_node &&
                            <SensorListRowComponent
                                key={"sensor_row_data_" + index}
                                node_id={node}
                                row_index={index}
                            />)
                        })}
                    </tbody>
                </SensorListTable>
            </TableContainer>
        </div>
    );
};

export default SensorListComponent;
