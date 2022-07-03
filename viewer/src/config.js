export const config = {
    "base_url" : {
        "develop" : "http://localhost:5000/",
        "deployment" : "http://192.168.101.118:5000/"
    },
    "layout" : {
        "row" : ["150px",  "400px", "1fr"],
        "col" : ["200px", "1fr"],
        "topology_component_height" : 360,
        "border" : "1px solid black",
        "theme_color" : "#005082",
        "sidebar" : {
            "hover_bg_color" : "#0270b5" ,
            "font_size" : "20px",
            "font_weight" : "bold",
            "height" : "30px"
        },
        "info_component" : {
            "color" : "white"
        },
        "button" : {
            "bg_color" : "#519d9e",
            "color" : "white",
            "hover_bg_color" : "white",
            "hover_color" : "#519d9e",
            "cursor" : "pointer"
        },
        "sensor_node" : {
            "cursor": "pointer",
            "color": "black",
            "sensor_color_change_time" : [5, 10, 60, 160, 1440],
            "node_color" : ["blue", "green", "yellow", "orange", "gray", "black"],
            "border" : "1px solid black",
            "gateway_node_border" : "3px solid red",
            "selected_node_color" : "red",
            "border_radius": "20px"
        },
        "topology_component" : {
            "height" : 360
        },
        "popup" : {
            "bg_color" : "yellow",
            "bg_alpha" : 0.4,
        },
        "sensor_list" : {
            "bg" : "white",
            "selected_bg" : "red"
        }
    },
    "init_state" : {
        "selected_factory" : "",
        "selected_sensor" : "",
        "min_floor" : 0,
        "max_floor" : 0,
        "current_floor" : 0,
        "map_index" : 0,
        "update_time" : 0,
        "selected_gateway" : ""
    },
    "init_data" : {
        "all_sensor_data" : {},
        "keti_factory_list" : [],
        "keti_useable_sensor_by_factory" : [],
        "selected_factory_useable_sensor_type_list" : [],
        "selected_factory_sensor_data" : {},
        "sensor_position" : {},
        "map_list" : [],
        "gateway_data" : {},
        "in_gateway_node" : []
    }
}