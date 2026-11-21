// Logo files live in /public/logo (transparent PNG): logo.png = full logo, mark.png = tree only.
// The logo has blue text, so in dark mode it sits on a white card (token "logo-bg" in styles/theme.js).
export function LogoImage({ type = "logo", className = "" }) {
  return <img src={`/logo/${type}.png`} alt="Founder Code" className={`w-auto select-none ${className}`} draggable="false" />;
}

export default function Logo({ collapsed = false, className = "" }) {
  return (
    <span className={`inline-flex items-center rounded-lg dark:bg-logo-bg dark:px-2 dark:py-1 ${className}`}>
      {collapsed ? <LogoImage type="mark" className="h-8" /> : <LogoImage type="logo" className="h-10" />}
    </span>
  );
}
