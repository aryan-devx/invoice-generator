import { useContext } from "react";
import { Trash2 } from "react-bootstrap-icons";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const InvoiceForm = () => {

  const { invoiceData, setInvoiceData } = useContext(AppContext);

  const addItem = () => {
    setInvoiceData(prevData => ({
      ...prevData,
      items: [...prevData.items, {name: "", quantity: 1, price: 0, description: "", total: 0},
      ]
    }))
  }

  const deleteItem = (index) => {
    setInvoiceData(prevData => ({
      ...prevData,
      items: prevData.items.filter((_, i) => i !== index)
    }))
  }



  // Safety check (prevents crash)
  if (!invoiceData) return null;

  return (
    <div className="invoiceform container py-4">

      {/* Company logo */}
      <div className="mb-4">
        <h5 className="d-flex align-items-center gap-3">
          <label htmlFor="image" className="form-label">
            <img src={assets.upload_area} alt="upload" width={98} />
          </label>
          <input 
            type="file" 
            name="logo" 
            id="image" 
            hidden 
            className="form-control" 
            accept="image/*" 
          />
        </h5>
      </div>

      {/* Company info */}
      <div className="mb-4">
        <h5>Your Company</h5>
        <div className="row g-3">
          <div className="col-md-6">
            <input type="text" className="form-control" placeholder="Company Name" />
          </div>
          <div className="col-md-6">
            <input type="text" className="form-control" placeholder="Company phone" />
          </div>
          <div className="col-md-12">
            <input type="text" className="form-control" placeholder="Company address" />
          </div>
        </div>
      </div>

      {/* Bill to */}
      <div className="mb-4">
        <h5>Bill To</h5>
        <div className="row g-3">
          <div className="col-md-6">
            <input type="text" className="form-control" placeholder="Name" />
          </div>
          <div className="col-md-6">
            <input type="text" className="form-control" placeholder="Phone number" />
          </div>
          <div className="col-md-12">
            <input type="text" className="form-control" placeholder="Address" />
          </div>
        </div>
      </div>

      {/* Ship to */}
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5>Ship To</h5>
          <div className="form-check">
            <input type="checkbox" className="form-check-input" id="sameAsBilling" />
            <label className="form-check-label" htmlFor="sameAsBilling">
              Same as billing address
            </label>
          </div>
        </div>

        <div className="row g-3">
          <div className="col-md-6">
            <input type="text" className="form-control" placeholder="Name" />
          </div>
          <div className="col-md-6">
            <input type="text" className="form-control" placeholder="Phone number" />
          </div>
          <div className="col-md-12">
            <input type="text" className="form-control" placeholder="Shipping address" />
          </div>
        </div>
      </div>

      {/* Invoice info */}
      <div className="mb-4">
        <h5>Invoice Info</h5>
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label">Invoice Number</label>
            <input type="text" disabled className="form-control" placeholder="Invoice Number" />
          </div>
          <div className="col-md-4">
            <label className="form-label">Invoice Date</label>
            <input type="date" className="form-control" />
          </div>
          <div className="col-md-4">
            <label className="form-label">Invoice Due Date</label>
            <input type="date" className="form-control" />
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
                <input type="text" className="form-control" placeholder="Item Name" />
              </div>
              <div className="col-md-3">
                <input type="number" className="form-control" placeholder="Quantity" />
              </div>
              <div className="col-md-3">
                <input type="number" className="form-control" placeholder="Price" />
              </div>
              <div className="col-md-3">
                <input type="number" className="form-control" placeholder="Total" />
              </div>
            </div>

            <div className="d-flex gap-2">
              <textarea className="form-control" placeholder="Item description (optional)" />

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

      {/* Totals */}
      <div className="mb-4">
        <h5>Totals</h5>
        <div className="d-flex justify-content-end">
          <div className="w-100 w-md-50">
            <div className="d-flex justify-content-between">
              <span>Subtotal:</span>
              <span>₹0.00</span>
            </div>

            <div className="d-flex justify-content-between align-items-center my-2">
              <label className="form-label">Tax Rate (%)</label>
              <input type="number" className="form-control w-50 text-end" placeholder="2%" />
            </div>

            <div className="d-flex justify-content-between">
              <span>Tax amount</span>
              <span>₹0.00</span>
            </div>

            <div className="d-flex justify-content-between fw-bold mt-2">
              <span>Grand Total:</span>
              <span>₹0.00</span>
            </div>
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="mb-4">
        <h5>Additional Notes</h5>
        <textarea className="form-control" rows={3} placeholder="Add notes..." />
      </div>
    </div>
  );
};

export default InvoiceForm;