import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorCaretDown, phosphorCaretUp } from '@ng-icons/phosphor-icons/regular';
import { BrnAccordionImports } from '@spartan-ng/brain/accordion';
import { hlm } from '../../../utils/src';
import type { ClassValue } from 'clsx';

@Component({
  selector: 'hlm-accordion-trigger',
  imports: [BrnAccordionImports, NgIcon],
  providers: [provideIcons({ phosphorCaretDown, phosphorCaretUp })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h3 brnAccordionHeader class="curve-accordion-header">
      <button brnAccordionTrigger data-slot="accordion-trigger" [class]="_computedTriggerClass()">
        <ng-content />
        <ng-icon
          name="phosphorCaretDown"
          data-slot="accordion-trigger-icon"
          class="curve-accordion-icon curve-accordion-icon--collapsed"
        />
        <ng-icon
          name="phosphorCaretUp"
          data-slot="accordion-trigger-icon"
          class="curve-accordion-icon curve-accordion-icon--expanded"
        />
      </button>
    </h3>
  `,
})
export class HlmAccordionTrigger {
  public readonly triggerClass = input<ClassValue>('');

  protected readonly _computedTriggerClass = computed(() =>
    hlm('curve-accordion-trigger group/accordion-trigger', this.triggerClass()),
  );
}
