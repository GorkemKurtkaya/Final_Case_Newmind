import axios from "axios";

export const fetchProducts = () => {
  return axios.get("http://localhost:3000/product/");
};

export const fetchProduct = (id) => {
  return axios.get(`http://localhost:3000/product/find/${id}`);
};
