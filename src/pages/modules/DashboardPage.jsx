import { BriefcaseBusiness, FileText, Inbox, MonitorPlay, Users } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";
import StatCard from "@/components/ui/StatCard";
import ErrorState from "@/components/ui/ErrorState";
import { useFetch } from "@/hooks/useFetch";
import { dashboardService } from "@/features/dashboard/dashboard.service";

export default function DashboardPage() {
  const { data: stats, loading, error, refetch } = useFetch(dashboardService.getStats);
  const cards = [
    { key: "employees", label: "Employees", icon: Users, to: "/employees" },
    { key: "blogs", label: "Blogs", icon: FileText, to: "/blogs" },
    { key: "enquiries", label: "Enquiries", icon: Inbox, to: "/enquiries" },
    { key: "careerJobs", label: "Career jobs", icon: BriefcaseBusiness, to: "/career-jobs" },
    { key: "jobRequests", label: "Job requests", icon: MonitorPlay, to: "/job-requests" },
  ];

  return <><PageHeader title="Dashboard" description="Live overview from your admin data." />{error ? <Card><ErrorState message={error} onRetry={refetch} /></Card> : <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">{cards.map((card) => <StatCard key={card.key} {...card} value={stats?.[card.key] ?? 0} loading={loading} />)}</div>}</>;
}
