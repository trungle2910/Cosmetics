import * as types from "../constants/product.constants";
const initialState = {
  loading: false,
  products: [],
  singleProduct: null,
  totalPageNum: 0,
  selectedProducts: null,
  savePrice: 0,
  savePercent: 0,
};

const productReducers = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ALL_PRODUCTS_REQUEST:
    case types.NEW_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.GET_SINGLE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
        savePrice: 0,
        savePercent: 0,
      };
    case types.GET_ALL_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload.products,
        totalPageNum: action.payload.totalPages,
        loading: false,
      };
    case types.GET_SINGLE_PRODUCT_SUCCESS:
      let savePri =
        action.payload.product.price - action.payload.product.salePrice;
      let savePer = (savePri / action.payload.product.price) * 100;
      return {
        ...state,
        singleProduct: action.payload.product,
        loading: false,
        savePrice: savePri,
        savePercent: savePer,
      };
    case types.NEW_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case types.GET_ALL_PRODUCTS_FAILURE:
    case types.GET_SINGLE_PRODUCT_FAILURE:
    case types.NEW_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default productReducers;
