import React from "react";
import Btn from "../../Btn";
import { useDispatch, useSelector } from "react-redux";
import { HIDE_EDGES_TOGGLE } from "../../reducer/store";


const EdgesButton = () => {
    const dispatch = useDispatch();
    const hide_edges = useSelector(state => state.topology.hide_edges);
    function click () {
        dispatch({
            type: HIDE_EDGES_TOGGLE
        })
    }
    return (
        <Btn
            bg_color={hide_edges ? "red" : undefined}
            onClick={click}
            value="간선 숨김"
        />
    )
};

export default EdgesButton;