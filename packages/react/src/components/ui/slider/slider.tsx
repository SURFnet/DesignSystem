'use client';

import { Slider as SliderPrimitive } from '@base-ui/react/slider';
import type { SliderOrientationName } from '@surfnet/curve-contracts';

import { cn } from '@/lib/utils';

import styles from './slider.module.css';

type SliderProps = Omit<SliderPrimitive.Root.Props, 'orientation'> & {
  orientation?: SliderOrientationName;
};

function Slider({ className, defaultValue, value, min = 0, max = 100, ...props }: SliderProps) {
  const _values = Array.isArray(value)
    ? value
    : Array.isArray(defaultValue)
      ? defaultValue
      : [min, max];

  return (
    <SliderPrimitive.Root
      className={cn(styles.root, className)}
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      thumbAlignment="edge"
      {...props}
    >
      <SliderPrimitive.Control className={styles.control}>
        <SliderPrimitive.Track data-slot="slider-track" className={styles.track}>
          <SliderPrimitive.Indicator data-slot="slider-range" className={styles.indicator} />
        </SliderPrimitive.Track>
        {Array.from({ length: _values.length }, (_, index) => (
          <SliderPrimitive.Thumb data-slot="slider-thumb" key={index} className={styles.thumb} />
        ))}
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  );
}

export { Slider };
