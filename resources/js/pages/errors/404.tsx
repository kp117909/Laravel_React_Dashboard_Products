import { Head, Link } from '@inertiajs/react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft, Search } from 'lucide-react';
import AppShopLayout from '@/layouts/app/app-navigation-layout';

export default function NotFound() {
  return (
    <AppShopLayout>
      <Head title="Page Not Found" />
          <Card className="max-w-md mx-auto text-center">
            <CardContent className="p-8">
              {/* 404 Number */}
              <div className="text-8xl font-bold text-gray-300 dark:text-gray-600 mb-4">
                404
              </div>

              {/* Error Message */}
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Page Not Found
              </h1>

              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Sorry, the page you're looking for doesn't exist or has been moved.
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
                    <Search className="w-4 h-4 mr-2" />
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
    </AppShopLayout>
  );
}
