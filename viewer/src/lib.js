export function get_sensor_list_by_factory(all_sensor_data){
    const k = Object.keys(all_sensor_data)
    let all_data = {}
    k.forEach(item => {
        let json_data = all_sensor_data[item]
        
        let keys_list = []
        const keys = Object.keys(json_data)
        try{
            keys.forEach(i => {
                const sensor_list = Object.keys(json_data[i].data.sensors)        
                sensor_list.forEach(d => {            
                    if (!keys_list.includes(d)){
                        keys_list.push(d)
                    }
                })
            })
        } catch {

        }
        all_data[item] = keys_list
    })    
    return all_data
}

export function group_by_gateway(all_sensor_data){
    const factory_list = Object.keys(all_sensor_data)

    
    var return_obj = {}
    factory_list.forEach(factory => {
        var a = all_sensor_data[factory]
        var ls = {}
        var ns = {}
        var gateway_list = []
        try{
            Object.keys(a).forEach(d => {
                if (a[d].data.node_info[1].info.mode == "gateway")    {
                    gateway_list.push(a[d].data.node_info[0].id)        
                }
            })
            Object.keys(a).forEach(d => {
                
                var next_hop = a[d].data.node_info[1].info.next_hop.toUpperCase();
                var id = a[d].data.node_info[0].id.toUpperCase();
                var mode = a[d].data.node_info[1].mode
        
                if (Object.keys(ls).includes(next_hop)){
                    ls[next_hop].push(id)
                } else {
                    var b = 0
                    Object.keys(ls).forEach(i => {            
                        if (ls[i].includes(next_hop)){
                            ls[i].push(id)
                            b = 1;
                        }                             
                    })
                    if (b == 0){
                        ls[next_hop] = [id]
                    }
                }
            })

            gateway_list.forEach(i => {
                ns[i] = ls[i]
            })
        } catch {}
        return_obj[factory] = ns
    })

    return return_obj;
}