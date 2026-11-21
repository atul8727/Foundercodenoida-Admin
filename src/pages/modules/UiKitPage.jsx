import { useState } from "react";
import { Eye, Plus, Trash2, Users } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import Card, { CardHeader, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import IconButton from "@/components/ui/IconButton";
import Badge from "@/components/ui/Badge";
import StatusBadge from "@/components/ui/StatusBadge";
import StatCard from "@/components/ui/StatCard";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import Checkbox from "@/components/ui/Checkbox";
import Switch from "@/components/ui/Switch";
import Tabs from "@/components/ui/Tabs";
import Table from "@/components/ui/Table";
import Pagination from "@/components/ui/Pagination";
import SearchInput from "@/components/ui/SearchInput";
import Modal from "@/components/ui/Modal";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import EmptyState from "@/components/ui/EmptyState";
import ErrorState from "@/components/ui/ErrorState";
import { useToast } from "@/components/ui/Toast";
import { useDisclosure } from "@/hooks/useDisclosure";
import { usePagination } from "@/hooks/usePagination";
import { ENQUIRY_STATUSES } from "@/config/statuses";
import { THEME } from "@/styles/theme";

// Development-only page (hidden in production). The rows below are demo data for the components only.
const DEMO = Array.from({ length: 23 }, (_, i) => ({ id: i + 1, name: `Sample name ${i + 1}`, contact: `sample${i + 1}@example.com`, status: ENQUIRY_STATUSES[i % ENQUIRY_STATUSES.length] }));

const Section = ({ title, children }) => (
  <Card className="mb-6">
    <CardHeader title={title} />
    <CardContent className="flex flex-wrap items-center gap-3">{children}</CardContent>
  </Card>
);

export default function UiKitPage() {
  const toast = useToast();
  const modal = useDisclosure();
  const confirm = useDisclosure();
  const [tab, setTab] = useState("all");
  const [on, setOn] = useState(true);
  const { page, setPage, pageSize, pageItems, total } = usePagination(DEMO, 5);

  const columns = [
    { key: "name", header: "Name", render: (r) => <div><p className="font-semibold">{r.name}</p><p className="muted text-xs">{r.contact}</p></div> },
    { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
    { key: "actions", header: "Actions", render: () => <div className="flex gap-1.5"><IconButton icon={Eye} label="View" variant="primary" /><IconButton icon={Trash2} label="Delete" variant="danger" /></div> },
  ];

  return (
    <>
      <PageHeader title="UI Kit" description="Every reusable component. Visible only in development." />

      <Section title="Theme tokens (src/styles/theme.js)">
        {Object.keys(THEME.light.colors).map((k) => (
          <div key={k} className="w-28">
            <div className="h-10 rounded-md border border-line" style={{ background: `rgb(var(--c-${k}))` }} />
            <p className="muted mt-1 text-xs">{k}</p>
          </div>
        ))}
      </Section>

      <Section title="Buttons & icon buttons">
        <Button icon={Plus}>Primary</Button>
        <Button variant="soft">Soft</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="success">Success</Button>
        <Button variant="danger">Danger</Button>
        <Button loading>Loading</Button>
        <Button size="sm">Small</Button>
        <IconButton icon={Eye} label="View" variant="primary" />
        <IconButton icon={Trash2} label="Delete" variant="danger" />
      </Section>

      <Section title="Badges & status colors">
        {["primary", "success", "warning", "danger", "info", "neutral"].map((t) => <Badge key={t} tone={t} dot>{t}</Badge>)}
        <span className="w-full" />
        {ENQUIRY_STATUSES.map((s) => <StatusBadge key={s} status={s} />)}
      </Section>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Enquiries" value="1,248" icon={Users} subtext="Sample value" />
        <StatCard label="Loading" loading icon={Users} />
      </div>

      <Section title="Form controls">
        <div className="grid w-full gap-4 sm:grid-cols-2">
          <Input label="Email" placeholder="admin@foundercode.in" />
          <Input label="With error" defaultValue="123" error="This value is not valid." />
          <Select label="Status" options={ENQUIRY_STATUSES} />
          <Textarea label="Remarks" placeholder="Notes..." rows={2} />
        </div>
        <Checkbox label="Checkbox" defaultChecked />
        <Switch checked={on} onChange={setOn} label="Switch" />
      </Section>

      <Section title="Tabs, modal, confirm, toasts">
        <Tabs items={[{ key: "all", label: "All" }, { key: "web", label: "Website" }, { key: "app", label: "App" }]} value={tab} onChange={setTab} />
        <Button onClick={modal.open}>Open modal</Button>
        <Button variant="danger" onClick={confirm.open}>Confirm dialog</Button>
        <Button variant="success" onClick={() => toast.success("Status updated")}>Success</Button>
        <Button variant="outline" onClick={() => toast.error("Something went wrong")}>Error</Button>
        <Button variant="outline" onClick={() => toast.warning("Please check the form")}>Warning</Button>
        <Button variant="outline" onClick={() => toast.info("Just so you know")}>Info</Button>
      </Section>

      <Card className="mb-6">
        <div className="p-4"><SearchInput onChange={() => {}} placeholder="Search name, phone, email..." className="max-w-sm" /></div>
        <Table columns={columns} data={pageItems} />
        <Pagination page={page} pageSize={pageSize} total={total} onChange={setPage} />
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card><Table columns={columns} loading /></Card>
        <Card><EmptyState title="No enquiries found" text="Change the search or filters." /></Card>
        <Card><ErrorState message="Cannot reach the server." onRetry={() => toast.info("Retrying...")} /></Card>
      </div>

      <Modal open={modal.isOpen} onClose={modal.close} title="Sample modal"
        footer={<><Button variant="outline" size="sm" onClick={modal.close}>Cancel</Button><Button size="sm" onClick={modal.close}>Save</Button></>}>
        <Input label="Name" placeholder="Type here" />
      </Modal>
      <ConfirmDialog open={confirm.isOpen} onClose={confirm.close} onConfirm={confirm.close} title="Delete enquiry?" message="This action cannot be undone." confirmText="Delete" />
    </>
  );
}
