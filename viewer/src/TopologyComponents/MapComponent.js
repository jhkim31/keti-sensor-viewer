import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Graph from "react-graph-vis";
import { config } from "../config";
import { TRUE_SIGNAL, SELECT_NODE, MOVE_NODE } from "../reducer/store";
import sensor_data_api from "../API/sensor_data";

const MapComponent = () => {
    const dispatch = useDispatch();
    const selected_factory = useSelector(state => state.selected_factory)
    const selected_node = useSelector(state => state.selected_node)

    const selected_factory_data = useSelector(state => state.selected_factory_data)
    const node_id_list = Object.keys(selected_factory_data)
    const selected_gateway_node_list = useSelector(state => state.selected_gateway_node_list)
    const selected_factory_node_position = useSelector(state => state.selected_factory_node_position)
    const last_timestamp = useSelector(state => state.last_timestamp);
    const network_graph = useRef(null);
    const base_url = config.base_url;

    const fix_node = useSelector(state => state.topology.fix_node)
    const hide_edges = useSelector(state => state.topology.hide_edges)
    const signal = useSelector(state => state.topology.signal)
    const floor = useSelector(state => state.topology.floor);
    const floor_size = useSelector(state => state.topology.floor_size)
    const selected_factory_image_width = floor_size[floor - 1]?.width ?? 0
    const selected_factory_image_height = floor_size[floor - 1]?.height ?? 0


    let resize_rate = 1000 / Math.max(selected_factory_image_width, selected_factory_image_height);
    const image_width = selected_factory_image_width * resize_rate;
    const image_height = selected_factory_image_height * resize_rate;

    let image = new Image();
    image.onload = () => {
        dispatch({type: TRUE_SIGNAL})
    }
    image.src = `${base_url}/get_image?factory=${selected_factory}&floor=${floor}&last_timestamp=${last_timestamp}`;

    let nodes = []
    let edges = []
    const graph = {
        nodes: nodes,
        edges: edges
    }

    nodes.push({
        id : "floor",
        label : `${floor}층`,
        color: "black",
        size: 40,
        x : -(image_width / 2),
        y : -(image_height / 2),
        fixed: true
    })
    nodes.push({
        id: "master",
        label: `Internet AP`,
        color: "purple",
        x : 0,
        y : 0,
    })

    const options = {
        autoResize: true,

        interaction: {
            zoomSpeed: 0.2,
            hover: true
        },
        nodes: {
            physics: !fix_node,
            font: {
                color: "#fff"
            }
        },
        edges: {
            hidden: hide_edges,
            arrows: {
                to: true,
                from: false
            },
            physics: !fix_node,
            color: "#000000"
        },
        height: `${config.layout.topology_component_height}px`,
        physics: {
            enabled : !fix_node,
            maxVelocity: 20,
            minVelocity: 0.01
        }
    }

    node_id_list.forEach((node) => {
        const node_data = selected_factory_data[node]
        let show_node = false;
        let mode = "";
        let mac_addr = ""
        let next_hop = ""
        let node_floor = 0
        try {
            next_hop = node_data.data.node_info[1].info.next_hop.toUpperCase().slice(-5);
            mac_addr = node_data.data.node_info[0].id.toUpperCase()
            mode = node_data.data.node_info[1].info.mode;
            node_floor = selected_factory_node_position[node].floor
            const time_diff_m = (new Date().getTime() / 1000 - node_data.service.timestamp) / 60

            const id = mac_addr.slice(-5)

            let color = "gray"

            if (mode == "gateway"){
                if (time_diff_m < config.layout.sensor_node.sensor_color_change_time[0])
                    color = "red"
                else if(time_diff_m < config.layout.sensor_node.sensor_color_change_time[1])
                    color = "orange"
                else if(time_diff_m < config.layout.sensor_node.sensor_color_change_time[2])
                    color = "yellow"
                else
                    color = "#632626"
            } else {
                if (time_diff_m < config.layout.sensor_node.sensor_color_change_time[0])
                    color = config.layout.sensor_node.node_color[0]
                else if(time_diff_m < config.layout.sensor_node.sensor_color_change_time[1])
                    color = config.layout.sensor_node.node_color[1]
                else if(time_diff_m < config.layout.sensor_node.sensor_color_change_time[2])
                    color = config.layout.sensor_node.node_color[2]
                else
                    color = config.layout.sensor_node.node_color[3]
            }

            if (selected_node === node)
                color = "black"

            let x = 0;
            let y = 0;
            if (fix_node){
                x = -(image_width / 2) + selected_factory_node_position[node].x * image_width
                y = -(image_height / 2) + selected_factory_node_position[node].y * image_height
            }
            if (node_floor === floor){
                if (selected_gateway_node_list.length > 0){
                    if (selected_gateway_node_list.includes(mac_addr))
                        show_node = true
                } else {
                    show_node = true
                }
            }
            if (show_node){
                nodes.push({
                    id: id,
                    label: id,
                    color: color,
                    x : x,
                    y : y,
                })
                edges.push({
                    from: id,
                    to: (id === next_hop && mode == "gateway") ? "master" : next_hop
                })
            }
        } catch (e) {
        }
    })

    const events = {
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
        },
        beforeDrawing: function () {
            let canvas = undefined;
            if (network_graph.current != null)
                canvas = network_graph.current.container.current.childNodes[0].childNodes[0];
            if (canvas != undefined) {
                const ctx = canvas.getContext('2d')
                try{
                    ctx.lineWidth = 5;
                    ctx.strokeStyle = "red";
                    if (image.naturalWidth > 0)
                        ctx.drawImage(image, -((selected_factory_image_width * resize_rate) / 2), -((selected_factory_image_height * resize_rate) / 2),selected_factory_image_width * resize_rate, selected_factory_image_height * resize_rate)
                    ctx.strokeRect(-((selected_factory_image_width * resize_rate) / 2), -((selected_factory_image_height * resize_rate) / 2),selected_factory_image_width * resize_rate, selected_factory_image_height * resize_rate)
                } catch(e){
                    console.log(e)
                }
            }
        },
        dragEnd: function(event) {
            if (event.nodes.length > 0 && fix_node){
                const node = event.nodes[0];
                const url = '/sensor-position';
                const post_data = {
                    factory: selected_factory,
                    sensor_id: 'floe' + node.slice(0,2) + node.slice(-2),
                    x: 1 - ((image_width / 2) - event.pointer.canvas.x) / image_width,
                    y: 1 - ((image_height / 2) - event.pointer.canvas.y) / image_height,
                    floor: floor
                }

                sensor_data_api.post(url, post_data)
                .then(d => {
                    dispatch({
                        type: MOVE_NODE,
                        data: d.data
                    })
                })
            }
        }
    };

    return (
        <>
            {
                (Object.keys(selected_factory_data).length > 0) && (signal) &&
                <Graph
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