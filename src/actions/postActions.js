import {
  GET_POSTS,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  UPDATE_POST
} from "./types";
import axios from "axios";

export const getPosts = () => async dispatch => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/posts"
  );
  dispatch({ type: GET_POSTS, payload: response.data });
};

export const getPost = id => async dispatch => {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  dispatch({ type: GET_POST, payload: response.data });
};

export const deletePost = id => async dispatch => {
  try {
    await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
    dispatch({ type: DELETE_POST, payload: id });
  } catch (err) {
    dispatch({ type: DELETE_POST, payload: id });
  }
};

export const addPost = post => async dispatch => {
  const response = await axios.post(
    "https://jsonplaceholder.typicode.com/posts",
    post
  );
  dispatch({ type: ADD_POST, payload: response.data });
};

export const updatePost = post => async dispatch => {
  const response = await axios.put(
    `https://jsonplaceholder.typicode.com/posts/${post.id}`,
    post
  );
  dispatch({ type: UPDATE_POST, payload: response.data });
};
