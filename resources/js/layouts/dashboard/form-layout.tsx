import { LucideIcon } from "lucide-react";

export default function FormLayout({ children, ...props }: { children: React.ReactNode; title: string; description: string ; icon: LucideIcon }) {
    return (
         <div className="md:grid md:grid-cols-2 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 dark:text-white">{props.title}</h3>
              <p className="mt-1 text-sm text-gray-400">
                {props.description} {props.icon && <props.icon className="inline-block h-4 w-4" />}
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <div className="shadow-md sm:rounded-md sm:overflow-hidden">
              <div className="px-4 py-5 dark:bg-neutral-900 space-y-6 sm:p-6">
                {children}
              </div>
            </div>
          </div>
        </div>
    );
}
