import AppLogoIcon from '@/components/app-logo-icon';
import ReturnButton from '@/components/return-button';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
  title?: string;
  description?: string;
}

export default function AuthSplitLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
  return (
    <div className="relative grid h-dvh flex-col items-center justify-center px-8 sm:px-0 lg:max-w-none lg:grid-cols-2 lg:px-0">

      {/* LEFT COLUMN */}
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        {/* ReturnButton desktop */}
        <div className="relative z-30 mb-4">
          <ReturnButton href={route('shop')} label="Return to Shop" iconPosition="left" />
        </div>

        <div className="absolute inset-0 bg-zinc-900 z-0" />

        <Link href={route('shop')} className="relative z-20 flex items-center text-lg font-medium">
          <AppLogoIcon className="mr-2 size-190 fill-current text-white" />
        </Link>

        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">"Find best Vibe in your present and future"</p>
            <footer className="text-sm text-neutral-300">Kamil Polak Web Developer</footer>
          </blockquote>
        </div>
      </div>

      {/* RIGHT COLUMN */}
      <div className="w-full lg:p-8">
        <div className="relative mx-auto flex w-full flex-col justify-center sm:w-[320px]">

            {/* MOBILE Return Button — widoczny tylko na małych ekranach */}
            <div className="absolute left-0 top-0 z-20 lg:hidden">
            <ReturnButton
                href={route('shop')}
                label="Return"
                iconPosition="left"
                className="p-2"
            />
            </div>

            {/* Mobile logo */}
            <div className="flex justify-center lg:hidden mt-2">
            <Link href={route('shop')} className="z-10 flex items-center justify-center">
                <AppLogoIcon className="size-36 fill-current text-white" />
            </Link>
            </div>

            {/* Title + Description */}
            <div className="flex flex-col items-start gap-2 text-left sm:items-center sm:text-center">
            <h1 className="text-xl font-medium">{title}</h1>
            <p className="text-sm text-balance text-muted-foreground">{description}</p>
            </div>

            {children}
        </div>
        </div>
    </div>
  );
}
