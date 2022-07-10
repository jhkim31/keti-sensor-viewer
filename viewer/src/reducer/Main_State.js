const init_state = {    
    selected_factory : "",
    selected_node : "",
    selected_gateway : "",
    selected_factory_image_width: 0,
    selected_factory_image_height: 0,

    selected_factory_useable_sensor_list : [],
    selected_factory_sensor_data: {},
    selected_factory_gateway: [],    

    useable_sensor_by_factory : {},    
    all_sensor_data : {},
    sensor_position : {},
    factory_list : [],    
        
    update_time : "", 
    time_stamp: 0,   
    
    gateway_data : {},
    in_gateway_node : [],
    node_fixed : true,
    show_edges : true,
    signal : false,
}


export {init_state}