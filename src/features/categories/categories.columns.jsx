import { Eye, Trash2 } from "lucide-react";
import IconButton from "@/components/ui/IconButton";

// Table columns of the Categories list. Only fields that the API returns.
export const getCategoryColumns = ({ onView, onDelete }) => [
  { key: "category_id", header: "ID", className: "w-24 text-muted" },
  { key: "category_name", header: "Category Name", render: (row) => <span className="font-semibold">{row.category_name}</span> },
  {
    key: "actions",
    header: "Actions",
    className: "w-32",
    render: (row) => (
      <div className="flex items-center gap-1.5">
        <IconButton icon={Eye} label="View category" variant="primary" onClick={() => onView(row)} />
        <IconButton icon={Trash2} label="Delete category" variant="danger" onClick={() => onDelete(row)} />
      </div>
    ),
  },
];