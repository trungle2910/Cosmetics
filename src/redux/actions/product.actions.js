import api from "../../apiService";
import * as types from "../constants/product.constants";

const getProducts =
  (pageNum, limit, name = null, category = null, sortBy = null) =>
  async (dispatch) => {
    dispatch({ type: types.GET_ALL_PRODUCTS_REQUEST, payload: null });
    try {
      let queryString = "";
      if (name) {
        queryString = `&name[$regex]=${name}&name[$options]=i`;
      }
      if (category) {
        queryString = `&category=${category}`;
      }

      const res = await api.get(
        `/product?page=${pageNum}&limit=${limit}${queryString}`
      );

      dispatch({
        type: types.GET_ALL_PRODUCTS_SUCCESS,
        payload: res.data.data,
      });
    } catch (error) {
      dispatch({ type: types.GET_ALL_PRODUCTS_FAILURE, payload: error });
    }
  };
const getSingleProduct = (productId) => async (dispatch) => {
  dispatch({ type: types.GET_SINGLE_PRODUCT_REQUEST, payload: null });
  try {
    const res = await api.get(`/product/${productId}`);
    dispatch({
      type: types.GET_SINGLE_PRODUCT_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({ type: types.GET_SINGLE_PRODUCT_FAILURE, payload: error });
  }
};
const newProduct = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.NEW_PRODUCT_REQUEST, payload: null });
    const res = await api.post(`/product/add`, data);
    const pageNum = 1;
    const limit = 10;
    dispatch(productActions.getProducts(pageNum, limit));
    dispatch({ type: types.NEW_PRODUCT_SUCCESS, payload: res.data.data });
  } catch (error) {
    dispatch({ type: types.NEW_PRODUCT_FAILURE, payload: error.message });
  }
};
const editProduct =
  (name, description, price, salePrice, category, imageUrl, productId) =>
  async (dispatch) => {
    try {
      dispatch({ type: types.EDIT_PRODUCT_REQUEST, payload: null });
      const res = await api.post(
        `/product/${productId}`,
        name,
        description,
        price,
        salePrice,
        category,
        imageUrl
      );
      const pageNum = 1;
      const limit = 10;
      dispatch(productActions.getProducts(pageNum, limit));
      dispatch({ type: types.EDIT_PRODUCT_SUCCESS, payload: res.data.data });
    } catch (error) {
      dispatch({ type: types.EDIT_PRODUCT_FAILURE, payload: error.message });
    }
  };
const deleteProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: types.DELETE_PRODUCT_REQUEST, payload: null });
    const res = await api.delete(`/product/${productId}`);
    const pageNum = 1;
    const limit = 10;
    dispatch(productActions.getProducts(pageNum, limit));
    dispatch({ type: types.DELETE_PRODUCT_SUCCESS, payload: res });
  } catch (error) {
    dispatch({ type: types.DELETE_PRODUCT_FAILURE, payload: error.message });
  }
};
export const productActions = {
  getProducts,
  getSingleProduct,
  newProduct,
  editProduct,
  deleteProduct,
};
