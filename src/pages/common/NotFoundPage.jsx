import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-full flex-col items-center justify-center gap-3 p-6 text-center">
      <p className="text-6xl font-bold text-primary">404</p>
      <h1 className="text-xl font-semibold">Page not found</h1>
      <Link to="/" className="text-sm font-semibold text-primary underline">Go back home</Link>
    </div>
  );
}
