import { STATE, init_state, ALL_FACTORY_DATA, SENSOR_COORDINATE } from "./interface";
import { createStore } from 'redux';
import { get_useable_sensor_by_factory } from "../lib";
import { composeWithDevTools } from "redux-devtools-extension";

const SET_INIT_STATE = "SET_INIT_STATE" as const;
export const set_init_state = (data: ALL_FACTORY_DATA) => {
  return {
    type: SET_INIT_STATE, 
    data: data
  }
}

const SELECT_FACTORY = "SELECT_FACTORY" as const;
export const select_factory = (data: {
  sensor_position: {
    [node_id: string] : SENSOR_COORDINATE
  },
  factory_info: {
    factory: string,
    width: number,
    height: number
  }
}) => {
  return {
    type: SELECT_FACTORY,
    data: data
  }
}


type Action = 
  | ReturnType<typeof select_factory>
  | ReturnType<typeof set_init_state> 
  
  


const SELECT_SENSOR = 'SELECT_SENSOR'
const SELECT_GATEWAY = "SELECT_GATEWAY"

const DOWN_STAIR = "DOWN_STAIR"
const UP_STAIR = "UP_STAIR"
const NODE_MOVE_STOP = "NODE_MOVE_STOP"
const RE_RENDER = "RE_RENDER"
const UPDATE_IMAGE_SIZE = "UPDATE_IMAGE_SIZE"
const NODE_FIX_TOGGLE = "NODE_FIX_TOGGLE"
const SHOW_EDGES_TOGGLE = "SHOW_EDGES_TOGGLE"
const TRUE_SIGNAL = "TRUE_SIGNAL"
const FALSE_SIGNAL = "FALSE_SIGNAL"

function reducer(current_state: any=init_state, action: Action) {  
  current_state = current_state as STATE;
  let new_state: STATE = { ...current_state }
  switch (action.type) {
    case SET_INIT_STATE:                 
      new_state = {
        ...current_state,
        update_time: new Date().toString(),
        all_factory_data: action.data,
        useable_sensor_by_factory: get_useable_sensor_by_factory(action.data),
        factory_list: Object.keys(get_useable_sensor_by_factory(action.data)),
        gateway_data: {},
        selected_factory_useable_sensor_list: current_state.selected_factory != '' ? get_useable_sensor_by_factory(action.data)[current_state.selected_factory] : [],
        selected_factory_sensor_data: current_state.selected_factory != '' ? action.data[current_state.selected_factory] : {},
        selected_factory_gateway: [],
        timestamp: new Date().getTime()
      }      
      console.log(new_state)
      return new_state;    

    case SELECT_FACTORY:
      new_state = {
        ...current_state,
        selected_factory: action.data.factory_info.factory,                
        sensor_position: action.data.sensor_position,

        selected_factory_useable_sensor_list: current_state.useable_sensor_by_factory[action.data.factory_info.factory],
        selected_factory_sensor_data: current_state.all_factory_data[action.data.factory_info.factory],
        selected_factory_gateway: {},
        selected_factory_image_width: action.data.factory_info.width,
        selected_factory_image_height: action.data.factory_info.height,
                
        selected_gateway: "",
        selected_sensor: "",       
        
        in_gateway_node: []
      }      
      break;

  //   case SET_SELECTED_SENSOR:
  //     new_state = {
  //       ...current_state,
  //       selected_sensor: action.data.selected_sensor
  //     }
  //     break;
    
  //   case DOWN_STAIR:
  //     if (current_state.current_floor > current_state.min_floor) {
  //       let last_floor = current_state.current_floor;
  //       const min_floor = current_state.min_floor;
  //       new_state = {
  //         ...current_state,
  //         current_floor: last_floor - 1,
  //         map_index: min_floor - last_floor + 1
  //       }
  //     }
  //     break;
    
  //   case UP_STAIR:
  //     if (current_state.current_floor < current_state.max_floor) {
  //       let last_floor = current_state.current_floor;
  //       const min_floor = current_state.min_floor;
  //       new_state = {
  //         ...current_state,
  //         current_floor: last_floor + 1,
  //         map_index: min_floor - (last_floor + 1)
  //       }
  //     }
  //     break;
    
  //   case SET_SELECTED_GATEWAY:
  //     const gateway = action.data.gateway;
  //     const selected_factory_gateway = current_state.gateway_data[current_state.selected_factory]
  //     const show_node_list = selected_factory_gateway[gateway];

  //     let show_node_data = {}
  //     show_node_list.forEach(node => {
  //       show_node_data[node] = current_state.all_factory_data[current_state.selected_factory][node]
  //     })

  //     if (current_state.selected_gateway == gateway) 
  //       new_state = {
  //         ...current_state,
  //         in_gateway_node: [],
  //         selected_gateway: ""
  //       }
  //     else 
  //       new_state = {
  //         ...current_state,
  //         in_gateway_node: show_node_list,
  //         selected_gateway: gateway
  //       }
  //       break;
      
  //   case NODE_MOVE_STOP:
  //     new_state = {
  //       ...current_state,
  //       selected_sensor: action.data.item,
  //       sensor_position: action.data.sensor_position
  //     }
  //     break;
    
  //   case RE_RENDER:      
  //     new_state = {
  //       ...current_state,
  //       update_time: action.data.update_time
  //     }
  //     break;
  }
  return new_state
}

export const store = createStore(reducer, composeWithDevTools())

export {
  SELECT_SENSOR,
  SET_INIT_STATE,
  SELECT_FACTORY,
  UP_STAIR,
  DOWN_STAIR,
  SELECT_GATEWAY,
  NODE_MOVE_STOP,
  RE_RENDER,
  UPDATE_IMAGE_SIZE,
  NODE_FIX_TOGGLE,
  SHOW_EDGES_TOGGLE,
  TRUE_SIGNAL,
  FALSE_SIGNAL
}
