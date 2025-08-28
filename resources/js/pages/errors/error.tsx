import { Head, Link } from '@inertiajs/react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft, AlertTriangle, RefreshCw } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';

interface ErrorProps {
  status: number;
  title?: string;
  message?: string;
}

export default function Error({ status, title, message }: ErrorProps) {
  const getErrorInfo = () => {
    switch (status) {
      case 404:
        return {
          title: 'Page Not Found',
          message: 'Sorry, the page you\'re looking for doesn\'t exist or has been moved.',
          icon: '404'
        };
      case 403:
        return {
          title: 'Access Denied',
          message: 'You don\'t have permission to access this page.',
          icon: '403'
        };
      case 500:
        return {
          title: 'Server Error',
          message: 'Something went wrong on our end. Please try again later.',
          icon: '500'
        };
      default:
        return {
          title: title || 'Something Went Wrong',
          message: message || 'An unexpected error occurred. Please try again.',
          icon: status.toString()
        };
    }
  };

  const errorInfo = getErrorInfo();

  return (
    <AppLayout>
      <Head title={errorInfo.title} />

      <div className="min-h-screen bg-gradient-to-br dark:bg-dark">
        <div className="container mx-auto px-4 pt-8">
          <Card className="max-w-md mx-auto text-center">
            <CardContent className="p-8">
              {/* Error Icon/Number */}
              <div className="mb-6">
                {status === 404 ? (
                  <div className="text-8xl font-bold text-gray-300 dark:text-gray-600">
                    {errorInfo.icon}
                  </div>
                ) : (
                  <div className="flex justify-center mb-4">
                    <AlertTriangle className="w-16 h-16 text-red-500" />
                  </div>
                )}
              </div>

              {/* Error Message */}
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {errorInfo.title}
              </h1>

              <p className="text-gray-600 dark:text-gray-400 mb-8">
                {errorInfo.message}
              </p>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button asChild className="w-full">
                  <Link href={route('shop')}>
                    <Home className="w-4 h-4 mr-2" />
                    Go to Shop
                  </Link>
                </Button>

                <Button variant="outline" asChild className="w-full">
                  <Link href={route('dashboard')}>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Go to Dashboard
                  </Link>
                </Button>

                <Button
                  variant="ghost"
                  onClick={() => window.history.back()}
                  className="w-full"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Go Back
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
