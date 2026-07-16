import {
  FaHome,
  FaFileInvoice,
  FaFolderOpen,
  FaUsers,
  FaBuilding,
  FaCog,
  FaClipboardList,
  FaUserShield,
  FaUserCircle,
} from "react-icons/fa";

const ALL_USERS = ["CO_FOUNDER", "MANAGER", "ACCOUNTANT", "OTHERS"];

const navigation = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: FaHome,
    roles: ALL_USERS,
  },
  {
    title: "Generate Bill",
    path: "/generate-bill",
    icon: FaFileInvoice,
    roles: ALL_USERS,
  },
  {
    title: "Documents",
    path: "/documents",
    icon: FaFolderOpen,
    roles: ALL_USERS,
  },
  {
    title: "Customers",
    path: "/customers",
    icon: FaUsers,
    roles: ALL_USERS,
  },
  {
    title: "Company",
    path: "/company",
    icon: FaBuilding,
    roles: ALL_USERS,
  },
  {
    title: "Document Settings",
    path: "/document-settings",
    icon: FaCog,
    roles: ALL_USERS,
  },
  {
    title: "Audit Logs",
    path: "/audit-logs",
    icon: FaClipboardList,
    roles: ALL_USERS,
  },
  {
    title: "Users",
    path: "/users",
    icon: FaUserShield,
    roles: ["CO_FOUNDER"],
  },
  {
    title: "Profile",
    path: "/profile",
    icon: FaUserCircle,
    roles: ALL_USERS,
  },
];

export default navigation;
