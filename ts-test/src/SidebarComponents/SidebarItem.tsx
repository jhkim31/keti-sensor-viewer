import styled from "styled-components";
import { config } from "../config";
import { useSelector, useDispatch } from "react-redux";
import { SELECT_FACTORY, select_factory } from "../redux/store";
import sensor_data_api from "../API/sensor_data";
import { STATE } from "../redux/interface";

const SidebarItemLi = styled.li<{
    selected_factory: string,
    factory_name: string
}>`
    ${(props) => {
        return "background:" + (props.selected_factory === props.factory_name ? "#002a45" : "#005082;") + ";";
    }}
    color:white;
    /* ${(props) => {
        return "color:" + (props.selected_factory === props.factory_name ? "white" : "white") + ";";
    }} */
    &:hover{
        background:${config.layout.sidebar.item.hover_bg_color};
    }
    cursor:pointer;
    height:${config.layout.sidebar.item.height};
    font-size:${config.layout.sidebar.item.font_size};
    font-weight:${config.layout.sidebar.item.font_weight};
`

const SidebarItem = (props : {         
    factory_name: string,    
}) => {
    const factory_name: string = props.factory_name;
    const dispatch = useDispatch();    
    const selected_factory = useSelector((state: STATE) => state.selected_factory)
    return (
        <SidebarItemLi            
            selected_factory={selected_factory}
            factory_name={factory_name}
            onClick={() => {                
                const url = `/get-factory-data?factory=${factory_name}`;        
                sensor_data_api.get(url)        
                .then(d => {                    
                    if (d.status == 200){      
                        console.log(d.data)                  
                        dispatch(select_factory(d.data))                                                 
                    }                    
                })
                .catch(e => {
                    console.log(e)
                })                
            }}
        >
            {factory_name}
        </SidebarItemLi>
    )
};

export default SidebarItem;
