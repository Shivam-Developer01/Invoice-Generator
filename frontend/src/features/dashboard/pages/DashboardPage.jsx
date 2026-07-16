import { useNavigate } from "react-router-dom";

import PageHeader from "../../../components/ui/PageHeader/PageHeader";
import ActionCard from "../../../components/ui/ActionCard/ActionCard";
// import Loader from "../../../components/ui/Loader/Loader.jsx";
import StatCard from "../../../components/ui/StatCard/StatCard";
import { quickActions } from "../../../config/dashboard";
import Section from "../../../components/ui/Section/Section";
import { useAuth } from "../../../context/AuthContext";
import useDashboardStats from "../hooks/useDashboardStats";
import RecentActivity from "../components/RecentActivity";
import RecentDocuments from "../components/RecentDocuments";
import useDashboardCharts from "../hooks/useDashboardCharts";

import DocumentTypeChart from "../components/DocumentTypeChart";
import MonthlyDocumentsChart from "../components/MonthlyDocumentsChart";
import StatCardSkeleton from "../components/StatCardSkeleton.jsx";

import "./Dashboard.css";

import {
  FaFileInvoice,
  FaUsers,
  FaUserTie,
  FaCalendarAlt,
} from "react-icons/fa";

function DashboardPage() {
  const navigate = useNavigate();

  const { user } = useAuth();

  const { data, isLoading } = useDashboardStats();

  const { data: charts, isLoading: chartsLoading } = useDashboardCharts();

  const chartData = charts?.data;

  const dashboardStats = data?.data || {};
  return (
    <>
      <PageHeader
        title="Good Morning 👋"
        subtitle="Welcome back to Ravikiran Invoice Generator"
      />

      {/* Statistics */}

      <Section title="Statistics">
        {isLoading ? (
          <StatCardSkeleton />
        ) : (
          <div className="row g-4">
            <div className="col-xl-3 col-md-6">
              <StatCard
                title="Total Documents"
                value={dashboardStats.totalDocuments}
                icon={<FaFileInvoice />}
                color="primary"
              />
            </div>

            <div className="col-xl-3 col-md-6">
              <StatCard
                title="Total Customers"
                value={dashboardStats.totalCustomers}
                icon={<FaUsers />}
                color="success"
              />
            </div>

            {user?.role === "CO_FOUNDER" && (
              <div className="col-xl-3 col-md-6">
                <StatCard
                  title="Total Users"
                  value={dashboardStats.totalUsers}
                  icon={<FaUserTie />}
                  color="secondary"
                />
              </div>
            )}

            <div className="col-xl-3 col-md-6">
              <StatCard
                title="This Month Documents"
                value={dashboardStats.thisMonthDocuments}
                icon={<FaCalendarAlt />}
                color="danger"
              />
            </div>
          </div>
        )}
      </Section>

      {/* Quick Actions */}

      <Section title="Quick Actions">
        <div className="row g-4">
          {quickActions.map((item) => {
            const Icon = item.icon;

            return (
              <div className="col-lg-6" key={item.title}>
                <ActionCard
                  title={item.title}
                  description={item.description}
                  color={item.color}
                  icon={<Icon />}
                  onClick={() => navigate(item.path)}
                />
              </div>
            );
          })}
        </div>
      </Section>
      <Section title="Overview">
        <div className="row g-4">
          <div className="col-lg-6">
            <RecentActivity />
          </div>

          <div className="col-lg-6">
            <RecentDocuments />
          </div>
        </div>
      </Section>
      <Section title="Analytics">
        {chartsLoading ? (
          <StatCardSkeleton />
        ) : (
          <div className="row g-4">
            <div className="col-lg-4">
              <DocumentTypeChart data={chartData.documentTypes} />
            </div>

            <div className="col-lg-8">
              <MonthlyDocumentsChart data={chartData.monthlyDocuments} />
            </div>
          </div>
        )}
      </Section>
    </>
  );
}

export default DashboardPage;
