import React from "react";
import sensor_data_api from "../../API/sensor_data";
import Btn from "../../Btn";
import { useDispatch, useSelector } from "react-redux";
import { DELETE_FLOOR } from "../../reducer/store";

const DeleteFloor = () => {
    const dispatch = useDispatch();
    const selected_factory = useSelector(state => state.selected_factory);
    function click(){
        const url = `/delete-floor?factory=${selected_factory}`
        sensor_data_api.post(url)
        .then(d => {
            console.log(d.data)
            dispatch({
                type: DELETE_FLOOR,
                data: {
                    floor: d.data.max_floor,
                    max_floor: d.data.max_floor,
                    floor_size: d.data.floor
                }
            })
        })
    }
    return <Btn onClick={click} value="맨 위층 삭제"/>
};

export default DeleteFloor;
