import './Template5.css';

const Template5 = ({ data }) => {
	return (
		<div className="template5 border rounded mx-auto my-4 px-sm-4 py-4 w-100">
			<div className="template5-header row g-3 align-items-start mb-4">
				<div className="col-md-8">
					<div className="d-flex align-items-start gap-3">
						{data.companyLogo && (
							<div className="logo-wrap">
								<img src={data.companyLogo} alt="Company Logo" width={72} />
							</div>
						)}

						<div>
							<h2 className="company-name mb-1">{data.companyName}</h2>
							<p className="mb-1 company-address">{data.companyAddress}</p>
							<p className="mb-0 company-contact">{data.companyNumber}</p>
						</div>
					</div>
				</div>

				<div className="col-md-4 text-md-end invoice-meta">
					<h1 className="invoice-title mb-2">INVOICE</h1>
					<p className="mb-1"><strong>Invoice No:</strong> {data.invoiceNumber}</p>
					<p className="mb-1"><strong>Invoice Date:</strong> {data.invoiceDate}</p>
					<p className="mb-0"><strong>Due Date:</strong> {data.paymentDate}</p>
				</div>
			</div>

			<div className="row g-3 mb-4 billing-section">
				<div className="col-md-6">
					<div className="info-card h-100 p-3 rounded">
						<h3 className="section-title mb-3">Bill To</h3>
						<p className="mb-1"><strong>{data.billingName}</strong></p>
						<p className="mb-1">{data.billingAddress}</p>
						<p className="mb-0">{data.billingPhone}</p>
					</div>
				</div>

				<div className="col-md-6">
					<div className="info-card h-100 p-3 rounded">
						<h3 className="section-title mb-3">Ship To</h3>
						{data.shippingName ? <p className="mb-1"><strong>{data.shippingName}</strong></p> : null}
						{data.shippingAddress ? <p className="mb-1">{data.shippingAddress}</p> : null}
						{data.shippingPhone ? <p className="mb-0">{data.shippingPhone}</p> : null}
					</div>
				</div>
			</div>

			<div className="table-responsive mb-4">
				<table className="table template5-table mb-0">
					<thead>
						<tr>
							<th>Item & Description</th>
							<th className="text-center">Quantity</th>
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
									<td>
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

			<div className="row g-3 align-items-start mb-4">
				<div className="col-md-6">
					{data.notes && (
						<div className="notes-block">
							<h3 className="section-title mb-2">Notes</h3>
							<p className="mb-0">{data.notes}</p>
						</div>
					)}
				</div>

				<div className="col-md-6 ms-md-auto">
					<div className="summary-block ms-md-auto">
						<div className="summary-row d-flex justify-content-between mb-2">
							<span>Subtotal</span>
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
		</div>
	);
};

export default Template5;
