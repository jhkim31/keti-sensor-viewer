import React from "react";
import styled from "styled-components";
import { config } from "./config";
const Btn_Style = styled.div`
    position: relative;
    border: none;
    display: inline-block;
    padding: 8px 15px;
    border-radius: 15px;
    font-family: "paybooc-Light", sans-serif;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
    text-decoration: none;
    font-weight: 600;
    transition: 0.25s;
    background-color: ${props => (props.bg_color == undefined ? config.layout.button.bg_color : props.bg_color)};
    color: ${props => (props.color == undefined ? config.layout.button.color : props.color)};;
    margin-right:5px;
    margin-bottom:3px;
    :hover{
        background-color: ${config.layout.button.hover_bg_color};
        color: ${config.layout.button.hover_color};
    }
    cursor:${config.layout.button.cursor};
    user-select: none;
`

const Btn = ({
    value,
    onClick,
    bg_color,
    color
}) => {
    return (
        <Btn_Style
            bg_color={bg_color}
            color={color}
            onClick={onClick}
        >{value}</Btn_Style>
    );
};

export default Btn;
