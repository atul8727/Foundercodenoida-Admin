import { useState } from "react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function EmployeeFormModal({ onClose, onSubmit, loading }) {
  const [name, setName] = useState(""); const [profile, setProfile] = useState(""); const [image, setImage] = useState(null); const [errors, setErrors] = useState({});
  const submit = (event) => {
    event.preventDefault();
    const next = {}; if (!name.trim()) next.name = "Name is required."; if (!profile.trim()) next.profile = "Profile is required."; if (!image) next.image = "Please choose an image.";
    setErrors(next); if (Object.keys(next).length) return;
    onSubmit({ name, profile, image });
  };
  return <Modal open onClose={() => !loading && onClose()} title="Add employee" footer={<><Button variant="outline" onClick={onClose} disabled={loading}>Cancel</Button><Button type="submit" form="employee-form" loading={loading}>Add employee</Button></>}>
    <form id="employee-form" onSubmit={submit} className="space-y-4"><Input label="Name" required value={name} onChange={(e) => setName(e.target.value)} error={errors.name} placeholder="Employee name" /><Input label="Profile" required value={profile} onChange={(e) => setProfile(e.target.value)} error={errors.profile} placeholder="e.g. Backend Engineer" /><div><label className="mb-1.5 block text-sm font-semibold">Profile image <span className="text-danger">*</span></label><input type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] || null)} className={`input py-2 ${errors.image ? "!border-danger" : ""}`} />{errors.image && <p className="mt-1 text-xs text-danger">{errors.image}</p>}</div></form>
  </Modal>;
}
