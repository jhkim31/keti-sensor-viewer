import { NODE, ALL_FACTORY_DATA, FACTORY, NODE_INFO, USEABLE_SENSOR_BY_FACTORY } from "./redux/interface";

export function get_useable_sensor_by_factory(all_factory_data:  ALL_FACTORY_DATA): USEABLE_SENSOR_BY_FACTORY{
    const factory_list:string[] = Object.keys(all_factory_data);    
    let return_data: USEABLE_SENSOR_BY_FACTORY = {};
    factory_list.forEach((factory: string) => {
        let factory_data: FACTORY = all_factory_data[factory];
        let factory_sensor_list: string[] = [];
        const node_list = Object.keys(factory_data);
        
        try{
            node_list.forEach((node_id: string) => {                                
                let node_sensor_data = Object.keys(factory_data[node_id].data.sensors ?? {});
                node_sensor_data.forEach(sensor_kind => {
                    if (!factory_sensor_list.includes(sensor_kind)){
                        factory_sensor_list.push(sensor_kind);
                    }
                })
            })
        } catch {}
        return_data[factory] = factory_sensor_list;
    })    
    return return_data;
}

export function get_gateway(all_factory_data: ALL_FACTORY_DATA){    
    const factory_list = Object.keys(all_factory_data);
    
    let return_data: {
        [factory: string] : {
            [gateway: string]: string[]
        }
    } = {};
    factory_list.forEach((factory: string) => {
        let factory_data: FACTORY = all_factory_data[factory]
        let ls:{[mac: string] : string[]} = {};
        let ns = {};
        let gateway_list: string[] = [];
        return_data[factory] = {};
    
        Object.keys(factory_data).forEach((node_id: string) => {
            const node_data: NODE = factory_data[node_id];                
            const node_mode: string = node_data.data.node_info?.[1]?.info?.mode ?? ''
            const node_mac: string = node_data.data.node_info?.[0]?.id ?? ''

            if (node_mode === "gateway") {
                gateway_list.push(node_mac);
            }
        })

        gateway_list.forEach((node_id: string) => {
            return_data[factory][node_id] = []
        })

        Object.keys(factory_data).forEach((node_id: string) => {                
            const node_info: NODE_INFO = factory_data[node_id].data.node_info?.[1] ?? {};
            const next_hop: string = node_info.info?.next_hop ?? ''.toUpperCase();            
            const node_mac: string = node_info.info?.mac ?? ''.toUpperCase();
            const node_mode: string = node_info.info?.mode ?? '';
            //id == node_mac
        })
    })

    return return_data;
}