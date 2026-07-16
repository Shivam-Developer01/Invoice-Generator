import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";

function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
  }, []);

  return (
    <div className="app-layout">
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="main-layout">
        <Navbar setSidebarOpen={setSidebarOpen} />

        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
