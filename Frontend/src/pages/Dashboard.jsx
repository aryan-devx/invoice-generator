import { useContext, useEffect, useState } from "react";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { AppContext, initialInvoiceData } from "../context/AppContext";
import { getAllInvoices } from "../service/invoiceService";
import { formatDate } from "../util/formateInvoiveData";

const Dashboard = () => {

    const [invoices, setInvoices] = useState([]);
    const navigate = useNavigate();
    const {baseURL, setInvoiceData, setSelectedTemplate, setInvoiceTitle} = useContext(AppContext);

const { getToken, isLoaded, isSignedIn } = useAuth();

useEffect(() => {
    if (!isLoaded || !isSignedIn) return;

    const fetchInvoices = async () => {
        try {
            const token = await getToken();
            console.log("TOKEN:", token); // for debugging

            const response = await getAllInvoices(baseURL, token);
            setInvoices(response.data);
        } catch (error) {
            console.error(error);
            toast.error("Error fetching invoices");
        }
    };

    fetchInvoices();
}, [baseURL, isLoaded, isSignedIn]);

    const handleViewClick = (invoice) => {
        setInvoiceData(invoice);
        setSelectedTemplate(invoice.template || "template1");
        setInvoiceTitle(invoice.title || "Untitled Invoice");
        navigate('/preview');
    }

    const handleCreateNew = () => {
        setInvoiceData(initialInvoiceData);
        setSelectedTemplate("template1");
        setInvoiceTitle("Untitled Invoice");
        navigate('/generate');
    }

    return (
        <div className="container py-5">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md row-cols-lg-5">
                {/* Create New Invoice Card */}
                <div className="col">
                    <div className="card h-100">
                        <div onClick={handleCreateNew} className="card h-100 d-flex flex-column justify-content-center align-items-center border-2 border-light shadow-sm coursor-pointer " style={{minHeight: '270px'}}>
                            <Plus size={48} />
                            <p className="mt-3 fw-medium">Create New Invoice</p>
                        </div>
                    </div>
                </div>

                {/* Existing Invoices Card */}

                {invoices.map((invoice, idx) => (
                    <div className="col" key={idx}>
                        <div className="card h-100 shadow-sm coursor-pointer"  style={{minHeight: '270px'} } onClick={() => handleViewClick(invoice)}>
                            {invoice.thumbnailUrl && (
                                <img src={invoice.thumbnailUrl} alt="Invoice thumbnail" className="card-img-top" style={{width: '200', objectFit:'cover'}} />
                            )}
                            <div className="card-body">
                                <h6 className="card-title mb-1">{invoice.title}</h6>
                                <small className="text-muted">
                                    Last Updated: {formatDate(invoice.createdAt)}
                                </small>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default Dashboard; 