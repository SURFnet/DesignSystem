import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorDotsThreeVertical } from '@ng-icons/phosphor-icons/regular';
import { HlmButton } from '../../../button/src';
import { HlmDropdownMenuImports } from '../../../dropdown-menu/src';

/**
 * A page action. Mark one as `primary`; the others are shown as ghost buttons.
 * `icon` is an ng-icons name; register it with `provideIcons` in your app.
 */
export interface CurvePageHeaderAction {
  id: string;
  label: string;
  icon?: string;
  primary?: boolean;
}

/**
 * The page actions. Wide: secondary actions, then the primary action on the right.
 * Narrow: the primary action, one secondary action, and the rest in a "More actions" menu.
 * Built from a list so both layouts always show the same actions.
 */
@Component({
  selector: 'curve-page-header-actions',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HlmButton, HlmDropdownMenuImports, NgIcon],
  providers: [provideIcons({ phosphorDotsThreeVertical })],
  host: {
    class: 'curve-page-header-actions',
    'data-slot': 'curve-page-header-actions',
  },
  template: `
    @for (action of secondary(); track action.id; let first = $first) {
      <button
        hlmBtn
        variant="ghost"
        [class.curve-page-header-overflow-action]="!first"
        (click)="actionTriggered.emit(action)"
      >
        @if (action.icon) {
          <ng-icon [name]="action.icon" data-icon="inline-start" aria-hidden="true" />
        }
        {{ action.label }}
      </button>
    }
    @if (primary(); as primaryAction) {
      <button
        hlmBtn
        class="curve-page-header-primary-action"
        (click)="actionTriggered.emit(primaryAction)"
      >
        @if (primaryAction.icon) {
          <ng-icon [name]="primaryAction.icon" data-icon="inline-start" aria-hidden="true" />
        }
        {{ primaryAction.label }}
      </button>
    }
    @if (overflow().length > 0) {
      <button
        hlmBtn
        variant="ghost"
        size="icon"
        class="curve-page-header-more-actions"
        align="start"
        [hlmDropdownMenuTrigger]="moreMenu"
        [attr.aria-label]="moreActionsLabel()"
      >
        <ng-icon name="phosphorDotsThreeVertical" aria-hidden="true" />
      </button>
      <ng-template #moreMenu>
        <hlm-dropdown-menu class="curve-page-header-more-actions-menu">
          @for (action of overflow(); track action.id) {
            <button hlmDropdownMenuItem (triggered)="actionTriggered.emit(action)">
              @if (action.icon) {
                <ng-icon [name]="action.icon" aria-hidden="true" />
              }
              {{ action.label }}
            </button>
          }
        </hlm-dropdown-menu>
      </ng-template>
    }
  `,
})
export class CurvePageHeaderActionsComponent {
  public readonly actions = input.required<CurvePageHeaderAction[]>();
  /** Accessible name of the overflow menu button on narrow screens. */
  public readonly moreActionsLabel = input<string>('More actions');
  /** Emits when someone clicks an action button or picks one from the overflow menu. */
  public readonly actionTriggered = output<CurvePageHeaderAction>();

  protected readonly primary = computed(() => this.actions().find((action) => action.primary));
  protected readonly secondary = computed(() =>
    this.actions().filter((action) => action !== this.primary()),
  );
  // Narrow screens show the primary action and one secondary action; the rest go in the menu.
  protected readonly overflow = computed(() => this.secondary().slice(1));
}
