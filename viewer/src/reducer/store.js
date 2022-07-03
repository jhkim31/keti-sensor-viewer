import { init_state } from "./Main_State";
import { createStore } from 'redux';



function reducer(current_state = init_state, action) {
  const new_state = { ...current_state }

  switch (action.type) {
    case "ADD":
      new_state.n++
      console.log(action.data);
      break;
  }

  return new_state
}
const store = createStore(reducer)

export default store
