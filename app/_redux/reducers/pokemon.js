import { pokemonConstants } from "../_constants";

const {
  GET_ALL_POKEMON,
  GET_DETAIL_POKEMON,
  GET_ALL_CATEGORY,
  GET_ALL_TYPES,
  POST_POKEMON,
  UPDATE_POKEMON,
  DELETE_POKEMON
} = pokemonConstants;

const INITIAL_STATE = {
  data: [],
  detail: {},
  isLoading: false,
  updateLoading: false,
  deleteLoading: false,
  categories: [],
  types: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ALL_POKEMON + "_FULFILLED":
      return {
        ...state,
        isLoading: false,
        data: action.payload.data.rows
      };
    case GET_ALL_POKEMON + "_PENDING":
      return {
        ...state,
        isLoading: true
      };
    case GET_DETAIL_POKEMON + "_FULFILLED":
      return {
        ...state,
        isLoading: false,
        detail: action.payload.data.rows
      };
    case GET_DETAIL_POKEMON + "_PENDING":
      return {
        ...state,
        isLoading: true
      };
    case GET_ALL_CATEGORY + "_FULFILLED":
      return {
        ...state,
        isLoading: false,
        categories: action.payload.data.data
      };
    case GET_ALL_CATEGORY + "_PENDING":
      return {
        ...state,
        isLoading: true
      };
    case GET_ALL_TYPES + "_FULFILLED":
      return {
        ...state,
        isLoading: false,
        types: action.payload.data
      };
    case GET_ALL_TYPES + "_PENDING":
      return {
        ...state,
        isLoading: true
      };
    case POST_POKEMON + "_FULFILLED":
      return {
        ...state
      };
    case UPDATE_POKEMON + "_FULFILLED":
      return {
        ...state,
        updateLoading: false
      };
    case UPDATE_POKEMON + "_PENDING":
      return {
        ...state,
        updateLoading: true
      };
    case DELETE_POKEMON + "_FULFILLED":
      return {
        ...state,
        deleteLoading: false
      };
    case DELETE_POKEMON + "_PENDING":
      return {
        ...state,
        deleteLoading: true
      };
    default:
      return state;
  }
};
