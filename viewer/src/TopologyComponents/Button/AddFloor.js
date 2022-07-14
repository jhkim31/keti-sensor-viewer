import React from "react";
import sensor_data_api from "../../API/sensor_data";
import Btn from "../../Btn";
import { useDispatch } from "react-redux";
import { ADD_FLOOR } from "../../reducer/store";

const AddFloor = () => {
    const dispatch = useDispatch();

    function click(){
        const url = '/all-sensor-data'
        sensor_data_api.get(url)
        .then(d => {

        })
    }
    return (
        <Btn
            onClick={click}
            value="ADDFloor"
        />
    )
};

export default AddFloor;
