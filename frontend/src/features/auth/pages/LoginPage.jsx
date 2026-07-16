import LoginForm from "../components/LoginForm";
import { FaFileInvoice, FaUsers, FaFilePdf } from "react-icons/fa";

function LoginPage() {
  return (
    <div className="login-page">
      <div className="login-left">
        <div className="login-brand">
          <div className="logo-circle">RKI</div>

          <h1>Invoice Generator</h1>

          <p>
            A professional solution for creating invoices, proforma invoices and
            credit notes with an efficient customer management system.
          </p>

          <div className="feature-list">
            <div className="feature-item">
              <div className="feature-icon">
                <FaFileInvoice />
              </div>

              <div>
                <h5>Generate Bills</h5>

                <span>Invoice, Proforma & Credit Notes</span>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">
                <FaUsers />
              </div>

              <div>
                <h5>Customer Management</h5>

                <span>Maintain all customer records</span>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">
                <FaFilePdf />
              </div>

              <div>
                <h5>Professional PDFs</h5>

                <span>Download high quality PDF documents</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="login-right">
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;
