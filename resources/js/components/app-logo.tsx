import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-12 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
                <AppLogoIcon className="size-24 fill-current text-white dark:text-black" />
            </div>
            <div className="md:hidden ml-1 grid flex-1 text-left">
                <span className="mb-0.5 truncate leading-tight font-semibold">VibeShop</span>
            </div>
        </>
    );
}
