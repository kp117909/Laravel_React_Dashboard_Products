import AppLogoIcon from './app-logo-icon';

interface AppLogoProps {
  size?: number | string; // np. 12, '16', '3rem'
  shopName?: string;
  className?: string;
}

export default function AppLogo({
  size = 12,
  shopName = 'VibeShop',
  className = '',
}: AppLogoProps) {
  const tailwindSize = typeof size === 'number' ? `size-${size}` : size;

  return (
    <div className={`flex items-center ${className}`}>
      <div
        className={`flex aspect-square items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground ${tailwindSize}`}
      >
        <AppLogoIcon className="w-full h-full fill-current text-white dark:text-black" />
      </div>

      <div className="md:hidden ml-1 grid flex-1 text-left">
        <span className="mb-0.5 truncate leading-tight font-semibold">{shopName}</span>
      </div>
    </div>
  );
}
