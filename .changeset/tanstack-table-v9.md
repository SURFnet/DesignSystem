---
'@surfnet/curve-react': major
'@surfnet/curve-angular': major
---

Data tables now run on TanStack Table v9 (`@tanstack/react-table` / `@tanstack/angular-table` 9.x).

Breaking for code that types its columns or table:

- Type columns with the new `DataTableColumnDef<TData>` (exported from Curve) instead of TanStack's `ColumnDef<TData>`. The table is typed `DataTable<TData>`. Use `DataTableFeatures` where TanStack types need a features type, e.g. `Row<DataTableFeatures, TData>`.
- TanStack v9 changed some APIs: see its [migration guide](https://tanstack.com/table/latest/docs/framework/react/guide/migrating). For example, `getIsSomePageRowsSelected()` now stays `true` when every row is selected, so a "select all" checkbox should use `getIsSomePageRowsSelected() && !getIsAllPageRowsSelected()` for its indeterminate state.
- String `filterFn` / `sortFn` names only work for the built-ins Curve registers (the ones `'auto'` picks: `includesString`, `inNumberRange`, `equals`, `arrIncludes`, `inDateRange`, `weakEquals`; `alphanumeric`, `text`, `datetime`, `basic`). Pass any other filter or sort function directly.
- Angular: `injectDataTable` must be called from an injection context.
