import { mapsConstants } from "../_constants";

const { SELECT_MAP_THEME, REFRESH_MAP } = mapsConstants;

export const selectMapTheme = theme => dispatch => {
  dispatch({
    type: SELECT_MAP_THEME,
    payload: theme
  });
};

export const refreshMapTrue = () => dispatch => {
  dispatch({
    type: REFRESH_MAP
  });
};
