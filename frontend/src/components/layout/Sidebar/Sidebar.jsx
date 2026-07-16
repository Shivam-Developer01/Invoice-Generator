import { NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import navigation from "../../../config/navigation";
import { useAuth } from "../../../context/AuthContext";
import { useEffect } from "react";

function Sidebar({ collapsed, setCollapsed, sidebarOpen, setSidebarOpen }) {
  const { user } = useAuth();

  useEffect(() => {
  }, [collapsed]);

  return (
    <aside
      className={`sidebar ${
        collapsed ? "collapsed" : ""
      } ${sidebarOpen ? "open" : ""}`}
    >
      <div className="sidebar-top">
        <div className="sidebar-logo d-flex justify-content-between align-items-start">
          {!collapsed && (
            <div>
              <h4 className="mb-0">RKI</h4>
              <p className="mb-0 mt-1">Invoice Generator</p>
            </div>
          )}

          <button
            className="btn btn-sm btn-link text-white p-0 d-none d-lg-block"

            onClick={() => {
              setCollapsed(!collapsed);
            }}
          >
            <FaBars size={18} />
          </button>
        </div>

        <nav className="sidebar-menu">
          {navigation
            .filter((item) => item.roles.includes(user?.role))
            .map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon />

                  {!collapsed && <span>{item.title}</span>}
                </NavLink>
              );
            })}
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;
