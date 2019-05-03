import { pokemonConstants } from "../_constants";
import { api_url } from "react-native-dotenv";
import axios from "axios";

const {
  GET_ALL_POKEMON,
  GET_DETAIL_POKEMON,
  GET_ALL_CATEGORY,
  GET_ALL_TYPES,
  POST_POKEMON,
  UPDATE_POKEMON,
  DELETE_POKEMON
} = pokemonConstants;

const full_uri = api_url + "pokemon";

export const getAllPokemon = (page = 1) => dispatch => {
  dispatch({
    type: GET_ALL_POKEMON,
    payload: axios.get(full_uri + "?page=" + page + "&sort=-id")
  });
};

export const getSearchPokemon = (
  page = 1,
  search = "",
  types = "",
  category = ""
) => dispatch => {
  let queryStr = "";

  if (search && search !== "") {
    queryStr += `&search=${search}`;
  }

  if (types && Object.entries(types).length !== 0) {
    queryStr += `&type_in=[${types}]`;
  }

  if (category) {
    queryStr += `&category_id=${category}`;
  }

  dispatch({
    type: GET_ALL_POKEMON,
    payload: axios.get(full_uri + "?page=" + page + queryStr + "&sort=-id")
  });
};

export const getDetailPokemon = id => dispatch => {
  dispatch({
    type: GET_DETAIL_POKEMON,
    payload: axios.get(full_uri + "/" + id)
  });
};

export const getAllCategories = () => dispatch => {
  // alert(api_url);
  dispatch({
    type: GET_ALL_CATEGORY,
    payload: axios.get(api_url + "categories")
  });
};

export const getAllTypes = () => dispatch => {
  dispatch({
    type: GET_ALL_TYPES,
    payload: axios.get(api_url + "types")
  });
};

export const postPokemon = (token, pokemon) => dispatch => {
  const data = new FormData();
  data.append("name", pokemon.name);
  data.append("latitude", pokemon.latitude);
  data.append("longitude", pokemon.longitude);
  data.append("category_id", pokemon.category);
  pokemon.typesSelected.forEach(val => {
    data.append("types[]", val);
  });
  data.append("image_url", {
    ...pokemon.avatarSource,
    name: "image" + ".jpg",
    type: "image/jpeg"
  });

  dispatch({
    type: POST_POKEMON,
    payload: axios.post(full_uri, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: token
      }
    })
  });
};

export const updatePokemon = (token, pokemon, id) => dispatch => {
  const data = new FormData();
  data.append("name", pokemon.name);
  data.append("latitude", pokemon.latitude);
  data.append("longitude", pokemon.longitude);
  data.append("category_id", pokemon.category);

  pokemon.typesSelected &&
    pokemon.typesSelected.forEach(val => {
      data.append("types[]", val);
    });
  pokemon.avatarSource &&
    data.append("image_url", {
      ...pokemon.avatarSource,
      name: "image" + ".jpg",
      type: "image/jpeg"
    });

  dispatch({
    type: UPDATE_POKEMON,
    payload: axios.patch(full_uri + "/" + id, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: token
      }
    })
  });
};

export const deletePokemon = (token, id) => dispatch => {
  dispatch({
    type: DELETE_POKEMON,
    payload: axios.delete(full_uri + "/" + id, {
      headers: {
        Authorization: token
      }
    })
  });
};
