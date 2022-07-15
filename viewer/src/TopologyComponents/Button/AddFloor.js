import React from "react";
import sensor_data_api from "../../API/sensor_data";
import Btn from "../../Btn";
import { useDispatch, useSelector } from "react-redux";
import { ADD_FLOOR } from "../../reducer/store";

const AddFloor = () => {
    const dispatch = useDispatch();
    const selected_factory = useSelector(state => state.selected_factory);
    function click(){
        const url = `/add-floor?factory=${selected_factory}`
        sensor_data_api.post(url)
        .then(d => {
            console.log(d.data)
            dispatch({
                type: ADD_FLOOR,
                data: {
                    floor: d.data.max_floor,
                    max_floor: d.data.max_floor,
                    floor_size: d.data.floor
                }
            })
        })
    }
    return <Btn onClick={click} value="층 추가" />
};

export default AddFloor;
