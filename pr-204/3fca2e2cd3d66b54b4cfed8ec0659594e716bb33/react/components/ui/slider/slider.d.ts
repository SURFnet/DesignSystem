import { Slider as SliderPrimitive } from '@base-ui/react/slider';
import { SliderOrientationName } from '@surfnet/curve-contracts';
type SliderProps = Omit<SliderPrimitive.Root.Props, 'orientation'> & {
    orientation?: SliderOrientationName;
};
declare function Slider({ className, defaultValue, value, min, max, 'aria-label': ariaLabel, getAriaLabel, ...props }: SliderProps & {
    /** Accessible name applied to every thumb. Use `getAriaLabel` instead for range sliders where each thumb needs a distinct name. */
    'aria-label'?: string;
    getAriaLabel?: SliderPrimitive.Thumb.Props['getAriaLabel'];
}): import("react").JSX.Element;
export { Slider };
