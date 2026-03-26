import { Trash2 } from "react-bootstrap-icons";
import { assets } from "../assets/assets";

const InvoiceForm = () => {
    return (
        <div className="invoiceform container py-4">
            {/* Company logo */}
            <div className="mb-4">
                <h5 className="d-flex align-item-center gap-3">
                    <label htmlFor="image" className="form-label">
                        <img src={assets.upload_area} alt="upload" width={98} />
                    </label>
                    <input type="file" name="logo" id="image" hidden className="form-control" accept="image" />
                </h5>
            </div>

            {/* Company info */}
            <div className="mb-4">
                <h5>Your Company </h5>
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

            {/* Bill to  */}
            <div className="mb-4">
                <h5>Bill To </h5>
                <div className="row g-3">
                    <div className="col-md-6">
                        <input type="text" className="form-control" placeholder=" Name" />
                    </div>
                    <div className="col-md-6">
                        <input type="text" className="form-control" placeholder=" phone number" />
                    </div>
                    <div className="col-md-12">
                        <input type="text" className="form-control" placeholder=" address" />
                    </div>
                </div>

            </div>
            {/* Ship to  */}
            <div className="mb-4">
                <div className="d-flex justify-content-between align-item-center mb-2">
                    <h5>Ship To </h5>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="sameAsBilling" />
                        <label className="form-check-label" htmlFor="sameAsBilling">
                            Same as billing address
                        </label>
                    </div>
                </div>

                <div className="row g-3">
                    <div className="col-md-6">
                        <input type="text" className="form-control" placeholder=" Name" />
                    </div>
                    <div className="col-md-6">
                        <input type="text" className="form-control" placeholder=" phone number" />
                    </div>
                    <div className="col-md-12">
                        <input type="text" className="form-control" placeholder="Shiping address" />
                    </div>
                </div>
            </div>
            {/* Invoice info */}
            <div className="mb-4">
                 <h5>Invoice Info </h5>
                <div className="row g-3">
                    <div className="col-md-4">
                        <label htmlFor="invoiceNumber" className="form-label">Invoice Number</label>
                        <input type="text" disabled className="form-control" placeholder=" Invoice Number" id="invoiceNumber"/>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="invoiceDate" className="form-label">Invoice Date</label>
                        <input type="date" className="form-control" />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="invoiceDueDate" className="form-label">Invoice Due Date</label>
                        <input type="date" className="form-control" id="invoiceDueDate" />
                    </div>
                </div>
            </div>
            {/* Item details */}
            <div className="mb-4">
                <h5>Item Details </h5>
                <div className="border rounded p-3 mv-3">
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
                        <textarea className="form-control" placeholder="Item description (optional)"></textarea>
                        <button className="btn btn-outline-danger" type="button">
                            <Trash2 size={18} />
                        </button>
                    </div>
                    <button className="btn btn-primary m-2" type="button">Add Item</button>
                </div>
            </div>
            {/* Bank account info */}
            <div className="mb-4">
                 <h5>Bank Account Details </h5>
                <div className="row g-3">
                    <div className="col-md-4">
                        <input type="text"  className="form-control" placeholder=" Account Holder Name" />
                    </div>
                    <div className="col-md-4">
                        <input type="text" className="form-control" placeholder=" Account Number" />
                    </div>
                    <div className="col-md-4">
                        <input type="text" className="form-control" placeholder="Branch/IFSC Code" />
                    </div>
                </div>
            </div>
            {/* totals */}
            <div className="mb-4">
                <h5>Totals </h5>
                <div className="d-flex justify-content-end">
                    <div className="w-100 w-md-50">
                        <div className="d-flex justify-content-between">
                            <span>Subtotal:</span>
                            <span>₹{0.00}</span>
                        </div>
                        <div className="d-flex justify-content-between align-items-center my-2">
                            <label htmlFor="taxInput" className="form-label">Tax Rate(%)</label>
                            <input type="number" className="form-control w-50 text-end" id="taxInput" placeholder="2%" />
                        </div>
                        <div className="d-flex justify-content-between ">
                            <span>Tax amount</span>
                            <span>₹{0.00}</span>
                        </div>
                        <div className="d-flex justify-content-between fw-bold mt-2">
                            <span>Grand Total:</span>
                            <span>₹{0.00}</span>
                        </div>
                    </div>
                </div>
            </div>
            {/* notes */}
            <div className="mb-4">
                <h5>Additional Notes </h5>
                <div className="w-100">
                    <textarea name="notes" className="form-control" rows={3} placeholder="Any additional notes or terms can be added here."></textarea>
                </div>
            </div>
        </div>
    )
}

export default InvoiceForm;