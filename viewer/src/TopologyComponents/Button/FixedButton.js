import React from "react";
import sensor_data_api from "../../API/sensor_data";
import Btn from "../../Btn";
import { useDispatch, useSelector } from "react-redux";
import { NODE_FIX_TOGGLE } from "../../reducer/store";


const FixedButton = () => {
    const dispatch = useDispatch();
    const node_fixed = useSelector(state => state.topology.fix_node);
    function click () {
        dispatch({
            type: NODE_FIX_TOGGLE
        })
    }
    return <Btn bg_color={node_fixed ? "red" : undefined} onClick={click} value="노드 고정" />
};

export default FixedButton;
