import { usePage } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from 'react';
import debounce from "lodash/debounce";
import type { FormDataConvertible } from '@inertiajs/core';

export function getColumnId<T>(col: ColumnDef<T>): string {
  const raw = col.id ?? ("accessorKey" in col ? col.accessorKey : "");
  return typeof raw === "string" || typeof raw === "number" ? String(raw) : "";
}

export function goToPage(page: number, extraParams: Record<string, unknown> = {}) {
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
  currentFilters: Record<string, unknown> = {}
) {
  router.get(route(route().current()!), { ...currentFilters, page }, {
    preserveState: true,
    preserveScroll: true,
  });
}

export function createHandleSearch<T extends Record<string, FormDataConvertible>>(delay = 500) {
  return debounce((value: string, extraParams: T = {} as T) => {
    const url = new URL(window.location.href);
    const currentParams = Object.fromEntries(new URLSearchParams(url.search).entries()) as T;

    const mergedParams = {
      ...currentParams,
      ...extraParams,
      search: value,
    };

    router.get(route(route().current()!), mergedParams, {
      preserveState: true,
    });
  }, delay);
}


export function handleSort(
  column: string,
  currentFilters: Record<string, unknown> = {}
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

export function useBackToListUrl(indexRouteName: string) {
  const params = useQueryParams();
  const searchParams = new URLSearchParams(params).toString();
  return `${route(indexRouteName)}${searchParams ? "?" + searchParams : ""}`;
}


export function useLinkWithFilters() {
  const filterParams = useQueryParams();

  return function generateUrl(
    routeName: string,
    routeParams: string | number | Record<string, unknown> = {}
  ) {
    const normalizedParams =
      typeof routeParams === 'string' || typeof routeParams === 'number'
        ? { id: routeParams }
        : routeParams;

    const baseUrl = route(routeName, normalizedParams);
    const query = new URLSearchParams(filterParams).toString();
    return `${baseUrl}${query ? `?${query}` : ''}`;
  };
}

