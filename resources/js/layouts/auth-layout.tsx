import AuthSplitLayout from '@/layouts/auth/auth-split-layout';

export default function AuthLayout({ children, ...props }: { children: React.ReactNode; title: string; description: string }) {
    return (
        <AuthSplitLayout {...props}>
            {children}
        </AuthSplitLayout>
    );
}
