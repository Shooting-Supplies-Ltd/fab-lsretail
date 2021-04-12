// @ts-check
import axios from 'axios';
import rateLimit from 'axios-rate-limit';
import { refreshToken } from './refreshToken';

async function getHeader() {
  const token = await refreshToken();

  const header = {
    Authorization: `Bearer ${token}`,
  };

  const axiosConfig = {
    baseURL: `https://api.lightspeedapp.com/API/Account/${process.env.ACCOUNT_ID}/`,
    headers: header,
  };

  return axiosConfig;
}

const http = rateLimit(axios.create(), { maxRequests: 1, perMilliseconds: 2000, maxRPS: 1 });

export async function getDelivery() {
  const axiosConfig = await getHeader();
  return http
    .get(`Item.json?itemID=7051&load_relations=["Category", "Images", "ItemShops", "ItemECommerce"]`, axiosConfig)
    .catch((err) => console.error(err.data));
}

export async function getItems() {
  const axiosConfig = await getHeader();
  const items = await http
    .get(
      `Item.json?manufacturerID=55&load_relations=["Category", "Images", "ItemShops", "ItemECommerce"]&ItemECommerce.listOnStore=true`,
      axiosConfig
    )
    .catch((err) => console.error(err.data));
  return items;
}

export async function getItem(itemID) {
  const axiosConfig = await getHeader();
  const item = await http
    .get(
      `Item/${itemID}.json?load_relations=["Category", "Images", "ItemShops", "CustomFieldValues", "ItemECommerce"]`,
      axiosConfig
    )
    .catch((err) => console.error(err.data));
  return item;
}

export async function getMatrixItems() {
  const axiosConfig = await getHeader();
  const matrixItems = await http
    .get(
      `ItemMatrix.json?manufacturerID=55&load_relations=["Category", "Images", "Items", "ItemECommerce"]&ItemECommerce.listOnStore=true`,
      axiosConfig
    )
    .catch((err) => console.error(err.data));
  return matrixItems;
}

export async function getMatrixItem(itemID) {
  const axiosConfig = await getHeader();
  const matrixItem = await http
    .get(`ItemMatrix/${itemID}.json?load_relations=["Category", "Images", "Items", "ItemECommerce"]`, axiosConfig)
    .catch((err) => console.error(err.data));
  return matrixItem;
}

export async function createSale(newSale) {
  const axiosConfig = await getHeader();
  return http
    .post(`Sale.json`, newSale, axiosConfig)
    .catch((error) => console.error(error.data).then((res) => res))
    .catch((err) => console.error(err.data));
}

export async function getCategories(categoryID) {
  const axiosConfig = await getHeader();
  return http
    .get(`Category.json?categoryID=IN,${categoryID}&orderby=name`, axiosConfig)
    .catch((err) => console.error(err.data));
}
