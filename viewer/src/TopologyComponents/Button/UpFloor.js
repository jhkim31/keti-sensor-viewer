import React from "react";
import sensor_data_api from "../../API/sensor_data";
import Btn from "../../Btn";
import { useDispatch, useSelector } from "react-redux";
import { UP_STAIR } from "../../reducer/store";

const UpFloor = () => {
    const dispatch = useDispatch();
    const floor = useSelector(state => state.topology.floor)
    const max_floor = useSelector(state => state.topology.max_floor)
    function click() {
        if (max_floor >= floor + 1){
            const action = {
                type: UP_STAIR,
            }
            dispatch(action)
        }
    }
    return <Btn onClick={click} value="한층 위로" />
};

export default UpFloor;
