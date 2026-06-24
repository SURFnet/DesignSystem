'use client';

import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { Checkbox } from '@surfnet/react';

// Row selection is genuinely client state, so it lives in a small context that
// wraps the server-rendered table. The select-all and per-row checkboxes are
// the only client leaves inside the otherwise server-rendered rows.
type SelectionContextValue = {
  selected: Set<string>;
  toggle: (id: string) => void;
  toggleMany: (ids: string[], checked: boolean) => void;
};

const SelectionContext = createContext<SelectionContextValue | null>(null);

function useSelection() {
  const context = useContext(SelectionContext);
  if (!context) throw new Error('Selection components must be used within <SelectionProvider>.');
  return context;
}

export function SelectionProvider({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState<Set<string>>(() => new Set());

  const value = useMemo<SelectionContextValue>(
    () => ({
      selected,
      toggle: (id) =>
        setSelected((prev) => {
          const next = new Set(prev);
          if (next.has(id)) next.delete(id);
          else next.add(id);
          return next;
        }),
      toggleMany: (ids, checked) =>
        setSelected((prev) => {
          const next = new Set(prev);
          for (const id of ids) {
            if (checked) next.add(id);
            else next.delete(id);
          }
          return next;
        }),
    }),
    [selected],
  );

  return <SelectionContext.Provider value={value}>{children}</SelectionContext.Provider>;
}

export function SelectAllCheckbox({ ids }: { ids: string[] }) {
  const { selected, toggleMany } = useSelection();
  const all = ids.length > 0 && ids.every((id) => selected.has(id));
  const some = ids.some((id) => selected.has(id));

  return (
    <Checkbox
      checked={all}
      indeterminate={!all && some}
      onCheckedChange={(value) => toggleMany(ids, !!value)}
      aria-label="Select all"
    />
  );
}

export function RowCheckbox({ id, label }: { id: string; label: string }) {
  const { selected, toggle } = useSelection();
  return (
    <Checkbox
      checked={selected.has(id)}
      onCheckedChange={() => toggle(id)}
      aria-label={`Select ${label}`}
    />
  );
}
