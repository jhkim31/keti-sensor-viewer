import React, { useRef, useEffect } from "react";
import SensorNodeComponent from "./SensorNodeComponent";
import { useSelector } from "react-redux";
import Graph from "react-graph-vis";
import { config } from "../../../config";

const MapComponent = () => {
    const selected_factory = useSelector(state => state.selected_factory)
    const selected_factory_sensor_data = useSelector(state => selected_factory ? state.all_sensor_data[selected_factory] : {})
    const sensor_id_list = useSelector(state => {
        const sensor_data = state.all_sensor_data;
        let selected_factory_sensor_data = {};
        if (Object.keys(sensor_data).length != 0 && selected_factory)
            selected_factory_sensor_data = sensor_data[selected_factory]
        return Object.keys(selected_factory_sensor_data).length > 0 ? Object.keys(selected_factory_sensor_data) : [];
    })
    const sensor_position = useSelector(state => state.sensor_position)
    const selected_gateway = useSelector(state => state.selected_gateway)
    const in_gateway_node = useSelector(state => state.in_gateway_node)
    const network_graph = useRef(null);

    const base_url = config.base_url;
    let image = new Image();                
    image.src = `${base_url}/get_image?factory=${selected_factory}&floor=0`;

    let nodes = []
    let edges = []

    sensor_id_list.forEach((item) => {
        let show_node = false;
        let mode = "";
        let mac_addr = ""
        let next_hop = ""
        try {
            next_hop = selected_factory_sensor_data[item].data.node_info[1].info.next_hop.toUpperCase().slice(-5)
            mac_addr = selected_factory_sensor_data[item].data.node_info[0].id.toUpperCase().slice(-5)
            mode = selected_factory_sensor_data[item].data.node_info[1].info.mode;
            const color = mode === "gateway" ? "red" : "blue";
            nodes.push({
                id: mac_addr,
                label: mac_addr,
                color: color
            })
            edges.push({
                from: mac_addr,
                to: next_hop
            })
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
            
        } catch (e) {            
        }
    })

    const graph = {
        nodes: nodes.slice(5),
        edges: edges
    };

    const options = {
        interaction: {
            zoomSpeed: 0.1
        },
        nodes: {
            physics: false,
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
            physics: false,
            color: "#000000"
        },
        height: `${config.layout.topology_component_height}px`,
        physics: false,
    };

    const events = {
        select: function (event) {
            var { nodes, edges } = event;
        },
        beforeDrawing: function (e) {            
            let canvas = undefined;
            if (network_graph.current != null)
                canvas = network_graph.current.container.current.childNodes[0].childNodes[0];
            if (canvas != undefined) {
                const ctx = canvas.getContext('2d')                
                ctx.drawImage(image, -1000, -1000, 2000, 2000)                
            }
        },        
    };        
    
    return (
        <>
            {
                (Object.keys(selected_factory_sensor_data).length > 0) && <Graph
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