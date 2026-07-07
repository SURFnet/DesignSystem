import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorMoon, phosphorPalette, phosphorSun } from '@ng-icons/phosphor-icons/regular';
import { HlmButtonImports, HlmDropdownMenuImports } from '@surfnet/curve-angular';
import { themes, type ThemeMode, type ThemeName } from '@surfnet/curve-tokens';

type StoredTheme = {
  theme: ThemeName;
  mode: ThemeMode;
};

const STORAGE_KEY = 'surf-theme';

function titleCase(value: string): string {
  return value
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

@Component({
  selector: 'app-theme-switcher',
  templateUrl: './theme-switcher.component.html',
  imports: [HlmButtonImports, HlmDropdownMenuImports, NgIcon],
  providers: [provideIcons({ phosphorMoon, phosphorPalette, phosphorSun })],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeSwitcherComponent {
  protected readonly themeNames = Object.keys(themes) as ThemeName[];

  protected readonly mode = signal<ThemeMode>('light');
  protected readonly theme = signal<ThemeName>('default');

  constructor() {
    this.restore();
    this.apply();
  }

  protected titleCase(value: string): string {
    return titleCase(value);
  }

  protected setMode(mode: ThemeMode): void {
    this.mode.set(mode);
    this.apply();
    this.persist();
  }

  protected setTheme(theme: ThemeName): void {
    this.theme.set(theme);
    this.apply();
    this.persist();
  }

  private restore(): void {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return;
    }
    try {
      const stored = JSON.parse(raw) as Partial<StoredTheme>;
      if (stored.mode === 'light' || stored.mode === 'dark') {
        this.mode.set(stored.mode);
      }
      if (stored.theme && stored.theme in themes) {
        this.theme.set(stored.theme);
      }
    } catch {
      // ignore malformed stored value
    }
  }

  private apply(): void {
    const root = document.documentElement;
    root.classList.toggle('dark', this.mode() === 'dark');

    for (const className of Array.from(root.classList)) {
      if (className.startsWith('theme-')) {
        root.classList.remove(className);
      }
    }
    const theme = this.theme();
    if (theme !== 'default') {
      root.classList.add(`theme-${theme}`);
    }
  }

  private persist(): void {
    const stored: StoredTheme = { theme: this.theme(), mode: this.mode() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
  }
}
