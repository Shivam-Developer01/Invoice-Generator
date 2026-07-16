import { Navigate, Route, Routes } from "react-router-dom";

import DashboardLayout from "../components/layout/DashboardLayout/DashboardLayout";

import LoginPage from "../features/auth/pages/LoginPage";
import DashboardPage from "../features/dashboard/pages/DashboardPage";
import CustomersPage from "../features/customers/pages/CustomersPage";
import DocumentsPage from "../features/documents/pages/DocumentsPage";
import CreateDocumentPage from "../features/documents/pages/CreateDocumentPage";
import CompanyPage from "../features/company/pages/CompanyPage";
import DocumentSettingsPage from "../features/documentSettings/pages/DocumentSettingsPage";
import UsersPage from "../features/users/pages/UsersPage";
import AuditLogsPage from "../features/auditLogs/pages/AuditLogsPage";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import RoleRoute from "./RoleRoute";

import ProfilePage from "../features/profile/pages/ProfilePage";

import ChangePasswordPage from "../features/profile/pages/ChangePasswordPage";

import routes from "../config/routes";

function AppRoutes() {
  return (
    <Routes>
      {/* Default */}
      <Route path="/" element={<Navigate to={routes.LOGIN} replace />} />

      {/* Public */}
      <Route element={<PublicRoute />}>
        <Route path={routes.LOGIN} element={<LoginPage />} />
      </Route>

      {/* Protected */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path={routes.DASHBOARD} element={<DashboardPage />} />

          <Route
            path={routes.CREATE_DOCUMENT}
            element={<CreateDocumentPage />}
          />

          <Route path={routes.EDIT_DOCUMENT} element={<CreateDocumentPage />} />

          <Route path={routes.DOCUMENTS} element={<DocumentsPage />} />

          <Route path={routes.CUSTOMERS} element={<CustomersPage />} />

          <Route path={routes.COMPANY} element={<CompanyPage />} />

          <Route
            path={routes.DOCUMENT_SETTINGS}
            element={<DocumentSettingsPage />}
          />

          <Route path={routes.AUDIT_LOGS} element={<AuditLogsPage />} />

          <Route path={routes.USERS} element={<UsersPage />} />

          <Route path={routes.PROFILE} element={<ProfilePage />} />

          <Route
            path={routes.CHANGE_PASSWORD}
            element={<ChangePasswordPage />}
          />
        </Route>

        {/* Co-Founder Only */}
        <Route element={<RoleRoute allowedRoles={["CO_FOUNDER"]} />}>
          <Route element={<DashboardLayout />}>
            <Route path={routes.USERS} element={<UsersPage />} />
          </Route>
        </Route>
      </Route>

      {/* 404 */}
      <Route path="*" element={<Navigate to={routes.LOGIN} replace />} />
    </Routes>
  );
}

export default AppRoutes;
