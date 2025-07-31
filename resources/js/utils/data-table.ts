import { router } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";

export function getColumnId<T>(col: ColumnDef<T>): string {
  const raw = col.id ?? ("accessorKey" in col ? col.accessorKey : "");
  return typeof raw === "string" || typeof raw === "number" ? String(raw) : "";
}

export function goToPage(page: number, extraParams: Record<string, any> = {}) {
  if (!page || page < 1) return;
  router.get(route(route().current()!), { page, ...extraParams }, { preserveState: true });
}

export function formatShowingRange(currentPage: number, perPage: number, total: number) {
  const start = (currentPage - 1) * perPage + 1;
  const end = Math.min(currentPage * perPage, total);
  return `Showing ${start} – ${end} of ${total} items`;
}

export function handlePageChange(
  page: number,
  extraParams: Record<string, any> = {}
) {
  if (page >= 1) {
    router.get(route(route().current()!), { page, ...extraParams }, { preserveState: true });
  }
}

