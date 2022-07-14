import React from "react";
import styled from "styled-components";
import FixedButton from "./Button/FixedButton";
import FloorEditPopupComponent from "./Button/FloorEditPopupComponent";
import NodeAddPopup from "./Button/NodeAddPopup";
import NodeDeletePopup from "./Button/NodeDeletePopup";
import RefreshBtn from "./Button/RefreshBtn";
import EdgesButton from './Button/EdgesButton'
import UpFloor from "./Button/UpFloor";
import DownFloor from "./Button/DownFloor";
import { useSelector } from "react-redux";
import AddFloor from "./Button/AddFloor";


const BtnSpace = styled.div`
    "width:${window.width- 200}";
    white-space: nowrap;
    overflow: scroll;
    height: 40px;
`

const MapControlButtonComponent = () => {
    const selected_factory = useSelector(state => state.selected_factory)
    return (
        <>
            {
            selected_factory && <BtnSpace>
                <FloorEditPopupComponent/>
                <NodeAddPopup />
                <NodeDeletePopup/>
                <AddFloor/>
                <UpFloor/>
                <DownFloor/>
                <RefreshBtn/>
                <FixedButton/>
                <EdgesButton/>
            </BtnSpace>
            }
        </>
    );
};

export default MapControlButtonComponent;
