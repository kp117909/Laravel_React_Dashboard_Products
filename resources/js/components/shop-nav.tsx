import { Link, usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';

export default function ShopNav() {
    const { auth } = usePage<SharedData>().props;

    return (
        <nav className="fixed top-0 left-0 w-full flex items-center justify-between gap-4 bg-[#FDFDFC] dark:bg-[#0a0a0a] px-6 py-3 shadow z-50">
            {/* Ikona po lewej stronie */}
            <div className="flex items-center h-12">
                <img
                    src="/images/vibeshop_no_photo.png"
                    alt="Logo"
                    className="h-20 w-20 object-contain mr-4 rounded" // większy rozmiar, obrazek nie rozciąga paska
                    style={{ maxHeight: '80px' }}
                />
            </div>
            {/* Linki nawigacyjne po prawej */}
            <div className="flex items-center gap-4">
                {auth.user ? (
                    <>
                        <Link
                            href={route('dashboard')}
                            className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                        >
                            Dashboard
                        </Link>
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-white bg-[#1b1b18] hover:bg-[#232323] dark:bg-[#EDEDEC] dark:text-[#18181b] dark:hover:bg-[#cfcfcf]"
                        >
                            Logout
                        </Link>
                    </>
                ) : (
                    <>
                        <Link
                            href={route('login')}
                            className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                        >
                            Log in
                        </Link>
                        <Link
                            href={route('register')}
                            className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                        >
                            Register
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}
