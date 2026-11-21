import Badge from "./Badge";
import { STATUS_TONES } from "@/config/statuses";
import { humanizeStatus } from "@/utils/formatStatus";

// Colors per status are defined in config/statuses.js
export default function StatusBadge({ status, className = "" }) {
  if (!status) return null;
  const key = String(status).replace(/_/g, " ").toLowerCase();
  return (
    <Badge tone={STATUS_TONES[key] || "neutral"} dot className={className}>
      {humanizeStatus(status)}
    </Badge>
  );
}
