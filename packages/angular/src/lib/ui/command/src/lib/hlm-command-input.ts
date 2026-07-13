import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorMagnifyingGlass } from '@ng-icons/phosphor-icons/regular';
import { BrnCommandInput } from '@spartan-ng/brain/command';
import { HlmInputGroupImports } from '../../../input-group/src';
import { classes } from '../../../utils/src';

@Component({
  selector: 'hlm-command-input',
  imports: [HlmInputGroupImports, NgIcon, BrnCommandInput],
  providers: [provideIcons({ phosphorMagnifyingGlass })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <hlm-input-group
      class="bg-input/30 border-input/30 h-8 rounded-lg shadow-none *:data-[slot=input-group-addon]:pl-2"
    >
      <input
        brnCommandInput
        data-slot="command-input"
        class="w-full text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50"
        [id]="inputId()"
        [placeholder]="placeholder()"
      />

      <hlm-input-group-addon>
        <ng-icon name="phosphorMagnifyingGlass" />
      </hlm-input-group-addon>
    </hlm-input-group>
  `,
})
export class HlmCommandInput {
  public readonly inputId = input<string | undefined>();
  public readonly placeholder = input<string>('');

  constructor() {
    classes(() => 'p-1 pb-0');
  }
}
