import React from "react";
import styled from "styled-components";
import { config } from "../config";
import { useSelector, useDispatch } from "react-redux";
import { SET_SELECTED_FACTORY } from "../reducer/store";
import sensor_data_api from "../API/sensor_data";
import { useMediaQuery } from "react-responsive";

const SidebarItemLi = styled.li`
    ${(props) => {
        return "background:" + (props.selected_factory === props.factory_name ? "#002a45" : "#005082;") + ";";
    }}
    color:white;
    /* ${(props) => {
        return "color:" + (props.selected_factory === props.factory_name ? "white" : "white") + ";";
    }} */
    &:hover{
        background:${config.layout.sidebar.item.hover_bg_color};
    }
    cursor:pointer;
    height:${config.layout.sidebar.item.height};
    font-size:${config.layout.sidebar.item.font_size};
    font-weight:${config.layout.sidebar.item.font_weight};
`

const SidebarItem = ({         
    factory_name,    
    set_show_sidebar
}) => {
    const dispatch = useDispatch()
    const is_mobile = useMediaQuery({ maxDeviceWidth: 1199 })
    const selected_factory = useSelector((state) => {
        return state.selected_factory;
    })    
    return (
        <SidebarItemLi            
            selected_factory={selected_factory}
            factory_name={factory_name}
            onClick={() => {
                if (is_mobile)
                    set_show_sidebar("hidden");                           
                const url = `/get-factory-data?factory=${factory_name}`;        
                sensor_data_api.get(url)        
                .then(d => {                    
                    if (d.status == 200){                        
                        dispatch({
                            type: SET_SELECTED_FACTORY,
                            data: d.data
                        })                                                 
                    }                    
                })
                .catch(e => {
                    console.log(e)
                })                
            }}
        >
            {factory_name}
        </SidebarItemLi>
    )
};

export default SidebarItem;
