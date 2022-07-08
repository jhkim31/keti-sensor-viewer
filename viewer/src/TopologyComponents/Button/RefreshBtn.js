import React from "react";
import sensor_data_api from "../../API/sensor_data";
import Btn from "../../Btn";
import { useDispatch } from "react-redux";
import { SET_INIT_STATE } from "../../reducer/store";

const RefreshBtn = () => {    
    const dispatch = useDispatch();

    function click(){
        const url = '/all-sensor-data'
        sensor_data_api.get(url)
        .then(d => {
            if (d.status == 200){                
                dispatch({
                    type: SET_INIT_STATE,
                    data: d.data                    
                })
            }
        })
        .catch(e => {
            console.log(e)
        })
    }                
    return (
        <Btn
            onClick={click}
            value="Refresh"
        />        
    )
};

export default RefreshBtn;
