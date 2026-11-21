import Breadcrumbs from "./Breadcrumbs";

export default function PageHeader({ title, description, action, showBreadcrumbs = true }) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-1">
        {showBreadcrumbs && <Breadcrumbs className="mb-2" />}
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h1>
        {description && <p className="muted text-sm leading-relaxed">{description}</p>}
      </div>
      {action && <div className="flex shrink-0 items-center gap-2.5">{action}</div>}
    </div>
  );
}
