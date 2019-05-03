import { combineReducers } from "redux";
import users from "./users";
import pokemon from "./pokemon";
import maps from "./maps";

export default combineReducers({
  users,
  pokemon,
  maps
});
