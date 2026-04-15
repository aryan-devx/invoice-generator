import './Template4.css';


const Template4 = ({ data }) => {
    return (
        <div className="template4 border rounded mx-auto my-4 px-sm-4 py-4 w-100">
            <div className="template4-header d-flex flex-column flex-md-row justify-content-between align-items-start gap-3 mb-4">
                <div className="template4-brand">
                    {data.companyLogo && (
                        <div className="logo-wrap mb-3">
                            <img src={data.companyLogo} alt="Company Logo" width={90} />
                        </div>
                    )}
                    <h2 className="company-name mb-1">{data.companyName}</h2>
                    <p className="mb-1 company-address">{data.companyAddress}</p>
                    <p className="mb-0 company-contact">{data.companyNumber}</p>
                </div>

                <div className="invoice-meta text-md-end">
                    <div className="invoice-label">Invoice</div>
                    <p className="mb-1">
                        <strong>Invoice #:</strong> {data.invoiceNumber}
                    </p>
                    <p className="mb-1">
                        <strong>Invoice Date:</strong> {data.invoiceDate}
                    </p>
                    <p className="mb-0">
                        <strong>Due Date:</strong> {data.paymentDate}
                    </p>
                </div>
            </div>

            <div className="row g-3 mb-4">
                <div className="col-md-6">
                    <div className="detail-card p-3 rounded">
                        <h3 className="detail-title mb-2">Billed To</h3>
                        <p className="mb-1"><strong>{data.billingName}</strong></p>
                        <p className="mb-1">{data.billingAddress}</p>
                        <p className="mb-0">{data.billingPhone}</p>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="detail-card p-3 rounded">
                        <h3 className="detail-title mb-2">Shipped To</h3>
                        <p className="mb-1"><strong>{data.shippingName}</strong></p>
                        <p className="mb-1">{data.shippingAddress}</p>
                        <p className="mb-0">{data.shippingPhone}</p>
                    </div>
                </div>
            </div>

            <div className="table-responsive mb-4">
                <table className="table invoice-table">
                    <thead>
                        <tr>
                            <th>Item & Description</th>
                            <th className="text-center">Qty.</th>
                            <th className="text-end">Rate</th>
                            <th className="text-end">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.items.map((item, index) => {
                            const qty = Number(item.quantity) || 0;
                            const price = Number(item.price) || 0;
                            const amount = Number(item.total || qty * price || 0);
                            return (
                                <tr key={index}>
                                    <td className="description-cell">
                                        <div className="item-name">{item.name}</div>
                                        {item.description && <div className="item-desc">{item.description}</div>}
                                    </td>
                                    <td className="text-center">{qty}</td>
                                    <td className="text-end">{data.currencySymbol}{price.toFixed(2)}</td>
                                    <td className="text-end">{data.currencySymbol}{amount.toFixed(2)}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <div className="row g-3 align-items-end">
                <div className="col-md-6">
                    {data.notes && (
                        <div className="notes-card p-3 rounded">
                            <h3 className="notes-title mb-2">Note</h3>
                            <p className="mb-0">{data.notes}</p>
                        </div>
                    )}
                </div>
                <div className="col-md-6">
                    <div className="summary-card p-3 rounded">
                        <div className="summary-row d-flex justify-content-between mb-2">
                            <span>Sub Total</span>
                            <span>{data.currencySymbol}{data.subtotal.toFixed(2)}</span>
                        </div>
                        {data.tax > 0 && (
                            <div className="summary-row d-flex justify-content-between mb-2">
                                <span>Tax ({data.tax}%)</span>
                                <span>{data.currencySymbol}{data.taxAmount.toFixed(2)}</span>
                            </div>
                        )}
                        <div className="summary-row total-row d-flex justify-content-between">
                            <span>Total</span>
                            <span>{data.currencySymbol}{data.total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="thankyou-note mt-4 text-center">Thank you for your business.</div>
        </div>
    );
};

export default Template4;