import './LandingPage.css';
import { assets } from '../../assets/assets';

const LandingPage = () => {
    return (
     <>
            <header id="hero" className="hero-section text-white text-center">
                <div className="container py-5 d-flex flex-column justify-content-center" style={{}}>
                    <div className="row py-lg-5">
                        <div className="col-lg-9 col-md-10 mx-auto">
                            <h1 className="display-3 fw-bold mb-4">
                                Effortless Invoicing. Professional Results.
                            </h1>
                            <p className="lead mb-5" style={{ fontSize: '1.3rem' }}>
                                Stop wrestling with spreadsheets. QuickInvoice helps you create and send beautiful, professional invoices in minutes. Get paid faster and look great doing it.
                            </p>
                            <p>
                                {/* Primary call to action */}
                                <button className="btn btn-lg btn-warning fw-bold rounded-pill my-2 mx-1 px-3">
                                    Generate Your First Invoice
                                </button>
                                {/* Secondary call to action */}
                                <button className="btn btn-lg btn-outline-light fw-bold rounded-pill my-2 mx-1 px-3">
                                    Learn More
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Get Started Section */}
            <section className="get-started-section py-5">
                <div className="container">
                    <h2 className="section-title mb-5">Get Started in 4 Simple Steps</h2>
                    <div className="row g-4">
                        {/* Step 1 */}
                        <div className="col-lg-3 col-md-6">
                            <div className="step-card step-1">
                                <div className="step-number">1</div>
                                <h3 className="step-title">Enter Details</h3>
                                <p className="step-description">
                                    Quickly fill in your clients information, item descriptions, quantities, and prices. Our intuitive form makes it a breeze.
                                </p>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="col-lg-3 col-md-6">
                            <div className="step-card step-2">
                                <div className="step-number">2</div>
                                <h3 className="step-title">Choose Template</h3>
                                <p className="step-description">
                                    Browse our gallery of professionally designed templates. Pick one that matches your brand and style.
                                </p>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="col-lg-3 col-md-6">
                            <div className="step-card step-3">
                                <div className="step-number">3</div>
                                <h3 className="step-title">Preview Invoice</h3>
                                <p className="step-description">
                                    See exactly how your invoice will look before sending it. Make any last-minute adjustments with ease.
                                </p>
                            </div>
                        </div>

                        {/* Step 4 */}
                        <div className="col-lg-3 col-md-6">
                            <div className="step-card step-4">
                                <div className="step-number">4</div>
                                <h3 className="step-title">Download & Save</h3>
                                <p className="step-description">
                                    Download your invoice as a PDF, send it directly via email, or save it for your records and future reference.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose QuickInvoice Section */}
            <section className="why-choose-section py-5">
                <div className="container">
                    <h2 className="section-title text-center mb-5" style={{ color: '#2563eb', fontWeight: 700 }}>
                        Why Choose QuickInvoice?
                    </h2>
                    <div className="row g-5 align-items-center mb-4">
                        <div className="col-lg-6 mb-3 mb-lg-0">
                            <img src={assets.landing1} alt="Easy to fill invoice details" className="img-fluid rounded shadow" />
                        </div>
                        <div className="col-lg-6">
                            <h3 className="h5 fw-bold mb-2">Easy to fill invoice details</h3>
                            <ul className="mb-0 ps-3">
                                <li>Curated list of templates from gallery.</li>
                                <li>Add your logo and invoice details.</li>
                                <li>Tailor fields to your needs.</li>
                            </ul>
                        </div>
                    </div>
                    <div className="row g-5 align-items-center mb-4 flex-lg-row-reverse">
                        <div className="col-lg-6 mb-3 mb-lg-0">
                            <img src={assets.landing2} alt="Beautiful Dashboard" className="img-fluid rounded shadow" />
                        </div>
                        <div className="col-lg-6">
                            <h3 className="h5 fw-bold mb-2">Beautiful Dashboard</h3>
                            <ul className="mb-0 ps-3">
                                <li>View the previous invoices.</li>
                                <li>Your saved invoices with thumbnail.</li>
                                <li>Reuse one or more invoices.</li>
                                <li>Track the invoices.</li>
                            </ul>
                        </div>
                    </div>
                    <div className="row g-5 align-items-center mb-4">
                        <div className="col-lg-6 mb-3 mb-lg-0">
                            <img src={assets.landing3} alt="Invoice Preview with Action Buttons" className="img-fluid rounded shadow" />
                        </div>
                        <div className="col-lg-6">
                            <h3 className="h5 fw-bold mb-2">Invoice Preview with Action Buttons</h3>
                            <ul className="mb-0 ps-3">
                                <li>Live preview.</li>
                                <li>Switch between multiple invoices.</li>
                                <li>One click to Save, Download and Delete invoices.</li>
                            </ul>
                        </div>
                    </div>
                    <div className="row g-5 align-items-center flex-lg-row-reverse">
                        <div className="col-lg-6 mb-3 mb-lg-0">
                            <img src={assets.landing4} alt="Send invoices instantly" className="img-fluid rounded shadow" />
                        </div>
                        <div className="col-lg-6">
                            <h3 className="h5 fw-bold mb-2">Send invoices instantly</h3>
                            <ul className="mb-0 ps-3">
                                <li>Send invoices instantly without leaving the application.</li>
                                <li>One click to send invoices.</li>
                                <li>Send unlimited invoices.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section py-5">
                <div className="container text-center">
                    <h2 className="cta-title mb-3">Ready to Streamline Your Invoicing?</h2>
                    <p className="cta-subtitle mb-4">
                        Join thousands of freelancers and small businesses who trust QuickInvoice. Start creating professional invoices today – it's fast, easy, and effective!
                    </p>
                    <button className="btn btn-lg btn-cta fw-bold rounded-pill mb-2">
                        Start Generating Invoices Now
                    </button>
                    <p className="cta-small-text">
                        (This will lead to the invoice generation interface)
                    </p>
                </div>
            </section>

            {/* Footer Section */}
            <footer className="footer-section py-5">
                <div className="container">
                    <div className="row align-items-center text-center mb-4">
                        <div className="col-12">
                            <img src={assets.logo} alt="QuickInvoice Logo" className="footer-logo mb-3" style={{ height: '50px' }} />
                            <h3 className="footer-brand">QuickInvoice</h3>
                        </div>
                    </div>
                    <div className="row text-center mb-4">
                        <div className="col-12">
                            <p className="footer-copyright">© 2025 QuickInvoice. All Rights Reserved.</p>
                            <p className="footer-tagline">Crafted with for freelancers and small businesses.</p>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-auto">
                            <div className="footer-socials">
                                <a href="#" className="social-link" aria-label="Facebook">
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                                <a href="#" className="social-link" aria-label="Instagram">
                                    <i className="fab fa-instagram"></i>
                                </a>
                                <a href="#" className="social-link" aria-label="LinkedIn">
                                    <i className="fab fa-linkedin-in"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
     </>
    )
}
export default LandingPage;