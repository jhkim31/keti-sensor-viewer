export const config = {
    // "base_url" : "http://172.20.10.14:5000/"    ,
    "base_url" : "http://192.168.101.237:5000",
    // "base_url" : "http://localhost:5000", 
    "layout" : {
        "row" : "80px 400px 1fr",
        "col" : "200px 1fr",
        "topology_component_height" : 360,
        "border" : "1px solid black",
        "theme_color" : "#005082",
        "sidebar" : {
            "item" : {
                "hover_bg_color" : "#0270b5" ,
                "font_size" : "20px",
                "font_weight" : "bold",
                "height" : "30px"
            }
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
            "bg_color" : "green",
            "bg_alpha" : 0.4,
        },
        "sensor_list" : {
            "bg" : "white",
            "selected_bg" : "red"
        }
    },    
    "mobile_layout" : {
        "row" : "50px 300px 1fr",
        "col" : "1fr",
        "topology_component_height" : 260,        
    }

}