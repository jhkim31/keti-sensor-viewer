import React from "react";
import SidebarItem from "./SidebarItem";
import { useSelector } from "react-redux";


const SidebarComponent = ( {set_show_sidebar} ) => {   
    const factory_list = useSelector((state) => state.factory_list)
    return (
        <ul>
            {                               
                factory_list.map((factory_name) => {
                    return (
                        <SidebarItem                            
                            key={factory_name}                            
                            factory_name={factory_name}
                            set_show_sidebar={set_show_sidebar}                                                                                 
                        /> 
                    )
                })
            }
        </ul>
    );
};

export default SidebarComponent;
