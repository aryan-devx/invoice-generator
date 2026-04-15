import { useContext, useEffect } from "react";
import { Trash2 } from "react-bootstrap-icons";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const InvoiceForm = () => {

  const { invoiceData, setInvoiceData } = useContext(AppContext);

  const addItem = () => {
    setInvoiceData(prevData => ({
      ...prevData,
      items: [...prevData.items, { name: "", quantity: "", price: "", description: "", total: "" }],
    }))
  }

  const deleteItem = (index) => {
    setInvoiceData(prevData => ({
      ...prevData,
      items: prevData.items.filter((_, i) => i !== index)
    }))
  }

  const handleChange = (section, field, value) => {
    setInvoiceData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  }

  const handleSameAsBilling = () => {
    setInvoiceData(prev => ({
      ...prev,
      shipping: prev.billing
    }))
    }

  const handleItemChange = (index, field, value) => {
    const items = [...invoiceData.items];
    items[index][field] = value;
    if (field === "quantity" || field === "price") {
      items[index].total = (items[index].quantity || 0) * (items[index].price || 0);
    }
    setInvoiceData(prev => ({
      ...prev,
      items
    }));
  }

  const calculateTotals = () => {
    const subtotal = invoiceData.items.reduce((sum, item) => sum + (item.total || 0), 0);
    const taxRate = Number(invoiceData.tax) || 0;
    const taxAmount = (subtotal * taxRate) / 100;
    const grandTotal = subtotal + taxAmount;
    return {subtotal, taxAmount, grandTotal};
  }

  const {subtotal, taxAmount, grandTotal} = calculateTotals();  

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => { 
        setInvoiceData(prev => ({
          ...prev,
          logo: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  }

  useEffect(() => {
    // Generate invoice number if not already set
    if (!invoiceData.invoice.number) {
      const randomNumber =`INV-${Math.floor(100000 + Math.random() * 900000)}`; 
      setInvoiceData(prev => ({
        ...prev,
        invoice: {
          ...prev.invoice,
          number: randomNumber
        }
      }));
    }
  }, [invoiceData.invoice.number, setInvoiceData]);







  // Safety check (prevents crash)
  if (!invoiceData) return null;

  return (
    <div className="invoiceform container py-4">

      {/* Company logo */}
      <div className="mb-4">
        <h5 className="d-flex align-items-center gap-3">
          <label htmlFor="image" className="form-label">
            <img src={invoiceData.logo ? invoiceData.logo : assets.upload_area} alt="upload" width={98} />
          </label>
          <input
            type="file"
            name="logo"
            id="image"
            hidden
            className="form-control"
            accept="image/*"
            onChange={handleLogoUpload}
          />
        </h5>
      </div>

      {/* Company info */}
      <div className="mb-4">
        <h5>Your Company</h5>
        <div className="row g-3">
          <div className="col-md-6">
            <input type="text"
              className="form-control"
              placeholder="Company Name"
              onChange={(e) => handleChange("company", "name", e.target.value)}
              value={invoiceData.company.name}
            />
          </div>
          <div className="col-md-6">
            <input type="text"
              className="form-control"
              placeholder="Company phone"
              onChange={(e) => handleChange("company", "phone", e.target.value)}
              value={invoiceData.company.phone}
            />
          </div>
          <div className="col-md-12">
            <input type="text"
              className="form-control"
              placeholder="Company address"
              onChange={(e) => handleChange("company", "address", e.target.value)}
              value={invoiceData.company.address}
            />
          </div>
        </div>
      </div>

      {/* Bill to */}
      <div className="mb-4">
        <h5>Bill To</h5>
        <div className="row g-3">
          <div className="col-md-6">
            <input type="text" 
                  className="form-control" 
                  placeholder="Name" 
                  onChange={(e) => handleChange("billing", "name", e.target.value)}
                  value={invoiceData.billing.name}
            />
          </div>
          <div className="col-md-6">
            <input type="text" 
                  className="form-control" 
                  placeholder="Phone number" 
                  onChange={(e) => handleChange("billing", "phone", e.target.value)}
                  value={invoiceData.billing.phone}
            />
          </div>
          <div className="col-md-12">
            <input type="text" 
                  className="form-control" 
                  placeholder="Address" 
                  onChange={(e) => handleChange("billing", "address", e.target.value)}
                  value={invoiceData.billing.address}
            />
          </div>
        </div>
      </div>

      {/* Ship to */}
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5>Ship To</h5>
          <div className="form-check">
            <input type="checkbox" className="form-check-input" id="sameAsBilling" 
                  onChange={handleSameAsBilling}
            />
            <label className="form-check-label" htmlFor="sameAsBilling">
              Same as billing address
            </label>
          </div>
        </div>

        <div className="row g-3">
          <div className="col-md-6">
            <input type="text" 
                  className="form-control" 
                  placeholder="Name" 
                  onChange={(e) => handleChange("shipping", "name", e.target.value)}
                  value={invoiceData.shipping.name}
            />
          </div>
          <div className="col-md-6">
            <input type="text" 
                  className="form-control" 
                  placeholder="Phone number" 
                  onChange={(e) => handleChange("shipping", "phone", e.target.value)}
                  value={invoiceData.shipping.phone}
            />
          </div>
          <div className="col-md-12">
            <input type="text" 
                  className="form-control" 
                  placeholder="Shipping address" 
                  onChange={(e) => handleChange("shipping", "address", e.target.value)}
                  value={invoiceData.shipping.address}
            />
          </div>
        </div>
      </div>

      {/* Invoice info */}
      <div className="mb-4">
        <h5>Invoice Info</h5>
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label">Invoice Number</label>
            <input type="text" 
                disabled 
                className="form-control"
                onChange={(e) => handleChange("invoice", "number", e.target.value)}
                value={invoiceData.invoice.number}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Invoice Date</label>
            <input type="date" 
                className="form-control" 
                onChange={(e) => handleChange("invoice", "date", e.target.value)}
                value={invoiceData.invoice.date}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Invoice Due Date</label>
            <input type="date" 
                className="form-control" 
                onChange={(e) => handleChange("invoice", "dueDate", e.target.value)}
                value={invoiceData.invoice.dueDate}
            />
          </div>
        </div>
      </div>

      {/* Item details */}
      <div className="mb-4">
        <h5>Item Details</h5>
        {invoiceData.items.map((item, index) => (
          <div key={index} className="border rounded p-3 my-3">
            <div className="row g-3 mb-2">
              <div className="col-md-3">
                <input type="text" 
                  className="form-control" 
                  placeholder="Item Name" 
                  onChange={(e) => handleItemChange(index, "name", e.target.value)}
                  value={typeof item.name === 'string' ? item.name : ''}
                />
              </div>
              <div className="col-md-3">
                <input type="number" 
                  className="form-control" 
                  placeholder="Quantity" 
                  onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                  value={item.quantity === 0 || item.quantity === "" || item.quantity === undefined ? "" : item.quantity}
                />    
              </div>
              <div className="col-md-3">
                <input type="number" 
                  className="form-control" 
                  placeholder="Price" 
                  onChange={(e) => handleItemChange(index, "price", e.target.value)}
                  value={item.price === 0 || item.price === "" || item.price === undefined ? "" : item.price}
                />
              </div>
              <div className="col-md-3">
                <input type="number" 
                  className="form-control" 
                  placeholder="Total" 
                  value={typeof item.total === 'string' ? item.total : item.total?.toString() || ''}
                  readOnly
                />
              </div>
            </div>

            <div className="d-flex gap-2">
              <textarea className="form-control" 
                placeholder="Item description (optional)" 
                onChange={(e) => handleItemChange(index, "description", e.target.value)}
                value={typeof item.description === 'string' ? item.description : ''}
              />

              {invoiceData.items.length > 1 && (
                <button className="btn btn-outline-danger" type="button" onClick={() => deleteItem(index)}>
                  <Trash2 size={18} />
                </button>
              )}
            </div>
          </div>
        ))}

        <button className="btn btn-primary m-2" type="button" onClick={addItem}>
          Add Item
        </button>
      </div>

      {/* Bank account details */}
      <div className="mb-4">
        <h5>Bank Account Details</h5>
        <div className="row g-3">
          <div className="col-md-4">
            <input type="text" 
              className="form-control" 
              placeholder="Account Name"
              onChange={(e) => handleChange("account", "name", e.target.value)}
              value={invoiceData.account.name}
            />
          </div>
          <div className="col-md-4">
            <input type="text" 
              className="form-control" 
              placeholder="Account Number" 
              onChange={(e) => handleChange("account", "number", e.target.value)}
              value={invoiceData.account.number}
            />
          </div>
          <div className="col-md-4">
            <input type="text" 
              className="form-control" 
              placeholder="IFSC Code" 
              onChange={(e) => handleChange("account", "ifsc", e.target.value)}
              value={invoiceData.account.ifsc}
            />
          </div>
        </div>
      </div>

      {/* Totals */}
      <div className="mb-4">
        <h5>Totals</h5>
        <div className="d-flex justify-content-end">
          <div className="w-100 w-md-50">
            <div className="d-flex justify-content-between">
              <span>Subtotal:</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>

            <div className="d-flex justify-content-between align-items-center my-2">
              <label className="form-label">Tax Rate (%)</label>
              <input type="number" 
                className="form-control w-50 text-end" 
                placeholder="2%" 
                onChange={(e) => setInvoiceData(prev => ({
                  ...prev,
                  tax: e.target.value
                }))}
                value={invoiceData.tax} 
              />
            </div>

            <div className="d-flex justify-content-between">
              <span>Tax amount</span>
              <span>₹{taxAmount.toFixed(2)}</span>
            </div>

            <div className="d-flex justify-content-between fw-bold mt-2">
              <span>Grand Total:</span>
              <span>₹{grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="mb-4">
        <h5>Additional Notes</h5>
        <textarea className="form-control" 
            rows={3} 
            placeholder="Add notes..."
            onChange={(e) => setInvoiceData(prev => ({
              ...prev,
              notes: e.target.value
            }))}
            value={invoiceData.notes}
        />
      </div>
    </div>
  );
};

export default InvoiceForm;