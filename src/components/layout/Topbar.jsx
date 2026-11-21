import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronDown, LogOut, Menu, Phone } from "lucide-react";
import Avatar from "@/components/ui/Avatar";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import Dropdown, { DropdownItem } from "@/components/ui/Dropdown";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "@/features/auth/useAuth";
import { useMutation } from "@/hooks/useMutation";
import { getModuleByPath } from "@/config/modules";

export default function Topbar({ onToggleSidebar }) {
  const { user, logout } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [confirmLogout, setConfirmLogout] = useState(false);

  const { mutate: signOut, loading } = useMutation(logout, {
    successMessage: "Signed out successfully",
    onSuccess: () => navigate("/login", { replace: true }),
  });

  const title = getModuleByPath(pathname)?.label || "Dashboard";
  const name = user?.name || "Admin";

  return (
    <>
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b border-line bg-surface px-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <button type="button" onClick={onToggleSidebar} aria-label="Toggle menu" className="flex h-9 w-9 items-center justify-center rounded-md text-muted hover:bg-surface-2 hover:text-ink">
            <Menu size={20} />
          </button>
          <h2 className="truncate text-base font-semibold sm:text-lg">{title}</h2>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <Dropdown
            width="w-64"
            trigger={(open) => (
              <button type="button" aria-label="Account menu" className={`flex items-center gap-2.5 rounded-md p-1 pr-2 transition-colors ${open ? "bg-surface-2" : "hover:bg-surface-2"}`}>
                <Avatar name={name} />
                <span className="hidden text-left leading-tight sm:block">
                  <span className="block max-w-[140px] truncate text-sm font-semibold">{name}</span>
                  <span className="muted block text-[11px]">Administrator</span>
                </span>
                <ChevronDown size={16} className="text-muted" />
              </button>
            )}
          >
            <div className="border-b border-line p-3.5">
              <div className="flex items-center gap-3">
                <Avatar name={name} size="lg" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{name}</p>
                  <p className="muted truncate text-xs">{user?.email || "—"}</p>
                </div>
              </div>
              {user?.phone && (
                <p className="muted mt-3 flex items-center gap-1.5 text-xs">
                  <Phone size={12} className="shrink-0" />
                  <span>{user.phone}</span>
                </p>
              )}
            </div>
            <div className="py-1">
              <DropdownItem icon={LogOut} danger onClick={() => setConfirmLogout(true)}>Sign out</DropdownItem>
            </div>
          </Dropdown>
        </div>
      </header>

      <ConfirmDialog
        open={confirmLogout}
        onClose={() => !loading && setConfirmLogout(false)}
        onConfirm={async () => {
          await signOut();
          setConfirmLogout(false);
        }}
        loading={loading}
        title="Sign out"
        message="Are you sure you want to end your session?"
        confirmText="Sign out"
      />
    </>
  );
}
