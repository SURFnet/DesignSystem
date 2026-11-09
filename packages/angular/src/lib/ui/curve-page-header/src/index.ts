import {
  CurvePageHeaderBadges,
  CurvePageHeaderComponent,
  CurvePageHeaderContent,
  CurvePageHeaderDescription,
  CurvePageHeaderMedia,
  CurvePageHeaderTab,
  CurvePageHeaderTabs,
  CurvePageHeaderTitle,
} from './lib/curve-page-header';
import { CurvePageHeaderActionsComponent } from './lib/curve-page-header-actions';

export * from './lib/curve-page-header';
export * from './lib/curve-page-header-actions';

export const CurvePageHeaderImports = [
  CurvePageHeaderComponent,
  CurvePageHeaderMedia,
  CurvePageHeaderContent,
  CurvePageHeaderTitle,
  CurvePageHeaderBadges,
  CurvePageHeaderDescription,
  CurvePageHeaderActionsComponent,
  CurvePageHeaderTabs,
  CurvePageHeaderTab,
] as const;
