import { forwardRef } from "react";
// import Template1 from "../templates/Template1/Template1";
import { formatInvoiceData } from "../util/formateInvoiveData";
import { templateComponents } from "../util/invoiceTemplate";

const InvoicePreview = forwardRef(({ invoiceData, template }, ref) => {
    const formattedData = formatInvoiceData(invoiceData);

    const SelectedTemplate = templateComponents[template] || templateComponents['template1'];


    return (
        <div ref={ref} className="invoice-preview container px-2 py-2 overflow-x-auto">
            <SelectedTemplate data={formattedData} />
        </div>
    );
});

export default InvoicePreview;