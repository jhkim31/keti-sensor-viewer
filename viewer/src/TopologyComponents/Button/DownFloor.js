import React from "react";
import sensor_data_api from "../../API/sensor_data";
import Btn from "../../Btn";
import { useDispatch } from "react-redux";
import { DOWN_STAIR } from "../../reducer/store";

const DownFloor = () => {
    const dispatch = useDispatch();

    return (
        <Btn
            onClick={() => dispatch({type: DOWN_STAIR})}
            value="DOWN Floor"
        />
    )
};

export default DownFloor;
