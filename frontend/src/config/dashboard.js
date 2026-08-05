import {
  FaBuilding,
  FaFileInvoice,
  FaFolderOpen,
  FaUsers,
} from "react-icons/fa";

import routes from "./routes";

export const quickActions = [
  {
    title: "Generate Bill",
    description: "Create Invoice, Proforma and Credit Note",
    icon: FaFileInvoice,
    color: "primary",
    path: routes.CREATE_DOCUMENT,
  },
  {
    title: "Customers",
    description: "Manage customer information",
    icon: FaUsers,
    color: "success",
    path: routes.CUSTOMERS,
  },
  {
    title: "Documents",
    description: "Browse generated documents",
    icon: FaFolderOpen,
    color: "secondary",
    path: routes.DOCUMENTS,
  },
  {
    title: "Companies",
    description: "Update company information",
    icon: FaBuilding,
    color: "primary",
    path: routes.COMPANIES,
  },
];