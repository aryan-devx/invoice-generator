import { useRef, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, useUser } from "@clerk/clerk-react";
import { AppContext } from "../context/AppContext";
import { templates } from "../assets/assets";
import InvoicePreview from "../components/InvoicePreview";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { deleteInvoice, saveInvoice, sendInvoice } from "../service/invoiceService";
import html2canvas from "html2canvas";
import { uploadInvoiceThumbnail } from "../service/cloudnaryService";
import { generatedPdfFromElement } from "../util/pdfUtils";

const PreviewPage = () => {
    const previewRef = useRef();
    const { selectedTemplate, invoiceData, setSelectedTemplate, baseURL } = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const invoiceId = invoiceData?._id || invoiceData?.id;
    const [downloading, setDownloading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [customerEmail, setCustomerEmail] = useState("");
    const [emailing, setEmailing] = useState(false);
    const {getToken} = useAuth();
    const {user} = useUser();

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
            const thumbnailUrl = await uploadInvoiceThumbnail(imageData);
            const payload = {
                ...invoiceData,
                clerkId: user.id,
                thumbnailUrl,
                template: selectedTemplate,
            }

            const token = await getToken();
            if (!token) {
                toast.error("Authentication token is missing. Please sign in again.");
                return;
            }
            const response = await saveInvoice(baseURL, payload, token);
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

    const handleDelete = async () => {
        if (!invoiceId) {
            toast.error("Invoice ID is missing. Please open the invoice from dashboard and try again.");
            return;
        }

        try {
            setLoading(true);
            const token = await getToken();
            if (!token) {
                toast.error("Authentication token is missing. Please sign in again.");
                return;
            }
            const response = await deleteInvoice(baseURL, invoiceId, token);
            if (response.status >= 200 && response.status < 300) {
                toast.success("Invoice deleted successfully!");
                navigate("/dashboard");
            } else {
                toast.error("Failed to delete invoice");
            }
        } catch (error) {
            const message = error?.response?.data?.message || error?.message || "Failed to delete invoice";
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = async () => {
        if (!previewRef.current) return;
        try {
            setDownloading(true);   
            await generatedPdfFromElement(previewRef.current, `invoice_${Date.now()}.pdf`);
        } catch (error) {
            toast.error("Failed to download PDF", error.message);
        } finally {
            setDownloading(false);
        }
    }

    const handleSendEmail = async () => {
        if (!previewRef.current || !customerEmail) {
            toast.error("Please enter a valid email address");
        }

        try {
            setEmailing(true);
            const pdfBlob = await generatedPdfFromElement(previewRef.current, `invoice_${Date.now()}.pdf`, true);
            const formData = new FormData();
            formData.append("file", pdfBlob, `invoice_${Date.now()}.pdf`);
            formData.append("email", customerEmail);
            if (invoiceId) {
                formData.append("invoiceId", invoiceId);
            }

            const token = await getToken();
            if (!token) {
                toast.error("Authentication token is missing. Please sign in again.");
                return;
            }
            const response = await sendInvoice(baseURL, formData, token);
            if (response.status === 200) {
                toast.success("Invoice sent successfully!");
                setShowModal(false);
                setCustomerEmail("");
            } else {
                toast.error("Failed to send invoice");
            }
        } catch (error) {
            const message = error?.response?.data?.message || error?.message || "Failed to send invoice";
            toast.error(message);
        } finally {
            setEmailing(false);
        }
    };

    useEffect(() => {
        if (!invoiceData || !Array.isArray(invoiceData.items) || invoiceData.items.length === 0) {
            toast.error("No invoice data found. Please create an invoice from dashboard.");
            navigate("/dashboard");
        }
    }, [invoiceData, navigate]);



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
                    {invoiceId && <button className="btn btn-danger " onClick={handleDelete} disabled={loading}>
                        Delete Invoice
                    </button>}
                    <button className="btn btn-secondary" onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
                    {/* <button className="btn btn-info" onClick={() => setShowModal(true)}>Send Email</button> */}
                    <button className="btn btn-success d-flex align-items-center justify-content-center" disabled={downloading} onClick={handleDownload}>
                        {downloading && <Loader2 className="spin-animation me-2" size={18} />}
                        {downloading ? "Downloading..." : "Download PDF"}</button>
                </div>
            </div>
            {/* Display the invoice preview */}
            <div className="flex-grow-1 overflow-auto d-flex justify-content-center align-items-start bg-light py-3">
                <div ref={previewRef} className="invoice-preview">
                    <InvoicePreview invoiceData={invoiceData} template={selectedTemplate} />
                </div>
            </div>

                {showModal && (
                    <div className="modal d-block" tabIndex="-1" role="dialog" style={{backgroundColor: "rgba(0,0,0,0.5)"}}>
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Send Invoice</h5>
                                    <button type="button" className="btn-close" onClick={() => setShowModal(false)}>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <input type="email" className="form-control" placeholder="Enter recipient email" onChange={(e) => setCustomerEmail(e.target.value)} value={customerEmail}
                                     />
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-primary" onClick={handleSendEmail} disabled={emailing}>
                                        {emailing ? "Sending..." : "Send"}
                                    </button>
                                    <button type="button" className="btn btn-secondary" onClick={()=> setShowModal(false)}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

        </div>
    )
}
export default PreviewPage;