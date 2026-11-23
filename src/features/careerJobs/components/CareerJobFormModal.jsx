import { useEffect, useState } from "react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";

const blank = { job_title: "", location: "", job_type: "", job_description: "" };
const jobTypes = ["Full Time", "Part Time", "Contract", "Internship", "Remote"];

export default function CareerJobFormModal({ job, onClose, onSubmit, loading }) {
  const [form, setForm] = useState(blank); const [errors, setErrors] = useState({});
  useEffect(() => { setForm(job ? { ...blank, ...job } : blank); setErrors({}); }, [job]);
  const set = (key, value) => setForm((state) => ({ ...state, [key]: value }));
  const submit = (event) => {
    event.preventDefault();
    const next = {};
    ["job_title", "location", "job_type", "job_description"].forEach((key) => { if (!form[key].trim()) next[key] = "This field is required."; });
    setErrors(next); if (Object.keys(next).length) return;
    onSubmit({ ...form, job_title: form.job_title.trim(), location: form.location.trim(), job_type: form.job_type.trim(), job_description: form.job_description.trim() });
  };
  return <Modal open onClose={() => !loading && onClose()} title={job ? "Edit career job" : "Create career job"} footer={<><Button variant="outline" onClick={onClose} disabled={loading}>Cancel</Button><Button type="submit" form="career-job-form" loading={loading}>{job ? "Update job" : "Create job"}</Button></>}>
    <form id="career-job-form" onSubmit={submit} className="space-y-4">
      <Input label="Job title" required value={form.job_title} onChange={(e) => set("job_title", e.target.value)} error={errors.job_title} placeholder="e.g. Node.js Developer" />
      <div className="grid gap-4 sm:grid-cols-2"><Input label="Location" required value={form.location} onChange={(e) => set("location", e.target.value)} error={errors.location} placeholder="e.g. Noida" /><Select label="Job type" required placeholder="Select type" value={form.job_type} onChange={(e) => set("job_type", e.target.value)} error={errors.job_type} options={jobTypes} /></div>
      <Textarea label="Job description" required rows={6} value={form.job_description} onChange={(e) => set("job_description", e.target.value)} error={errors.job_description} placeholder="Describe the role, responsibilities and requirements." />
    </form>
  </Modal>;
}
