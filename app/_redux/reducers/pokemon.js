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
  pagination: {
    total: 0,
    perPage: 0,
    page: 0,
    lastPage: 0
  },
  detail: {},
  isLoading: false,
  updateLoading: false,
  deleteLoading: false,
  categories: [],
  types: []
};

export default (state = INITIAL_STATE, action) => {
  let newData = [];
  switch (action.type) {
    case GET_ALL_POKEMON + "_FULFILLED":
      let result = [];
      // alert(action.payload.data.page);
      if (action.payload.data.page === 1) {
        // alert("first");
        result = action.payload.data.data;
      } else {
        // alert("page");
        result = [...state.data, ...action.payload.data.data];
      }

      return {
        ...state,
        isLoading: false,
        data: result,
        pagination: {
          total: action.payload.data.total,
          perPage: action.payload.data.perPage,
          page: action.payload.data.page,
          lastPage: action.payload.data.lastPage
        }
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
      newData = state.data;
      newData.splice(0, 0, action.payload.data.data);

      return {
        ...state,
        data: newData
      };
    case UPDATE_POKEMON + "_FULFILLED":
      newData = state.data.map(val => {
        if (val.id === action.payload.data.data.id) {
          return action.payload.data.data;
        } else {
          return val;
        }
      });

      return {
        ...state,
        data: newData,
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
