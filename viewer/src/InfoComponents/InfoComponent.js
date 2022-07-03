import React from "react";
import styled from "styled-components";
import { config } from "../config";

const Info = styled.div`
    grid-area: info_component;
    background:${config.layout.theme_color};
    color: ${config.layout.info_component.color};    
`
const InfoComponent = ({
    main_state
}) => {
    return (
        <Info>
            <h1>selected factory : {main_state.selected_factory}</h1>
            <h2>current floor : {main_state.current_floor}</h2>
            <h2>select sensor : {main_state.selected_sensor}</h2>
            <h3>update time : {main_state.update_time}</h3>
        </Info>
    );
};

export default InfoComponent;
