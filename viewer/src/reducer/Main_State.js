const init_state = {
    all_factory_data : {},                          // 모든 데이터
    factories : [],                                 // 공장 리스트
    factories_useable_sensors : {},                 // 공장별 사용 가능한 센서 리스트
    nodes_group_by_factory_gateway : {},            // 공장내 게이트웨이에 물린 노드들을 그룹화.

    selected_factory : "",
    selected_node : "",
    selected_gateway : "",

    selected_factory_useable_sensor_list : [],      // 선택된 공장에서 사용 가능한 센서 리스트
    selected_factory_node_list : [],                // 선택된 공장에서의 노드이름 리스트
    selected_factory_node_position : {},            // 선택된 공장의 노드 좌표
    selected_factory_gateway_list: [],              // 선택된 공장에 대한 게이트웨이 리스트
    selected_factory_data: {},                      // 선택된 공장에 대한 데이터
    selected_gateway_node_list : [],                // 선택된 게이트웨이에 물린 노드 리스트

    topology: {
        fix_node : true,
        show_edges : true,
        signal : false,
        image_width: 0,
        image_height: 0,
        floor: 1,
        max_floor: 3
    },

    last_update_time : "",
    last_timestamp: 0,
}


export {init_state}