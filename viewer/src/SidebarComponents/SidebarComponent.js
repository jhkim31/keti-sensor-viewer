import React from "react";
import SidebarItem from "./SidebarItem";
import { useSelector } from "react-redux";


const SidebarComponent = ( {set_show_sidebar} ) => {
    const factories = useSelector((state) => state.factories)
    return (
        <ul>
            {
                factories.map((factory_name) => {
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
