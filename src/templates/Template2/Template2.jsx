import './Template2.css';

const Template2 = ({ data }) => {
    if (!data) return <div>Loading...</div>;
    
    return (
        <div className="template2 border-0 rounded mx-auto my-4 px-sm-4 py-3 w-100">
            {/* Header section */}
            <div className="row mb-4">
                <div className="col-md-6 mb-3 mb-md-0">
                    {data.companyLogo && (
                        <div className="mb-3">
                            <img src={data.companyLogo} alt="Company Logo" width={98} />
                        </div>
                    )}
                    <h2 className="mb-2 company-title">{data.companyName}</h2>
                    <p className="mb-1 text-muted">{data.companyAddress}</p>
                    <p className="mb-0 text-muted">
                        <strong>Phone:</strong> {data.companyNumber}
                    </p>
                </div>
                <div className="col-md-6 text-start text-md-end">
                    <h1 className="invoice-title mb-3">Invoice</h1>
                    <div className="invoice-meta">
                        <p className="mb-2">
                            <strong>Invoice#:</strong> <span className="fw-bold">{data.invoiceNumber}</span>
                        </p>
                        <p className="mb-2">
                            <strong>Invoice Date:</strong> {data.invoiceDate}
                        </p>
                        <p className="mb-0">
                            <strong>Due Date:</strong> {data.paymentDate}
                        </p>
                    </div>
                </div>
            </div>
            <hr className="my-4 orange-border" />

            {/* Billing section */}
            <div className="row g-3 mb-4">
                {data.shippingName && data.shippingPhone && data.shippingAddress && (
                    <div className="col-md-6">
                        <div className="p-3 rounded h-100 billing-box">
                            <h5 className="mb-3 billing-title">Shipped To</h5>
                            <p className="mb-2">
                                <strong>{data.shippingName}</strong>
                            </p>
                            <p className="mb-2">{data.shippingAddress}</p>
                            <p className="mb-0">
                                <strong>Phone:</strong> {data.shippingPhone}
                            </p>
                        </div>
                    </div>
                )}

                <div className="col-md-6">
                    <div className="p-3 rounded h-100 billing-box">
                        <h5 className="mb-3 billing-title">Billed To</h5>
                        <p className="mb-2">
                            <strong>{data.billingName}</strong>
                        </p>
                        <p className="mb-2">{data.billingAddress}</p>
                        <p className="mb-0">
                            <strong>Phone:</strong> {data.billingPhone}
                        </p>
                    </div>
                </div>
            </div>

            {/* Items section */}
            <div className="mb-4">
                <div className="table-responsive">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th className="p-3 table-header">Item Description</th>
                                <th className="p-3 text-center table-header">Qty</th>
                                <th className="p-3 text-end table-header">Rate</th>
                                <th className="p-3 text-end table-header">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.items && data.items.length > 0 ? (
                                data.items.map((item, index) => {
                                    const qty = Number(item.quantity) || 0;
                                    const price = Number(item.price) || 0;
                                    const amount = Number(item.total || qty * price || 0);
                                    return (
                                        <tr key={index}>
                                            <td className="p-3">
                                                <strong>{item.name}</strong>
                                                {item.description && (
                                                    <div className="text-muted small mt-1">{item.description}</div>
                                                )}
                                            </td>
                                            <td className="p-3 text-center">{qty}</td>
                                            <td className="p-3 text-end">{data.currencySymbol}{price.toFixed(2)}</td>
                                            <td className="p-3 text-end fw-bold">{data.currencySymbol}{amount.toFixed(2)}</td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="4" className="p-3 text-center text-muted">No items added</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Totals section */}
            <div className="mb-4">
                <div className="d-flex justify-content-end">
                    <div className="p-4 totals-box" style={{ width: "320px" }}>
                        <div className="d-flex justify-content-between mb-3 pb-2 border-bottom">
                            <span>Subtotal:</span>
                            <span>{data.currencySymbol}{data.subtotal.toFixed(2)}</span>
                        </div>

                        {data.tax > 0 && (
                            <div className="d-flex justify-content-between mb-3 pb-2 border-bottom">
                                <span>Tax ({data.tax}%):</span>
                                <span>{data.currencySymbol}{data.taxAmount.toFixed(2)}</span>
                            </div>
                        )}

                        <div className="d-flex justify-content-between total-highlight mt-3">
                            <span>Total:</span>
                            <span className="fw-bold">{data.currencySymbol}{data.total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bank account section */}
            {(data.accountName || data.accountNumber || data.accountIFSC) && (
                <div className="mb-4 p-3 rounded" style={{ backgroundColor: '#f3f4f6' }}>
                    <h5 className="mb-3 billing-title">Bank Account Details</h5>
                    <div className="row g-3">
                        {data.accountName && (
                            <div className="col-md-4">
                                <p className="text-muted small mb-1">Account Holder</p>
                                <p className="mb-0 fw-bold">{data.accountName}</p>
                            </div>
                        )}
                        {data.accountNumber && (
                            <div className="col-md-4">
                                <p className="text-muted small mb-1">Account Number</p>
                                <p className="mb-0 fw-bold">{data.accountNumber}</p>
                            </div>
                        )}
                        {data.accountIFSC && (
                            <div className="col-md-4">
                                <p className="text-muted small mb-1">IFSC Code</p>
                                <p className="mb-0 fw-bold">{data.accountIFSC}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Notes section */}
            {data.notes && (
                <div className="mb-4">
                    <h5 className="mb-2 billing-title">Remarks</h5>
                    <p className="text-muted mb-0">{data.notes}</p>
                </div>
            )}

            {/* Footer */}
            <hr className="my-4 orange-border" />
            <div className="text-center text-muted small">
                <p className="mb-0">Thank you for your business!</p>
            </div>
        </div>
    );
};

export default Template2;