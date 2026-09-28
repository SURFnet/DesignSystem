import { Directive } from '@angular/core';
import {
  BrnTooltip,
  BrnTooltipPosition,
  provideBrnTooltipDefaultOptions,
} from '@spartan-ng/brain/tooltip';
import { hlm } from '../../../utils/src';

// Styling lives in ./hlm-tooltip.css.
export const DEFAULT_TOOLTIP_SVG_CLASS = 'curve-tooltip-arrow-svg';

export const DEFAULT_TOOLTIP_CONTENT_CLASSES = 'curve-tooltip';

const tooltipArrowPositionClasses = {
  top: 'curve-tooltip-arrow--top',
  bottom: 'curve-tooltip-arrow--bottom',
  left: 'curve-tooltip-arrow--left',
  right: 'curve-tooltip-arrow--right',
} satisfies Record<BrnTooltipPosition, string>;

export function tooltipPositionVariants({
  position,
}: { position?: BrnTooltipPosition | null } = {}) {
  return position
    ? `curve-tooltip-arrow ${tooltipArrowPositionClasses[position]}`
    : 'curve-tooltip-arrow';
}

@Directive({
  selector: '[hlmTooltip]',
  providers: [
    provideBrnTooltipDefaultOptions({
      svgClasses: DEFAULT_TOOLTIP_SVG_CLASS,
      tooltipContentClasses: DEFAULT_TOOLTIP_CONTENT_CLASSES,
      arrowClasses: (position: BrnTooltipPosition) => hlm(tooltipPositionVariants({ position })),
    }),
  ],
  hostDirectives: [
    {
      directive: BrnTooltip,
      inputs: ['brnTooltip: hlmTooltip', 'position', 'hideDelay', 'showDelay', 'tooltipDisabled'],
    },
  ],
})
export class HlmTooltip {}
