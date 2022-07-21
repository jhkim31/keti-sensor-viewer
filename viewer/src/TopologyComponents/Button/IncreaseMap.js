import React from "react";
import Btn from "../../Btn";
import { useDispatch } from "react-redux";
import { INCREASEMAP } from "../../reducer/store";

const IncreaseMap = () => {
    const dispatch = useDispatch();

    return <Btn onClick={() => dispatch({type: INCREASEMAP})} value="+ 도면 키우기"/>
};

export default IncreaseMap;
