import React from "react";
import Btn from "../../Btn";
import { useDispatch } from "react-redux";
import { DECREASEMAP } from "../../reducer/store";

const DecreaseMap = () => {
    const dispatch = useDispatch();

    return <Btn onClick={() => dispatch({type: DECREASEMAP})} value="- 도면 줄이기"/>
};

export default DecreaseMap;
