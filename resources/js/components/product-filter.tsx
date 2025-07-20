import React from 'react';

export default function ProductFilters() {
    return (
        <aside className="w-full lg:w-72 bg-white dark:bg-[#18181b] rounded-lg shadow p-6 mb-8 lg:mb-0 lg:mr-8 mt-16 h-fit">
            <h1 className="text-lg font-semibold mb-4 dark:text-white">Filtry</h1>
            <form className="flex flex-col gap-3">
                <input
                    type="text"
                    name="search"
                    placeholder="Szukaj..."
                    className="border rounded px-3 py-2 text-sm dark:bg-[#232323] dark:text-white"
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Cena max"
                    className="border rounded px-3 py-2 text-sm dark:bg-[#232323] dark:text-white"
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Opis"
                    className="border rounded px-3 py-2 text-sm dark:bg-[#232323] dark:text-white"
                />
                <input
                    type="date"
                    name="created_at"
                    placeholder="Data utworzenia"
                    className="border rounded px-3 py-2 text-sm dark:bg-[#232323] dark:text-white"
                />
                <input
                    type="number"
                    name="reviews_count"
                    placeholder="Min. recenzji"
                    className="border rounded px-3 py-2 text-sm dark:bg-[#232323] dark:text-white"
                />
                <select
                    name="is_available"
                    className="border rounded px-3 py-2 text-sm dark:bg-[#232323] dark:text-white"
                >
                    <option value="">Dostępność</option>
                    <option value="1">Dostępny</option>
                    <option value="0">Niedostępny</option>
                </select>
                <input
                    type="number"
                    name="category_id"
                    placeholder="ID kategorii"
                    className="border rounded px-3 py-2 text-sm dark:bg-[#232323] dark:text-white"
                />
                <button
                    type="submit"
                    className="bg-[#1b1b18] text-white rounded px-4 py-2 mt-2 hover:bg-[#232323] dark:bg-[#EDEDEC] dark:text-[#18181b] dark:hover:bg-[#cfcfcf]"
                >
                    Filtruj
                </button>
            </form>
        </aside>
    );
}
