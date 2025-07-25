import AuthSplitLayout from '@/layouts/auth/auth-split-layout';

export default function AuthLayout({ children, title, description, ...props }: { children: React.ReactNode; title: string; description: string }) {
    return (
        <AuthSplitLayout {...props}>
            {children}
        </AuthSplitLayout>
    );
}
