import { useRef, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { templates } from "../assets/assets";
import InvoicePreview from "../components/InvoicePreview";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { saveInvoice } from "../service/invoiceService";
import html2canvas from "html2canvas";
import { uploadInvoiceThumbnail } from "../service/cloudnaryService";

const PreviewPage = () => {
    const previewRef = useRef();
    const { selectedTemplate, invoiceData, setSelectedTemplate, baseURL } = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSaveAndExit = async () => {
        try {
            setLoading(true);
            const canvas = await html2canvas(previewRef.current, {
                scale: 2,
                useCORS: true,
                backgroundColor: "#fff",
                scrollY: -window.scrollY
            });
            const imageData = canvas.toDataURL("image/png");
            const thumbnailURL = await uploadInvoiceThumbnail(imageData);
            const payload = {
                ...invoiceData,
                thumbnailURL,
                template: selectedTemplate,
            }
            const response = await saveInvoice(baseURL, payload);
            if (response.status === 200) {
                toast.success("Invoice saved successfully!");
                navigate("/dashboard");
            } else {
                toast.error("Failed to save invoice");
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to save invoice", error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="previewpage container-fluid d-flex flex-column p-3 min-vh-100">

            {/* Action button */}
            <div className="d-flex flex-column align-items-center mb-4 gap-3">


                {/* list of template buttons */}
                <div className="d-flex gap-2 flex-wrap justify-content-center">
                    {templates.map(({ id, label }) => (
                        <button
                            key={id}
                            style={{ minWidth: "100px", height: "38px" }}
                            onClick={() => setSelectedTemplate(id)}
                            className={`btn btn-sm rounded-pill p-2 ${selectedTemplate === id ? 'btn-warning' : 'btn-outline-secondary'}`}>
                            {label}
                        </button>
                    ))}
                </div>

                {/* List of action buttons */}
                <div className="d-flex flex-wrap justify-content-center gap-2">
                    <button className="btn btn-primary d-flex align-items-center justify-content-center"
                        onClick={handleSaveAndExit}
                        disabled={loading}>
                        {loading && <Loader2 className="spin-animation me-2" size={18} />}
                        {loading ? "Saving..." : "Save and Exit"}
                    </button>
                    <button className="btn btn-danger ">Delete Invoice</button>
                    <button className="btn btn-secondary">Back to Dashboard</button>
                    <button className="btn btn-info">Send Email</button> 
                    <button className="btn btn-success d-flex align-items-center justify-content-center">Download PDF</button>
                </div>
            </div>
            {/* Display the invoice preview */}
            <div className="flex-grow-1 overflow-auto d-flex justify-content-center align-items-start bg-light py-3">
                <div ref={previewRef} className="invoice-preview">
                    <InvoicePreview invoiceData={invoiceData} template={selectedTemplate} />
                </div>
            </div>
        </div>
    )
}
export default PreviewPage;