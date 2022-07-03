import React from "react";
import SidebarItem from "./SidebarItem";

const SidebarComponent = ({
    properties,    
    factory_select_event, // 공장 선택 이벤트 (App으로 전달)    
}) => {    
    const factory_list = properties.main_data.keti_factory_list;    
    const selected_factory = properties.main_state.selected_factory;
    
    return (
        <ul>
            {                               
                factory_list.map((factory_name) => {
                    return (
                        <SidebarItem
                            properties={properties}
                            key={factory_name}
                            selected_factory={selected_factory}
                            factory_name={factory_name}
                            factory_select_event={factory_select_event}                            
                        /> 
                    )
                })
            }
        </ul>
    );
};

export default SidebarComponent;
