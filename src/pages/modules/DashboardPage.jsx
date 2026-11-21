import { CheckCircle2, Inbox, Loader, Sparkles } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import StatCard from "@/components/ui/StatCard";
import Card from "@/components/ui/Card";
import EmptyState from "@/components/ui/EmptyState";
import { useAuth } from "@/features/auth/useAuth";

// Placeholder: the numbers will come from the "Dashboard Stats" API when it is connected.
export default function DashboardPage() {
  const { user } = useAuth();
  return (
    <>
      <PageHeader title="Dashboard" description={`Welcome back, ${user?.name || "Admin"}.`} />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Enquiries" icon={Inbox} subtext="Waiting for API" />
        <StatCard label="New" icon={Sparkles} subtext="Waiting for API" />
        <StatCard label="In Progress" icon={Loader} subtext="Waiting for API" />
        <StatCard label="Converted" icon={CheckCircle2} subtext="Waiting for API" />
      </div>

      <Card className="mt-6">
        <EmptyState title="Dashboard data is not connected yet" text="Charts and recent enquiries appear here once the Dashboard Stats API is added." />
      </Card>
    </>
  );
}
