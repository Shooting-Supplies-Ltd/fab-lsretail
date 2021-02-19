import axios from 'axios'
import refreshToken from './refreshToken'
import rateLimit from 'axios-rate-limit';

async function getHeader() {
  let token = await refreshToken()

  const header = {
    Authorization: `Bearer ${token}`,
  };

  const axiosConfig = {
    baseURL: `https://api.lightspeedapp.com/API/Account/${process.env.ACCOUNT_ID}/`,
    headers: header
  }

  return axiosConfig
}

const http = rateLimit(axios.create(), { maxRequests: 1, perMilliseconds: 2000, maxRPS: 1 })

export async function getDelivery() {
  let axiosConfig = await getHeader()
  return http.get(`Item.json?itemID=7051&load_relations=["Category", "Images", "ItemShops", "ItemECommerce"]`, axiosConfig).catch(err => console.error(err.data))
}

export async function getItems() {
  let axiosConfig = await getHeader()
  return http.get(`Item.json?manufacturerID=55&load_relations=["Category", "Images", "ItemShops", "ItemECommerce"]`, axiosConfig).catch(err => console.error(err.data))
}

export async function getItem(itemID) {
  let axiosConfig = await getHeader()
  return http.get(`Item/${itemID}.json?load_relations=["Category", "Images", "ItemShops", "CustomFieldValues", "ItemECommerce"]`, axiosConfig).catch(err => console.error(err.data))
}

export async function getMatrixItems() {
  let axiosConfig = await getHeader()
  return http.get(`ItemMatrix.json?manufacturerID=55&load_relations=["Category", "Images", "Items", "ItemECommerce"]`, axiosConfig)
  .catch(err => console.error(err.data))
}

export async function getMatrixItem(itemID) {
  let axiosConfig = await getHeader()
  return http.get(`ItemMatrix/${itemID}.json?load_relations=["Category", "Images", "Items", "ItemECommerce"]`, axiosConfig).catch(err => console.error(err.data))
}

export async function createSale(newSale) {
  let axiosConfig = await getHeader()
  return http.post(`Sale.json`, newSale, axiosConfig).catch(error => console.error(error.data).then(res => { return res })).catch(err => console.error(err.data))
}

export async function getCategories(categoryID) {
  let axiosConfig = await getHeader()
  return http.get(`Category.json?categoryID=IN,${categoryID}&orderby=name`, axiosConfig).catch(err => console.error(err.data))
}