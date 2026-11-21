import { useState } from "react";

// open/close state for modals and drawers
export const useDisclosure = (initial = false) => {
  const [isOpen, setOpen] = useState(initial);
  return { isOpen, open: () => setOpen(true), close: () => setOpen(false), toggle: () => setOpen((o) => !o) };
};
