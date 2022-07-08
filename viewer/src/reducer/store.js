import { init_state } from "./Main_State";
import { createStore } from 'redux';
import { get_keys, get_gateway } from "../lib";
import { composeWithDevTools } from 'redux-devtools-extension';

const SELECT_FACTORY = 'SELECT_FACTORY'
const SELECT_SENSOR = 'SELECT_SENSOR'
const SELECT_GATEWAY = "SELECT_GATEWAY"
const SET_INIT_STATE = 'SET_INIT_STATE'
const DOWN_STAIR = "DOWN_STAIR"
const UP_STAIR = "UP_STAIR"
const NODE_MOVE_STOP = "NODE_MOVE_STOP"
const RE_RENDER = "RE_RENDER"
const UPDATE_IMAGE_SIZE = "UPDATE_IMAGE_SIZE"
const NODE_FIX_TOGGLE = "NODE_FIX_TOGGLE"
const SHOW_EDGES_TOGGLE = "SHOW_EDGES_TOGGLE"

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
        gateway_data: get_gateway(action.data),                
        selected_factory_useable_sensor_list: current_state.selected_factory != '' ? get_keys(action.data)[current_state.selected_factory] : [],
        selected_factory_sensor_data: current_state.selected_factory != '' ? action.data[current_state.selected_factory] : {},
        selected_factory_gateway: current_state.selected_factory != '' ? get_gateway(action.data)[current_state.selected_factory] : [],
        timestamp: new Date().getTime()
      }
      console.log("after_init_state : ", new_state)
      break;

    case SELECT_FACTORY:
      new_state = {
        ...current_state,
        selected_factory: action.data.factory_info.factory,              
        sensor_position: action.data.sensor_position,
        selected_gateway: "",
        selected_node: "",        
        selected_factory_useable_sensor_list: current_state.useable_sensor_by_factory[action.data.factory_info.factory],
        selected_factory_sensor_data: current_state.all_sensor_data[action.data.factory_info.factory],
        selected_factory_gateway: current_state.gateway_data[action.data.factory_info.factory],
        selected_factory_image_width: action.data.factory_info.width,
        selected_factory_image_height: action.data.factory_info.height,
        in_gateway_node: []
      }      
      break;

    case SELECT_SENSOR:
      new_state = {
        ...current_state,
        selected_node: action.data.selected_node
      }
      break;
    
    case SELECT_GATEWAY:
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
        break;
      
    case NODE_MOVE_STOP:
      new_state = {
        ...current_state,
        selected_node: action.data.item,
        sensor_position: action.data.sensor_position
      }
      break;
    
    case RE_RENDER:      
      new_state = {
        ...current_state,
        update_time: action.data.update_time
      }
      break;
    
    case UPDATE_IMAGE_SIZE:
      new_state = {
        ...current_state,
        selected_factory_image_width : action.data.width,
        selected_factory_image_height : action.data.height,
        timestamp: new Date().getTime()
      }
      break;

    case NODE_FIX_TOGGLE:
      new_state = {
        ...current_state,
        node_fixed : !current_state.node_fixed
      }
      break;
    case SHOW_EDGES_TOGGLE:
      new_state = {
        ...current_state,
        show_edges : !current_state.show_edges
      }
      break;
  }


  return new_state
}

const store = createStore(reducer, composeWithDevTools())

export {
  store,
  SELECT_FACTORY,
  SELECT_SENSOR,
  SET_INIT_STATE,
  UP_STAIR,
  DOWN_STAIR,
  SELECT_GATEWAY,
  NODE_MOVE_STOP,
  RE_RENDER,
  UPDATE_IMAGE_SIZE,
  NODE_FIX_TOGGLE,
  SHOW_EDGES_TOGGLE
}
