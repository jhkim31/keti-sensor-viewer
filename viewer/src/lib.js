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


// node {
//     mac: string,
//     mode: string,
//     child: node[]
// }

export function group_by_gateway(all_factory_data){
    const factory_list = Object.keys(all_factory_data)
    var return_obj = {}
    factory_list.forEach(factory => {
        const nodes = all_factory_data[factory];
        let node_trees = [];
        let gateways = []
        Object.keys(nodes).forEach(node_id => {
            try{
                const next_hop = nodes[node_id].data.node_info[1].info.next_hop.toUpperCase()
                const mac = nodes[node_id].data.node_info[1].info.mac.toUpperCase()
                const mode = nodes[node_id].data.node_info[1].info.mode;
                if (mode == "gateway")
                    gateways.push(mac)

                let node = null;
                for (let i = 0; i < node_trees.length; i++){
                    const gateway_node = node_trees[i];
                    const result = dfs_search(gateway_node, mac)
                    if (result){
                        node = result;
                        node_trees = delete_node(node_trees, node);
                        break;
                    }
                }

                if (node === null){
                    const new_node = {
                        mac: mac,
                        child: []
                    }

                    node = new_node;
                }

                let result = false;

                for (let i = 0; i < node_trees.length; i++){
                    result = dfs_input(node_trees[i], node, next_hop)
                    if (result)
                        break;
                }
                if (!result){
                    let parent_node = null;
                    if (next_hop !== mac)
                        parent_node = {
                            mac: next_hop,
                            child: [node]
                        }
                    else
                        parent_node = node
                    node_trees.push(parent_node)
                }


            } catch{}

        })
        console.log(factory, gateways, node_trees)

        try{
            return_obj[factory] = {}
            return_obj[factory]["FF:FF:FF:FF:FF:FF"] = []
            for(let i = 0; i < node_trees.length; i++){
                let return_arr = []
                dfs_all_node(node_trees[i], return_arr)
                if (gateways.includes(node_trees[i].mac))
                    return_obj[factory][node_trees[i].mac] = return_arr;
                 else
                    return_obj[factory]["FF:FF:FF:FF:FF:FF"] = return_obj[factory]["FF:FF:FF:FF:FF:FF"].concat(return_arr);
            }
        } catch{}
    })
    console.log(return_obj)
    return return_obj;
}

function dfs_all_node(root_node, arr){
    arr.push(root_node.mac);
    if (root_node.child)
        for(let i = 0; i < root_node.child.length; i++){
            dfs_all_node(root_node.child[i], arr)
        }
    return arr
}
function dfs_search(root_node, mac){
    if (root_node.mac === mac)
        return root_node;
    for(let i = 0; i < root_node.child.length; i++){
        const child_node = root_node.child[i];
        if (child_node.mac == mac) {
            return child_node
        } else {
            dfs_search(child_node, mac);
        }
    }
    return null;
}
function delete_node(node_trees, node){
    const index = node_trees.indexOf(node);
    if (index >= 0){
        node_trees.splice(index, 1)
    }
    return node_trees
}

function dfs_input(root_node, node, next_hop){
    if (root_node.mac === next_hop){
        root_node.child.push(node)
        return true;
    }
    for(let i = 0; i < root_node.child.length; i++){
        const child_node = root_node.child[i]
        if (child_node.mac === next_hop){
            child_node.child.push(node)
            return true;
        } else {
            return dfs_input(child_node, node, next_hop)
        }
    }
    return false;
}

