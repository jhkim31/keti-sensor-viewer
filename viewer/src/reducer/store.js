import { init_state } from "./Main_State";
import { createStore } from 'redux';
import { get_keys, get_gateway } from "../lib";

const SET_SELECTED_FACTORY = 'SET_SELECTED_FACTORY'
const SET_SELECTED_SENSOR = 'SET_SELECTED_SENSOR'
const SET_INIT_STATE = 'SET_INIT_STATE'
const DOWN_STAIR = "DOWN_STAIR"
const UP_STAIR = "UP_STAIR"
const SET_SELECTED_GATEWAY = "SET_SELECTED_GATEWAY"
const NODE_MOVE_STOP = "NODE_MOVE_STOP"

function reducer(current_state = init_state, action) {
  let new_state = { ...current_state }

  switch (action.type) {

    case SET_INIT_STATE:
      new_state = {
        ...current_state,
        update_time: new Date().toString(),
        all_sensor_data: action.data,
        useable_sensor_by_factory: get_keys(action.data),
        factory_list: Object.keys(get_keys(action.data)),
        gateway_data: get_gateway(action.data)
      }
      console.log("after_init_state : ", new_state)
      break;

    case SET_SELECTED_FACTORY:
      new_state = {
        ...current_state,
        selected_factory: action.data.factory_info.factory,
        min_floor: action.data.factory_info.min_floor,
        max_floor: action.data.factory_info.max_floor,
        current_floor: action.data.factory_info.min_floor,
        map_index: 0,
        selected_gateway: "",
        selected_sensor: "",
        map_list: action.data.factory_info.floor,
        sensor_position: action.data.sensor_position,
        in_gateway_node: []
      }      
      break;

    case SET_SELECTED_SENSOR:
      new_state = {
        ...current_state,
        selected_sensor: action.data.selected_sensor
      }
      break;
    
    case DOWN_STAIR:
      if (current_state.current_floor > current_state.min_floor) {
        let last_floor = current_state.current_floor;
        const min_floor = current_state.min_floor;
        new_state = {
          ...current_state,
          current_floor: last_floor - 1,
          map_index: min_floor - last_floor + 1
        }
      }
      break;
    
    case UP_STAIR:
      if (current_state.current_floor < current_state.max_floor) {
        let last_floor = current_state.current_floor;
        const min_floor = current_state.min_floor;
        new_state = {
          ...current_state,
          current_floor: last_floor + 1,
          map_index: min_floor - (last_floor + 1)
        }
      }
      break;
    
    case SET_SELECTED_GATEWAY:
      const gateway = action.data.gateway;
      const selected_factory_gateway = current_state.gateway_data[current_state.selected_factory]
      const show_node_list = selected_factory_gateway[gateway];

      let show_node_data = {}
      show_node_list.forEach(node => {
        show_node_data[node] = current_state.all_sensor_data[current_state.selected_factory][node]
      })

      if (current_state.selected_gateway == gateway) 
        new_state = {
          ...current_state,
          in_gateway_node: [],
          selected_gateway: ""
        }
      else 
        new_state = {
          ...current_state,
          in_gateway_node: show_node_list,
          selected_gateway: gateway
        }
      

    case NODE_MOVE_STOP:
      new_state = {
        ...current_state,
        selected_sensor: action.data.item,
        sensor_position: action.data.sensor_position
      }
      break;
  }

  return new_state
}

const store = createStore(reducer)

export {
  store,
  SET_SELECTED_FACTORY,
  SET_SELECTED_SENSOR,
  SET_INIT_STATE,
  UP_STAIR,
  DOWN_STAIR,
  SET_SELECTED_GATEWAY,
  NODE_MOVE_STOP
}
