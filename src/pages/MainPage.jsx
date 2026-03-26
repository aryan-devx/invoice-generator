import { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Pencil } from "react-bootstrap-icons";
import InvoiceForm from "../components/InvoiceForm";
import TemplateGrid from "../components/TemplateGrid";

const MainPage = () => {
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const { invoiceTitle, setInvoiceTitle } = useContext(AppContext);
    

    const handleTitleChange = (e) => {
        const newTitle = e.target.value;
        setInvoiceTitle(newTitle);
    }

    const handleTitleEdit = (e) => {
        setIsEditingTitle(true);
    }

    const handleTitleBlur = () => {
        setIsEditingTitle(false);
    }




    return (
        <div className="mainpage container-fluid bg-light min-vh-100 py-4">
            <div className="container">
                {/* title bar */}
                    <div className="bg-white border rounded shadow-sm p-3 mb-4">
                    <div className="d-flex align-items-center">
                        {isEditingTitle ? (
                            <input type="text" 
                                className="form-control me-2"
                                autoFocus
                                onBlur={handleTitleBlur}
                                onChange={handleTitleChange}
                                value={invoiceTitle}
                            />
                        ) : (
                            <>
                                <h5 className="mb-0 me-2">Invoice Title</h5>
                                    <button className="btn-sm p-0 border-0 bg-transparent"
                                        onClick={handleTitleEdit} 
                                        >
                                        <Pencil className="text-secondary" size={20} />
                                    </button>
                             </>   
                        )}
                    </div>
                </div>

                {/* invoice form and template grid */}
                <div className="row g-4 align-items-stretch">
                    {/* Invoice form */}
                    <div className="col-12 col-lg-6 d-flex">
                        <div className="bg-white border rounded shadow-sm p-3 w-100">
                            <InvoiceForm />
                        </div>
                    </div>
                    {/* Template grid */}
                    <div className="col-12 col-lg-6 d-flex">
                        <div className="bg-white border rounded shadow-sm p-3 w-100">
                            <TemplateGrid />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )
};
export default MainPage;