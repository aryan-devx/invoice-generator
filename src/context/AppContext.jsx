import {createContext} from "react";
import { useState } from "react";



export const AppContext = createContext();

export const initialInvoiceData = {
    invoiceTitle: "New Invoice",
    billing: {name: "", address: "", phone: ""},
    shipping: {name: "", address: "", phone: ""},
    invoice: {number: "", date: "", dueDate: ""},
    account: {name: "", number: "", ifsc: ""},
    company: {name: "", phone: "", address: ""},
    tax: 0,
    notes: "",
    items: [
      {name: "", quantity: "", price: "", description: "", total: ""},
    ],
    logo: ""
};




export const AppContextProvider = ({ children }) => {

  const [invoiceTitle, setInvoiceTitle] = useState("New Invoice");
  const [invoiceData, setInvoiceData] = useState(initialInvoiceData);
  const [selectedTemplate, setSelectedTemplate] = useState("template1");

  const baseURL = "http://localhost:8080/api";



  const contextValue = {
    invoiceTitle,
    setInvoiceTitle,
    invoiceData,
    setInvoiceData,
    selectedTemplate,
    setSelectedTemplate,
    initialInvoiceData,
    baseURL,
  }

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  )
}