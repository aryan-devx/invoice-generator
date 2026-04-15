import axios from "axios";

export const saveInvoice = (baseURL, payload, token) => {
  return axios.post(`${baseURL}/invoice`, payload, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

export const getAllInvoices = (baseURL, token) => {
  return axios.get(`${baseURL}/invoice`, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

export const deleteInvoice = (baseURL, id, token) => {
  return axios.delete(`${baseURL}/invoice/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

export const sendInvoice  = (baseURL, formData, token) => {
  return axios.post(`${baseURL}/invoice/sendinvoice`, formData, {
    headers: { Authorization: `Bearer ${token}` }
  });
}