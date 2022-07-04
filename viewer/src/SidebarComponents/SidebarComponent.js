import React from "react";
import SidebarItem from "./SidebarItem";
import { useSelector } from "react-redux";


const SidebarComponent = () => {   
    const factory_list = useSelector((state) => {
        return state.factory_list
    })     
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
