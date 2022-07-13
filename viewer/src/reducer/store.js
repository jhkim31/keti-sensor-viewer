import { init_state } from "./Main_State";
import { createStore } from 'redux';
import { get_sensor_list_by_factory, group_by_gateway } from "../lib";

const SELECT_FACTORY = 'SELECT_FACTORY'
const SELECT_NODE = 'SELECT_NODE'
const SELECT_GATEWAY = "SELECT_GATEWAY"
const SET_INIT_STATE = 'SET_INIT_STATE'
const DOWN_STAIR = "DOWN_STAIR"
const UP_STAIR = "UP_STAIR"
const MOVE_NODE = "MOVE_NODE"
const RE_RENDER = "RE_RENDER"
const UPDATE_IMAGE_SIZE = "UPDATE_IMAGE_SIZE"
const NODE_FIX_TOGGLE = "NODE_FIX_TOGGLE"
const SHOW_EDGES_TOGGLE = "SHOW_EDGES_TOGGLE"
const TRUE_SIGNAL = "TRUE_SIGNAL"
const FALSE_SIGNAL = "FALSE_SIGNAL"
const UPDATE_DATA = "UPDATE_DATA"

function reducer(current_state = init_state, action) {
  let new_state = { ...current_state }

  switch (action.type) {
    case SET_INIT_STATE:      
      new_state = {
        ...current_state,
        all_factory_data: action.data,
        factory_list: Object.keys(action.data),
        node_list_by_factory: get_sensor_list_by_factory(action.data),
        node_list_group_by_gateway: group_by_gateway(action.data),                       

        last_update_time: new Date().toString(),
        last_timestamp: new Date().getTime()
      }
      console.info("ACTION: SET_INIT_STATE", new_state)
      break;

    case UPDATE_DATA: 
      new_state = {
        ...current_state,
        all_factory_data: action.data,
        factory_list: Object.keys(action.data),
        node_list_by_factory: get_sensor_list_by_factory(action.data),
        node_list_group_by_gateway: group_by_gateway(action.data),                

        selected_gateway: "",

        selected_factory_useable_sensor_list: get_sensor_list_by_factory(action.data)[current_state.selected_factory],        
        selected_factory_gateway_list: Object.keys(group_by_gateway(action.data)[current_state.selected_factory]),
        selected_factory_data: action.data[current_state.selected_factory],
        selected_gateway_node_list: [],

        last_update_time: new Date().toString(),
        last_timestamp: new Date().getTime()
      }
      console.info("ACTION: UPDATE_DATA", new_state)
      break;

    case SELECT_FACTORY:      
      new_state = {
        ...current_state,
        selected_factory: action.data.factory_info.factory,              
        selected_node: "",     
        selected_gateway: "",
        
        selected_factory_useable_sensor_list: current_state.node_list_by_factory[action.data.factory_info.factory],
        selected_factory_node_list: current_state.node_list_by_factory[action.data.factory_info.factory],
        selected_factory_sensor_position: action.data.sensor_position,
        selected_factory_gateway_list: Object.keys(current_state.node_list_group_by_gateway[action.data.factory_info.factory]),
        selected_factory_data: current_state.all_factory_data[action.data.factory_info.factory],
        selected_gateway_node_list : [],

        topology: {
          ...current_state.topology,
          image_width: action.data.factory_info.width,
          image_height: action.data.factory_info.height,
        
        },                
      }      
      console.info("ACTION: SELECT_FACTORY", new_state)
      break;

    case SELECT_NODE:
      new_state = {
        ...current_state,
        selected_node: action.data.selected_node
      }
      console.info("ACTION: SELECT_NODE", new_state)
      break;
    
    case SELECT_GATEWAY:
      const gateway = action.data.gateway;
      const node_list_group_by_gateway = current_state.node_list_group_by_gateway[current_state.selected_factory]
      const in_gateway_node = node_list_group_by_gateway[gateway];


      if (current_state.selected_gateway === gateway) 
        new_state = {
          ...current_state,
          selected_gateway_node_list: [],
          selected_gateway: ""
        }
      else 
        new_state = {
          ...current_state,
          selected_gateway_node_list: in_gateway_node,
          selected_gateway: gateway
        }
        console.info("ACTION: SELECT_GATEWAY", new_state)
        break;
      
    case MOVE_NODE:
      new_state = {
        ...current_state,
        selected_node: action.data.item,
        sensor_position: action.data.sensor_position
      }
      break;
    
    case RE_RENDER:      
      new_state = {
        ...current_state,
        last_update_time: action.data.last_update_time
      }
      break;
    
    case UPDATE_IMAGE_SIZE:
      new_state = {
        ...current_state,
        topology: {
          ...current_state.topology,
          image_width : action.data.width,
          image_height: action.data.height,
        },        
        last_timestamp: new Date().getTime()
      }
      break;

    case NODE_FIX_TOGGLE:
      new_state = {
        ...current_state,
        topology: {
          ...current_state.topology,
          fix_node : !current_state.topology.fix_node
        }        
      }
      break;
    case SHOW_EDGES_TOGGLE:
      new_state = {
        ...current_state,
        topology: {
          ...current_state.topology,
          show_edges : !current_state.topology.show_edges
        }     
      }
      break;

    case FALSE_SIGNAL:
      new_state = {
        ...current_state,
        topology: {
          ...current_state.topology,
          signal : false
        }             
      }
      break;
    case TRUE_SIGNAL: 
      new_state = {
        ...current_state,
        topology: {
          ...current_state.topology,
          signal: true
        }     
      }
      break;
  }


  return new_state
}

const store = createStore(reducer)

export {
  store,
  SELECT_FACTORY,
  SELECT_NODE,
  SET_INIT_STATE,
  UP_STAIR,
  DOWN_STAIR,
  SELECT_GATEWAY,
  MOVE_NODE,
  RE_RENDER,
  UPDATE_IMAGE_SIZE,
  NODE_FIX_TOGGLE,
  SHOW_EDGES_TOGGLE,
  TRUE_SIGNAL,
  FALSE_SIGNAL
}
