import { usePage } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from 'react';
import debounce from "lodash/debounce";

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
  return `Page ${currentPage} | Showing ${start} – ${end} of ${total} items`;
}

export function handlePageChange(
  page: number,
  currentFilters: Record<string, any> = {}
) {
  router.get(route(route().current()!), { ...currentFilters, page }, {
    preserveState: true,
    preserveScroll: true,
  });
}

export function createHandleSearch<T extends Record<string, any>>(delay = 500, extraParams: T = {}) {
  return debounce((value: string) => {
    router.get(route(route().current()!), { search: value, ...extraParams }, { preserveState: true });
  }, delay);
}

export function handleSort(
  column: string,
  currentFilters: Record<string, any> = {}
) {
  const isSame = currentFilters.sort === column;
  const newDirection = isSame && currentFilters.direction === "asc" ? "desc" : "asc";

  router.get(route(route().current()!), {
    ...currentFilters,
    sort: column,
    direction: newDirection,
    page: 1,
  }, {
    preserveState: true,
    preserveScroll: true,
  });
}

export function useQueryParams(): Record<string, string> {
  const { url } = usePage();
  return useMemo(() => {
    const query = url.split('?')[1] || '';
    return Object.fromEntries(new URLSearchParams(query).entries());
  }, [url]);
}
