import { init_state } from "./Main_State";
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { get_sensor_list_by_factory, group_by_gateway } from "../lib";

const SELECT_FACTORY = 'SELECT_FACTORY'
const SELECT_NODE = 'SELECT_NODE'
const SELECT_GATEWAY = "SELECT_GATEWAY"
const SET_INIT_STATE = 'SET_INIT_STATE'
const DOWN_STAIR = "DOWN_STAIR"
const UP_STAIR = "UP_STAIR"
const MOVE_NODE = "MOVE_NODE"
const ADD_FLOOR = "ADD_FLOOR"
const DELETE_FLOOR = "DELETE_FLOOR"
const UPDATE_IMAGE_SIZE = "UPDATE_IMAGE_SIZE"
const NODE_FIX_TOGGLE = "NODE_FIX_TOGGLE"
const HIDE_EDGES_TOGGLE = "HIDE_EDGES_TOGGLE"
const TRUE_SIGNAL = "TRUE_SIGNAL"
const FALSE_SIGNAL = "FALSE_SIGNAL"
const RESET_SELECT_GATEWAY = "RESET_SELECT_GATEWAY"
const UPDATE_DATA = "UPDATE_DATA"

function reducer(current_state = init_state, action) {
  let new_state = { ...current_state }

  switch (action.type) {
    case SET_INIT_STATE:
      new_state = {
        ...current_state,
        all_factory_data: action.data,
        factories: Object.keys(action.data),
        factories_useable_sensors: get_sensor_list_by_factory(action.data),
        nodes_group_by_factory_gateway: group_by_gateway(action.data),

        last_update_time: new Date().toString(),
        last_timestamp: new Date().getTime()
      }
      break;

    case UPDATE_DATA:
      new_state = {
        ...current_state,
        all_factory_data: action.data,
        factories: Object.keys(action.data),
        factories_useable_sensors: get_sensor_list_by_factory(action.data),
        nodes_group_by_factory_gateway: group_by_gateway(action.data),

        selected_gateway: "",

        selected_factory_useable_sensor_list: get_sensor_list_by_factory(action.data)[current_state.selected_factory],
        selected_factory_gateway_list: Object.keys(group_by_gateway(action.data)[current_state.selected_factory]),
        selected_factory_data: action.data[current_state.selected_factory],
        selected_gateway_node_list: [],

        last_update_time: new Date().toString(),
        last_timestamp: new Date().getTime(),
        topology: {
          ...current_state.topology,
          signal: false
        }
      }

      break;

    case SELECT_FACTORY:
      new_state = {
        ...current_state,
        selected_factory: action.data.factory_info.factory,
        selected_node: "",
        selected_gateway: "",

        selected_factory_useable_sensor_list: current_state.factories_useable_sensors[action.data.factory_info.factory],
        selected_factory_node_list: Object.keys(current_state.all_factory_data[action.data.factory_info.factory]),
        selected_factory_node_position: action.data.sensor_position,
        selected_factory_gateway_list: Object.keys(current_state.nodes_group_by_factory_gateway[action.data.factory_info.factory]),
        selected_factory_data: current_state.all_factory_data[action.data.factory_info.factory],
        selected_gateway_node_list: [],

        topology: {
          ...current_state.topology,
          floor_size: action.data.factory_info.floor,
          signal: false,
          max_floor: action.data.factory_info.max_floor,
          floor: 1,
        },
      }

      break;

    case SELECT_NODE:
      new_state = {
        ...current_state,
        selected_node: action.data.selected_node
      }

      break;

    case SELECT_GATEWAY:
      const gateway = action.data.gateway;
      const nodes_group_by_factory_gateway = current_state.nodes_group_by_factory_gateway[current_state.selected_factory]
      const in_gateway_node = nodes_group_by_factory_gateway[gateway];


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

      break;

    case RESET_SELECT_GATEWAY:
      new_state = {
        ...current_state,
        selected_gateway_node_list: [],
        selected_gateway: ""
      }
      break;

    case MOVE_NODE:
      new_state = {
        ...current_state,
        selected_node: action.data.item,
        selected_factory_node_position: action.data.sensor_position,
        last_update_time: new Date().toString()
      }

      break;

    case UPDATE_IMAGE_SIZE:
      new_state = {
        ...current_state,
        topology: {
          ...current_state.topology,
          floor_size: action.data.floor_size,
          signal: false
        },
        last_timestamp: new Date().getTime()
      }

      break;

    case UP_STAIR:
      new_state = {
        ...current_state,
        topology: {
          ...current_state.topology,
          floor: current_state.topology.floor + 1,
          signal: false,
        }
      }
      break;

    case DOWN_STAIR:
      new_state = {
        ...current_state,
        topology: {
          ...current_state.topology,
          floor: current_state.topology.floor - 1,
          signal: false,
        }
      }
      break;

    case ADD_FLOOR:
      new_state = {
        ...current_state,
        topology: {
          ...current_state.topology,
          floor: action.data.floor,
          max_floor: action.data.max_floor,
          floor_size: action.data.floor_size
        }

      }
      break;

    case DELETE_FLOOR:
        new_state = {
          ...current_state,
          topology: {
            ...current_state.topology,
            floor: action.data.floor,
            max_floor: action.data.max_floor,
            floor_size: action.data.floor_size
          }
        }
        break;

    case NODE_FIX_TOGGLE:
      new_state = {
        ...current_state,
        topology: {
          ...current_state.topology,
          fix_node: !current_state.topology.fix_node
        }
      }

      break;
    case HIDE_EDGES_TOGGLE:
      new_state = {
        ...current_state,
        topology: {
          ...current_state.topology,
          hide_edges: !current_state.topology.hide_edges
        }
      }

      break;

    case FALSE_SIGNAL:
      new_state = {
        ...current_state,
        topology: {
          ...current_state.topology,
          signal: false
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

const store = createStore(reducer, composeWithDevTools())

export {
  store,
  SELECT_FACTORY,
  SELECT_NODE,
  SET_INIT_STATE,
  UP_STAIR,
  DOWN_STAIR,
  SELECT_GATEWAY,
  MOVE_NODE,
  UPDATE_IMAGE_SIZE,
  NODE_FIX_TOGGLE,
  HIDE_EDGES_TOGGLE,
  TRUE_SIGNAL,
  FALSE_SIGNAL,
  UPDATE_DATA,
  RESET_SELECT_GATEWAY,
  ADD_FLOOR,
  DELETE_FLOOR
}

