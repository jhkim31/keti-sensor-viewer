import React from "react";
import styled from "styled-components";
import { config } from "../config";

const SidebarItemLi = styled.li`
    ${(props) => {
        return "background:" + (props.selected_factory === props.factory_name ? "#002a45" : "#005082;") + ";";
    }}
    color:white;
    /* ${(props) => {
        return "color:" + (props.selected_factory === props.factory_name ? "white" : "white") + ";";
    }} */
    :hover{
        background:${config.layout.sidebar.hover_bg_color};
    }
    cursor:pointer;
    height:${config.layout.sidebar.height};
    font-size:${config.layout.sidebar.font_size};
    font-weight:${config.layout.sidebar.font_weight};
`

const SidebarItem = ({
    properties,
    selected_factory,    
    factory_name,
    factory_select_event, 
}) => {
    return (
        <SidebarItemLi            
            selected_factory={selected_factory}
            factory_name={factory_name}
            onClick={e => {
                factory_select_event(e.target.innerHTML);
            }}
        >
            {factory_name}
        </SidebarItemLi>
    )
};

export default SidebarItem;
