import React from "react";
import styled from "styled-components";
import { config } from "../config";
import { useSelector } from "react-redux";

const Info = styled.div`
    grid-area: info_component;
    background:${config.layout.theme_color};
    color: ${config.layout.info_component.color};    
`
const InfoComponent = () => {
    const selected_factory = useSelector((state) => {
        return state.selected_factory;
    })
    const current_floor = useSelector((state) => {
        return state.current_floor;
    })
    const selected_sensor = useSelector((state) => {
        return state.selected_sensor;
    })
    const update_time = useSelector((state) => {
        return state.update_time;
    })
    return (
        <Info>
            <h1>selected factory : {selected_factory}</h1>            
            <h2>select sensor : {selected_sensor}</h2>            
        </Info>
    );
};

export default InfoComponent;
