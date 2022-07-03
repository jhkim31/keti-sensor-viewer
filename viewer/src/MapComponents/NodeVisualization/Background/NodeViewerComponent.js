import React from "react";
import styled from "styled-components";
import MapComponent from "../Node/MapComponent";

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
    width:auto;
    height:100%;     
    object-fit:contain;
`
const NodeViewerComponent = ({
    properties
}) => {    
    return (
        <NodeSpace>
            <BGSpace>
                <ULComp
                    map_index={properties.main_state.map_index}
                >   
                    {properties.main_data.map_list.map((map, idx) => {                                                
                        return (
                            <LiComp
                                key={idx + map}
                            >
                                <ImgBox 
                                    src={map+`?time=${new Date().getTime()}`}
                                    id={properties.main_state.selected_factory + "_map_" + idx}
                                >
                                    
                                </ImgBox>
                            </LiComp>
                        )
                    })}
                </ULComp>
            </BGSpace>
            <MapComponent
                properties={properties}             
            />
        </NodeSpace>
    );
};

export default NodeViewerComponent;
