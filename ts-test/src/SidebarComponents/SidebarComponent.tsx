import React from "react";
import SidebarItem from "./SidebarItem";
import { useSelector } from "react-redux";
import { STATE } from "../redux/interface";


const SidebarComponent = () => {   
    const factory_list = useSelector((state: STATE) => state.factory_list);
    return (
        <ul>
            {                               
                factory_list.map((factory_name) => {
                    return (
                        <SidebarItem                            
                            key={factory_name}                            
                            factory_name={factory_name}                            
                        /> 
                    )
                })
            }
        </ul>
    );
};

export default SidebarComponent;
