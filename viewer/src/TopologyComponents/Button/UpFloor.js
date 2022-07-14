import React from "react";
import sensor_data_api from "../../API/sensor_data";
import Btn from "../../Btn";
import { useDispatch } from "react-redux";
import { UP_STAIR } from "../../reducer/store";

const UpFloor = () => {
    const dispatch = useDispatch();

    return (
        <Btn
            onClick={() => dispatch({type: UP_STAIR})}
            value="UP Floor"
        />
    )
};

export default UpFloor;
