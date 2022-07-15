import React from "react";
import sensor_data_api from "../../API/sensor_data";
import Btn from "../../Btn";
import { useDispatch, useSelector } from "react-redux";
import { DOWN_STAIR } from "../../reducer/store";

const DownFloor = () => {
    const dispatch = useDispatch();

    const floor = useSelector(state => state.topology.floor)
    function click() {
        if (floor - 1 >= 1){
            const action = {
                type: DOWN_STAIR,
            }
            dispatch(action)
        }
    }
    return (
        <Btn
            onClick={() => click()}
            value="한층 아래로"
        />
    )
};

export default DownFloor;
