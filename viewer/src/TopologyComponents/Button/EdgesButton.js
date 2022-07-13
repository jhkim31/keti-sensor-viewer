import React from "react";
import Btn from "../../Btn";
import { useDispatch, useSelector } from "react-redux";
import { SHOW_EDGES_TOGGLE } from "../../reducer/store";


const EdgesButton = () => {    
    const dispatch = useDispatch();
    const show_edges = useSelector(state => state.topology.show_edges);
    function click () {
        dispatch({
            type: SHOW_EDGES_TOGGLE            
        })
    }
    return (
        <Btn
            bg_color={show_edges ? "red" : undefined}
            onClick={click}
            value="Show Edges"
        />        
    )
};

export default EdgesButton;
