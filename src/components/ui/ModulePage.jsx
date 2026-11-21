import PageHeader from "./PageHeader";
import ComingSoon from "./ComingSoon";

// Placeholder for a module that has no `page` in config/modules.js yet.
export default function ModulePage({ module }) {
  return (
    <>
      <PageHeader title={module.label} description={module.description} />
      <ComingSoon items={module.items} />
    </>
  );
}
