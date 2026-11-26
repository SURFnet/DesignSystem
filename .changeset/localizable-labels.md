---
'@surfnet/curve-react': minor
'@surfnet/curve-angular': minor
'@surfnet/curve-microcopy': patch
---

Translate built-in texts that were fixed before (#311). New props/inputs, all with the old English text as default:

- React: `closeLabel` (`DialogContent`, `SheetContent`), `closeText` (`DialogFooter`), `srOnlyText` (`BreadcrumbEllipsis`, `SidebarTrigger`, `CarouselPrevious`, `CarouselNext`), `mobileTitle` and `mobileDescription` (`Sidebar`), `itemsPerPageLabel` (`NumberedPagination`), `openLabel` and `clearLabel` (`ComboboxInput`), `formatDate` (`DatePicker`), `formatDate` and `formatRange` (`DateRangePicker`).
- Angular: `closeLabel` (`hlm-dialog-content`, `hlm-sheet-content`), `srOnlyText` (`hlmCarouselPrevious`, `hlmCarouselNext`), `aria-roledescription` (`hlmCarousel`, `hlmCarouselItem`), `itemsPerPageLabel` (`hlm-numbered-pagination`), `openLabel` and `clearLabel` (`hlm-combobox-input`), `openLabel` (`hlm-combobox-trigger`), `monthSelectLabel` and `yearSelectLabel` (`hlm-calendar`).

Fixes: screen readers now read the breadcrumb ellipsis text (React and Angular; Angular's `srOnlyText` was not shown at all), and Angular's dialog close button now says "Close" instead of "close".
