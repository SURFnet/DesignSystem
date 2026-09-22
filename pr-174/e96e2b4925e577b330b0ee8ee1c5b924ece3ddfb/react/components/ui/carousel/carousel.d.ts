import { default as useEmblaCarousel, UseEmblaCarouselType } from 'embla-carousel-react';
import { CarouselOrientationName } from '@surfnet/curve-contracts';
import { Button } from '../button';
import * as React from '../../../../../../node_modules/.pnpm/react@19.2.7/node_modules/react';
type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];
type CarouselProps = {
    opts?: CarouselOptions;
    plugins?: CarouselPlugin;
    orientation?: CarouselOrientationName;
    setApi?: (api: CarouselApi) => void;
};
type CarouselContextProps = {
    carouselRef: ReturnType<typeof useEmblaCarousel>[0];
    api: ReturnType<typeof useEmblaCarousel>[1];
    scrollPrev: () => void;
    scrollNext: () => void;
    canScrollPrev: boolean;
    canScrollNext: boolean;
} & CarouselProps;
declare function useCarousel(): CarouselContextProps;
declare function Carousel({ orientation, opts, setApi, plugins, className, children, ...props }: React.ComponentProps<'div'> & CarouselProps): React.JSX.Element;
declare function CarouselContent({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element;
declare function CarouselItem({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element;
declare function CarouselPrevious({ className, variant, size, ...props }: React.ComponentProps<typeof Button>): React.JSX.Element;
declare function CarouselNext({ className, variant, size, ...props }: React.ComponentProps<typeof Button>): React.JSX.Element;
export { type CarouselApi, Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, useCarousel, };
