import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Graph from "react-graph-vis";
import { config } from "../config";
import { TRUE_SIGNAL, SELECT_NODE } from "../reducer/store";

const MapComponent = () => {
    const dispatch = useDispatch();
    const selected_factory = useSelector(state => state.selected_factory)
    const selected_factory_sensor_data = useSelector(state => state.selected_factory_sensor_data)
    const selected_node = useSelector(state => state.selected_node)
    const sensor_id_list = Object.keys(selected_factory_sensor_data)
    const sensor_position = useSelector(state => state.sensor_position)
    const selected_gateway = useSelector(state => state.selected_gateway)
    const in_gateway_node = useSelector(state => state.in_gateway_node)
    const selected_factory_image_width = useSelector(state => state.selected_factory_image_width);
    const selected_factory_image_height = useSelector(state => state.selected_factory_image_height);
    const timestamp = useSelector(state => state.timestamp);
    const network_graph = useRef(null);
    const node_fixed = useSelector(state => state.node_fixed);
    const show_edges = useSelector(state => state.show_edges);
    const signal = useSelector(state => state.signal)
    
    const base_url = config.base_url;

    let resize_rate = 1000 / Math.max(selected_factory_image_width, selected_factory_image_height);                                       
    const image_width = selected_factory_image_width * resize_rate;
    const image_height = selected_factory_image_height * resize_rate;

    let image = new Image();    
    image.onload = () => {        
        dispatch({type: TRUE_SIGNAL})
    }

    image.src = `${base_url}/get_image?factory=${selected_factory}&floor=0&timestamp=${timestamp}`;    
    let nodes = []
    let edges = []    

    const master_node = {
        id: "master",
        label: "Internet AP",
        color: "black",
        x : 0,
        y : 0,        
    }
    nodes.push(master_node)
    const graph = {
        nodes: nodes,
        edges: edges
    }
    const options = {
        interaction: {
            zoomSpeed: 0.2,
            hover: true
        },
        nodes: {
            physics: !node_fixed,
            font: {
                color: "#fff"
            }
        },
        edges: {
            arrows: {
                to: {
                  enabled: false,
                }
            },
            physics: !node_fixed,
            color: "#000000"
        },
        height: `${config.layout.topology_component_height}px`,
        physics: {
            enabled : !node_fixed,
            maxVelocity: 30,
            minVelocity: 0.01
        }
    };

    const events = {
        select: function (event) {            
            var { nodes, edges } = event;            
        },        
        click: function(event){
            if (event.nodes.length > 0){
                const node = event.nodes[0];
                dispatch({
                    type: SELECT_NODE,
                    data: {
                        selected_node: 'floe' + node.slice(0,2) + node.slice(-2)
                    }
                })
            }
            console.log(event)
        },
        beforeDrawing: function () {            
            let canvas = undefined;
            if (network_graph.current != null)
                canvas = network_graph.current.container.current.childNodes[0].childNodes[0];
            if (canvas != undefined) {                
                const ctx = canvas.getContext('2d')                   
                try{                                             
                    if(image.naturalWidth > 0)                                                                                            
                        ctx.drawImage(image, -((selected_factory_image_width * resize_rate) / 2), -((selected_factory_image_height * resize_rate) / 2),selected_factory_image_width * resize_rate, selected_factory_image_height * resize_rate)                                    
                } catch(e){                                        
                    console.log(e)
                }
            }
        },        
        dragEnd: function(event) {
            console.log("dragEng", event);
            console.log("dragEng", event.pointer.canvas)  
            if (event.nodes.length > 0){
                image.src = `${base_url}/get_image?factory=${selected_factory}&floor=0&timestamp=${timestamp}`
            }          
        }        
    };      

    
    sensor_id_list.forEach((item) => {
        let show_node = false;
        let mode = "";
        let mac_addr = ""
        let next_hop = ""
        try {
            next_hop = selected_factory_sensor_data[item].data.node_info[1].info.next_hop.toUpperCase().slice(-5)            
            mac_addr = selected_factory_sensor_data[item].data.node_info[0].id.toUpperCase()
            const id = mac_addr.slice(-5)
            mode = selected_factory_sensor_data[item].data.node_info[1].info.mode;

            let color = "gray"                        
            if (mode == "gateway"){
                color = "red"
            } else {         
                console.log(`selected: ${selected_node}, item : ${item}`)       
                if (selected_node == item){
                    color = "green"
                } else {
                    color = "blue"
                }
            }
                 
            let x = 0;
            let y = 0;
            if (node_fixed){
                x = -(image_width / 2) + sensor_position[item].x * image_width
                y = -(image_height / 2) + sensor_position[item].y * image_height
            }
            if (in_gateway_node.length > 0){                      
                if (in_gateway_node.includes(mac_addr)){
                    nodes.push({
                        id: id,
                        label: id,
                        color: color,
                        x : x,
                        y : y,
                        hover: {
                            background:"black"
                        }
                    })
                    if (show_edges){
                        if (id !== next_hop)
                        edges.push({
                            from: id,
                            to: next_hop
                        })
                    else
                        edges.push({
                            from: id,
                            to: "master"
                        })
                    }                                                        
                }
            } else {
                nodes.push({
                    id: id,
                    label: id,
                    color: color,
                    x : x,
                    y : y,
                    hover: {
                        background:"black"
                    }
                })
                if (show_edges){
                    if (id !== next_hop)
                    edges.push({
                        from: id,
                        to: next_hop
                    })
                else
                    edges.push({
                        from: id,
                        to: "master"
                    })
                } 
            }           
        } catch (e) {
            console.log(e)
        }

        try {
            if (sensor_position[item].x)
                if (selected_gateway == "")
                    show_node = true;
                else
                    if (in_gateway_node.includes(mac_addr))
                        show_node = true;
            
        } catch (e) {}
    })
    
    return (
        <>
            {
                (Object.keys(selected_factory_sensor_data).length > 0) && signal && <Graph
                    ref={network_graph}
                    graph={graph}
                    options={options}
                    events={events}
                />
            }
        </>
    ); 
};

export default MapComponent;