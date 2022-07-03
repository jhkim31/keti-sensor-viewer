import React from "react";
import styled from "styled-components";
import MapComponent from "../Node/MapComponent";
import { useSelector } from "react-redux";

const NodeSpace = styled.div`
    position: relative;    
    width: 100%;
    height: 100%;    
    overflow: hidden;
    grid-area: node_space;
`

const BGSpace = styled.div`
    position:absolute;
    width:100%;
    height:100%;
    left:0;
    top:0;
`

const ULComp = styled.ul`
    position:relative;
    height:100%;
    white-space: nowrap;        
    transform: translateX(${props => (props.map_index * 100 + "%")});
`
const LiComp = styled.li`
    display:inline-block;
    text-align: center;
    width:100%;
    height:100%;
`
const ImgBox = styled.img`         
    display:inline-block;
    width:100%;
    height:100%;     
    object-fit:contain;
`
const NodeViewerComponent = () => {    
    const map_index = useSelector(state => state.map_index);
    const map_list = useSelector(state => state.map_list);
    const selected_factory = useSelector(state => state.selected_factory);
    const update_time = useSelector(state => state.update_time);            //rerender
    return (
        <NodeSpace>
            <BGSpace>
                <ULComp map_index={map_index}>                
                    {map_list.map((map, idx) => {                                                
                        const img_url = `http://localhost:5000/get_image?factory=${selected_factory}&floor=0&timestamp=${new Date().getTime()}`
                        return (
                            <LiComp key={idx + map}>                            
                                <ImgBox src={img_url}/>                                           
                            </LiComp>                            
                        )
                    })}
                </ULComp>
            </BGSpace>
            <MapComponent/>
        </NodeSpace>
    );
};

export default NodeViewerComponent;
