import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout title="Log in to your account" description="Enter your email and password below to log in">
            <Head title="Log in" />

            <form
            onSubmit={submit}
            className="flex flex-col gap-6 w-full max-w-sm mx-auto px-4 sm:px-0"
            >
            <div className="grid gap-6">
                {/* Email */}
                <div className="grid gap-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                    id="email"
                    type="email"
                    required
                    autoFocus
                    autoComplete="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    placeholder="email@example.com"
                    className="w-full"
                />
                <InputError message={errors.email} />
                </div>

                {/* Password */}
                <div className="grid gap-2">
                <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    {canResetPassword && (
                    <TextLink href={route('password.request')} className="ml-auto text-sm">
                        Forgot password?
                    </TextLink>
                    )}
                </div>
                <Input
                    id="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    placeholder="Password"
                    className="w-full"
                />
                <InputError message={errors.password} />
                </div>

                {/* Remember Me */}
                <div className="flex items-center gap-3">
                <Checkbox
                    id="remember"
                    name="remember"
                    checked={data.remember}
                    onClick={() => setData('remember', !data.remember)}
                />
                <Label htmlFor="remember">Remember me</Label>
                </div>

                {/* Submit */}
                <Button type="submit" className="mt-4 w-full" disabled={processing}>
                {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
                Log in
                </Button>
            </div>

            {/* Link to register */}
            <div className="text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{' '}
                <TextLink href={route('register')}>
                Sign up
                </TextLink>
            </div>

            {/* Status message */}
            {status && (
                <div className="mt-4 text-center text-sm font-medium text-green-600">
                {status}
                </div>
            )}
            </form>


            {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}
        </AuthLayout>
    );
}
