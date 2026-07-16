import { useNavigate } from "react-router-dom";

import { useAuth } from "../../../context/AuthContext";
import routes from "../../../config/routes";
import ROLE_LABELS from "../../../constants/roleLabels";

import { FaBars } from "react-icons/fa";

function Navbar({ setSidebarOpen }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <header className="navbar-custom">
      <div className="d-flex align-items-center gap-3">
        <button
          className="btn btn-link text-dark p-0 d-lg-none"
          onClick={() => setSidebarOpen(true)}
        >
          <FaBars size={22} />
        </button>

        <h4 className="page-title mb-0">Ravikiran Infotech</h4>
      </div>

      <div className="dropdown">
        <button
          className="btn btn-light dropdown-toggle d-flex align-items-center gap-2"
          data-bs-toggle="dropdown"
        >
          <div
            className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center"
            style={{
              width: 36,
              height: 36,
              fontWeight: "bold",
            }}
          >
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <span>{user?.name}</span>
        </button>

        <ul className="dropdown-menu dropdown-menu-end">
          <li>
            <span className="dropdown-item-text">
              {ROLE_LABELS[user?.role]}
            </span>
          </li>

          <li>
            <hr className="dropdown-divider" />
          </li>

          <li>
            <button
              className="dropdown-item"
              onClick={() => navigate(routes.PROFILE)}
            >
              My Profile
            </button>
          </li>

          <li>
            <button
              className="dropdown-item"
              onClick={() => navigate(routes.CHANGE_PASSWORD)}
            >
              Change Password
            </button>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>

          <li>
            <button
              className="dropdown-item text-danger"
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Navbar;
