export interface NODE_ID {
    id? : string
}
export interface NODE_INFO {
    info? : {
        cpu_1m? : string,
        cpu_5m? : string,
        cpu_15m?: string,
        cpu_temp? : string,
        dmesg? :string,
        ip? : string,
        mac? : string,
        mode?: string,
        next_hop? : string,
        seq?: number,
        vap? : string
    }
}
export interface SENSOR {
    value: number | string,
    time: number
}
export interface NODE {
    service : {
        timestamp?: number,
        datetime?: string
    },
    data : {        
        node_info? : [ NODE_ID?, NODE_INFO?], 
        sensors?: {
            [sensor: string] : SENSOR
        },
        values? : object,
        co2?: number,
        voc?: number
    }
}

export interface SENSOR_COORDINATE { 
    floor: number,
    x : number,
    y: number
}

export interface SENSOR_POSITION {
    [sensor: string] : SENSOR_COORDINATE
}

export interface FACTORY {
    [node: string]: NODE
}

export interface ALL_FACTORY_DATA {
    [factory: string] : FACTORY
}

export interface SELECTED_FACTORY_SENSOR_DATA {
    [node: string] : NODE
}

export interface USEABLE_SENSOR_BY_FACTORY {
    [factory: string] : string[]
}

export interface GATEWAY_DATA {
    [factory: string] : {
        [gateway: string]: string[]
    }
}
export interface SELECTED_FACTORY_GATEWAY {
    [gateway: string] : string[]
}

export interface STATE {    
    selected_factory : string,
    selected_node : string,
    selected_gateway : string,
    selected_factory_image_width: number,
    selected_factory_image_height: number,
    
    selected_factory_useable_sensor_list : string[],
    selected_factory_sensor_data: SELECTED_FACTORY_SENSOR_DATA,
    selected_factory_gateway: SELECTED_FACTORY_GATEWAY,  

    useable_sensor_by_factory : USEABLE_SENSOR_BY_FACTORY,
    all_factory_data : ALL_FACTORY_DATA,
    sensor_position : SENSOR_POSITION,
    factory_list : string[],
    
    update_time : string,    
    timestamp: number,   
    
    gateway_data : GATEWAY_DATA,
    in_gateway_node : string[],
    node_fixed: boolean,
    show_edges: boolean,
    signal: boolean
}

export const init_state: STATE = {   
    selected_factory : "",
    selected_node : "",
    selected_gateway : "",
    selected_factory_image_width: 0,
    selected_factory_image_height: 0,

    selected_factory_useable_sensor_list : [],
    selected_factory_sensor_data: {},
    selected_factory_gateway: {},    

    useable_sensor_by_factory : {},    
    all_factory_data : {},
    sensor_position : {},
    factory_list : [],    
        
    update_time : "", 
    timestamp: 0,   
    
    gateway_data : {},
    in_gateway_node : [],
    node_fixed : true,
    show_edges : true,
    signal : false,
}