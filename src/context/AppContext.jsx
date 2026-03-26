import {createContext} from "react";
import { useState } from "react";



export const AppContext = createContext();

export const initialInvoiceData = {
    invoiceTitle: "New Invoice",
    billing: {name: "", address: "", phone: ""},
    shipping: {name: "", address: "", phone: ""},
    invoice: {number: "", date: "", dueDate: ""},
    account: {name: "", number: "", ifsc: ""},
    company: {name: "", number: "", address: ""},
    tax: 0,
    notes: "",
    items: [
        {name: "", quantity: 1, price: 0, description: "", total: 0},
    ],
    logo: ""
};




export const AppContextProvider = ({ children }) => {

  const [invoiceTitle, setInvoiceTitle] = useState("New Invoice");
  const [invoiceData, setInvoiceData] = useState(initialInvoiceData);
  const [selectedTemplate, setSelectedTemplate] = useState("template1");



  const contextValue = {
    invoiceTitle,
    setInvoiceTitle,
    invoiceData,
    setInvoiceData,
    selectedTemplate,
    setSelectedTemplate,
    initialInvoiceData,
  }

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  )
}