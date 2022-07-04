import React from "react";
import styled from "styled-components";
import { config } from "../config";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";

const Info = styled.div`
    grid-area: info_component;
    background:${config.layout.theme_color};
    color: ${config.layout.info_component.color};    
`

const Hbutton = styled.div`
    float:right;
`

const InfoComponent = ({set_show_sidebar}) => {
    const is_mobile = useMediaQuery({ maxDeviceWidth: 1199 })
    const selected_factory = useSelector((state) => {
        return state.selected_factory;
    })    
    const selected_sensor = useSelector((state) => {
        return state.selected_sensor;
    })        
    
    return (
        <Info>      
            {
                !is_mobile && <div>
                    <h1>selected factory : {selected_factory}</h1>            
                    <h2>select sensor : {selected_sensor}</h2>                            
                </div>
            }     
            {
                is_mobile && <div>
                    <Hbutton
                    onClick={() => {
                        set_show_sidebar((visible) => {
                            console.log(visible);
                            if (visible == "hidden")
                                return "visible"
                            else
                                return "hidden"
                        })
                    }}>show factory</Hbutton>
                <h3>selected factory : {selected_factory}</h3>            
                <h4>select sensor : {selected_sensor}</h4>                            
            </div>
            }                 
            
        </Info>
    );
};

export default InfoComponent;
