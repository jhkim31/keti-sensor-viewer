import React from "react";
import { STATE } from "../redux/interface";
import styled from "styled-components";
import { config } from "../config";
import { useSelector } from "react-redux";
// import { useMediaQuery } from "react-responsive";

const Info = styled.div`    
    grid-area: info_component;
    background:${config.layout.theme_color};
    color: ${config.layout.info_component.color};    
`

const Hbutton = styled.button`
    margin-right: 10px;
    margin-top: 5px;
    float:right;
`

const InfoComponent = () => {    
    const selected_factory = useSelector((state: STATE) => {
        return state.selected_factory;
    })    
    const selected_sensor = useSelector((state: STATE) => {
        return state.selected_node;
    })        
    
    return (
        <Info>                  
            <div>
                <h1>selected factory : {selected_factory}</h1>            
                <h2>selected node : {selected_sensor}</h2>                            
            </div>                        
        </Info>
    );
};

export default InfoComponent;
