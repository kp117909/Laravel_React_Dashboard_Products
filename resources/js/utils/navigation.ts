
export function getLinkClass(variant?: string) {
    return `text-sm px-4 py-2 rounded-sm ${
        variant === "primary"
        ? "text-white bg-[#1b1b18] hover:bg-[#232323] dark:bg-[#EDEDEC] dark:text-[#18181b] dark:hover:bg-[#cfcfcf]"
        : "border border-[#19140035] text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
    }`;
}
