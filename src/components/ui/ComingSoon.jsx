import { Hammer } from "lucide-react";
import Card from "./Card";
import Badge from "./Badge";

export default function ComingSoon({ items = [] }) {
  return (
    <Card className="p-8 sm:p-12">
      <div className="mx-auto max-w-xl text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary-soft text-primary">
          <Hammer size={26} />
        </div>
        <Badge>Coming soon</Badge>
        <h2 className="mt-3 text-xl font-semibold">This module is being built</h2>
        <p className="muted mt-2 text-sm">The screen goes live once its API is connected.</p>
        {items.length > 0 && (
          <ul className="mx-auto mt-6 max-w-sm space-y-2 text-left text-sm">
            {items.map((i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                {i}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Card>
  );
}
