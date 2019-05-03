import { mapsConstants } from "../_constants";

const { SELECT_MAP_THEME, REFRESH_MAP } = mapsConstants;

const INITIAL_STATE = {
  listTheme: ["Standard", "Aubergine", "Silver"],
  theme: "Standard",
  needRefresh: false,
  jsonData: []
};

const selectJson = theme => {
  switch (theme) {
    case "Standard":
      return [];
    case "Aubergine":
      return require("../../_constants/Maps/Aubergine.json");
    case "Silver":
      return require("../../_constants/Maps/Silver.json");
    default:
      return [];
  }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SELECT_MAP_THEME:
      if (state.theme !== action.payload) {
        return {
          ...state,
          theme: action.payload,
          jsonData: selectJson(action.payload),
          needRefresh: true
        };
      } else {
        return {
          ...state,
          theme: action.payload,
          jsonData: selectJson(action.payload),
          needRefresh: false
        };
      }
    case REFRESH_MAP:
      return {
        ...state,
        needRefresh: false
      };

    default:
      return state;
  }
};
