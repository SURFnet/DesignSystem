import { Combobox as ComboboxPrimitive } from '@base-ui/react';
import * as React from '../../../../../../node_modules/.pnpm/react@19.2.7/node_modules/react';
declare function Combobox(props: React.ComponentProps<typeof ComboboxPrimitive.Root>): React.JSX.Element;
declare function ComboboxValue({ ...props }: ComboboxPrimitive.Value.Props): React.JSX.Element;
declare function ComboboxTrigger({ className, children, 'aria-controls': ariaControlsProp, ...props }: ComboboxPrimitive.Trigger.Props): React.JSX.Element;
declare function ComboboxInput({ className, children, disabled, showTrigger, showClear, ...props }: ComboboxPrimitive.Input.Props & {
    showTrigger?: boolean;
    showClear?: boolean;
}): React.JSX.Element;
declare function ComboboxContent({ className, side, sideOffset, align, alignOffset, anchor, ...props }: ComboboxPrimitive.Popup.Props & Pick<ComboboxPrimitive.Positioner.Props, 'side' | 'align' | 'sideOffset' | 'alignOffset' | 'anchor'>): React.JSX.Element;
declare function ComboboxList({ className, id, ...props }: ComboboxPrimitive.List.Props): React.JSX.Element;
declare function ComboboxItem({ className, children, ...props }: ComboboxPrimitive.Item.Props): React.JSX.Element;
declare function ComboboxGroup({ className, ...props }: ComboboxPrimitive.Group.Props): React.JSX.Element;
declare function ComboboxLabel({ className, ...props }: ComboboxPrimitive.GroupLabel.Props): React.JSX.Element;
declare function ComboboxCollection({ ...props }: ComboboxPrimitive.Collection.Props): React.JSX.Element;
declare function ComboboxEmpty({ className, ...props }: ComboboxPrimitive.Empty.Props): React.JSX.Element;
declare function ComboboxSeparator({ className, ...props }: ComboboxPrimitive.Separator.Props): React.JSX.Element;
declare function ComboboxChips({ className, ...props }: React.ComponentPropsWithRef<typeof ComboboxPrimitive.Chips> & ComboboxPrimitive.Chips.Props): React.JSX.Element;
declare function ComboboxChip({ className, children, showRemove, removeLabel, ...props }: ComboboxPrimitive.Chip.Props & {
    showRemove?: boolean;
    /** Accessible name for the remove button. Include the chip's own label for screen reader clarity. */
    removeLabel?: string;
}): React.JSX.Element;
declare function ComboboxChipsInput({ className, ...props }: ComboboxPrimitive.Input.Props): React.JSX.Element;
declare function useComboboxAnchor(): React.RefObject<HTMLDivElement | null>;
export { Combobox, ComboboxInput, ComboboxContent, ComboboxList, ComboboxItem, ComboboxGroup, ComboboxLabel, ComboboxCollection, ComboboxEmpty, ComboboxSeparator, ComboboxChips, ComboboxChip, ComboboxChipsInput, ComboboxTrigger, ComboboxValue, useComboboxAnchor, };
