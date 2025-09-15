import { useCallback, useEffect, useState, useRef } from 'react';
import { Link } from '@inertiajs/react';
import { type Product } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Star, TrendingUp } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

interface BestsellersCarouselProps {
  products: Product[];
}

export function BestsellersCarousel({ products }: BestsellersCarouselProps) {
  const autoplayRef = useRef(Autoplay({ delay: 5000 }));

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'center'
    },
    [autoplayRef.current]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  const scrollToSlide = useCallback((index: number) => {
    if (!emblaApi) return;
    emblaApi.scrollTo(index);

    if (autoplayRef.current) {
      autoplayRef.current.stop();
      autoplayRef.current.play();
    }
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  if (!products.length) {
    return null;
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-center mb-6">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-black dark:text-white" />
          <h2 className="text-2xl font-bold text-[#1b1b18] dark:text-[#EDEDEC]">
            Best Selling Books
          </h2>
        </div>
      </div>

      {/* Embla Carousel */}
      <div className="embla overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex">
          {products.map((product) => (
            <div key={product.id} className="embla__slide flex-[0_0_100%] min-w-0">
              <Link href={`/shop/products/${product.id}`}>
                <div className="group cursor-pointer transition-all duration-300 hover:opacity-90 bg-gray-50 dark:bg-[#18181b] rounded-lg overflow-hidden mx-4">
                  <div className="flex flex-col lg:flex-row items-center gap-8 p-8">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <div className="w-168 h-96 overflow-hidden rounded-lg bg-gray-100 dark:bg-background">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            No Image
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 space-y-4 text-center lg:text-left">
                      <div className="flex items-center justify-center lg:justify-start gap-3">
                        <Badge variant="secondary" className="text-sm">
                          {product.category?.name || 'Book'}
                        </Badge>
                        {product.average_rating && (
                          <div className="flex items-center gap-1">
                            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                            <span className="text-lg font-medium">
                              {product.average_rating.toFixed(1)}
                            </span>
                          </div>
                        )}
                      </div>

                      <h3 className="font-bold text-3xl lg:text-4xl group-hover:text-black dark:group-hover:text-white transition-colors">
                        {product.name}
                      </h3>

                      <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
                        {product.description}
                      </p>

                      <div className="space-y-3">
                        <div className="text-4xl font-bold text-black dark:text-white">
                          ${product.price.toFixed(2)}
                        </div>
                        {product.reviews_count > 0 && (
                          <div className="text-lg text-gray-500">
                            ({product.reviews_count} reviews)
                          </div>
                        )}
                      </div>

                      {!product.is_available && (
                        <Badge variant="destructive" className="text-lg px-4 py-2">
                          Out of Stock
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Dots */}
      {products.length > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {products.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === selectedIndex
                  ? 'bg-black dark:bg-white scale-125'
                  : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
              }`}
              aria-label={`Go to item ${index + 1}`}
            />
          ))}
        </div>
      )}

    </div>
  );
}
