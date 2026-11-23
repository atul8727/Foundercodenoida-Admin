import { useState } from "react";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

// Create category. Mount it only while it is open so the form starts empty every time.
export default function CategoryFormModal({ onClose, onSubmit, loading }) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Category name is required");
      return;
    }
    onSubmit({ category_name: name });
  };

  return (
    <Modal
      open
      onClose={() => !loading && onClose()}
      title="Add Category"
      size="sm"
      footer={
        <>
          <Button variant="outline" size="sm" onClick={onClose} disabled={loading}>Cancel</Button>
          <Button size="sm" type="submit" form="category-form" loading={loading}>Save</Button>
        </>
      }
    >
      <form id="category-form" onSubmit={handleSubmit} noValidate>
        <Input
          label="Category Name"
          required
          autoFocus
          value={name}
          error={error}
          placeholder="e.g. Technology"
          onChange={(e) => {
            setName(e.target.value);
            if (error) setError("");
          }}
        />
      </form>
    </Modal>
  );
}