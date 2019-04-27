import { combineReducers } from "redux";
import users from "./users";
import pokemon from "./pokemon";

export default combineReducers({
  users,
  pokemon
});
