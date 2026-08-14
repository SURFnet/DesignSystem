import { Component } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { phosphorPlus } from '@ng-icons/phosphor-icons/regular';
import {
  ICurveDataTableColumn,
  CurveDataTableImports,
  CurveDataTableActionColumn,
  CurveDataTableImageColumn,
  CurveDataTableSelectionColumn,
  CurveDataTableStringColumn,
  CurveDataTableRowEvent,
} from '@surfnet/curve-angular';

type App = {
  id: string;
  imageUrl?: string;
  app: string;
  vendor: string;
  revenue: number;
};

const data: App[] = [
  {
    id: '1',
    imageUrl: 'https://picsum.photos/seed/123/40',
    app: '10voordeleraar-loa1',
    vendor: '10voordeleraar-loa1',
    revenue: 199,
  },
  {
    id: '2',
    imageUrl: 'https://picsum.photos/seed/321/40',
    app: '10voordeleraar-loa2-without-interaction-with-mail',
    vendor: '10voordeleraar-loa2-without-interaction-with-mail',
    revenue: 199,
  },
  {
    id: '3',
    app: '10voordeleraar-loa2-without-interaction-with-mail',
    vendor: '10voordeleraar-loa2-without-interaction-with-mail',
    revenue: 199,
  },
  {
    id: '4',
    app: '10voordeleraar-loa2-without-interaction-with-mail',
    vendor: '10voordeleraar-loa2-without-interaction-with-mail',
    revenue: 199,
  },
  {
    id: '5',
    imageUrl: 'https://picsum.photos/seed/123/40',
    app: '10voordeleraar-loa1',
    vendor: '10voordeleraar-loa1',
    revenue: 199,
  },
  {
    id: '6',
    app: '10voordeleraar-loa2-without-interaction-with-mail',
    vendor: '10voordeleraar-loa2-without-interaction-with-mail',
    revenue: 199,
  },
  {
    id: '7',
    imageUrl: 'https://picsum.photos/seed/123/40',
    app: '10voordeleraar-loa1',
    vendor: '10voordeleraar-loa1',
    revenue: 199,
  },
  {
    id: '8',
    imageUrl: 'https://picsum.photos/seed/123/40',
    app: '10voordeleraar-loa1',
    vendor: '10voordeleraar-loa1',
    revenue: 199,
  },
];

@Component({
  selector: 'app-custom-data-table',
  templateUrl: './custom-data-table.component.html',
  imports: [CurveDataTableImports],
  providers: [provideIcons({ phosphorPlus })],
})
export class CustomDataTableComponent {
  public lastActionDisplay: string = '';
  public data = data;
  public columns: ICurveDataTableColumn[] = [
    new CurveDataTableSelectionColumn(),
    new CurveDataTableImageColumn('imageUrl'),
    new CurveDataTableStringColumn('app', 'App'),
    new CurveDataTableStringColumn('vendor', 'Vendor'),
    new CurveDataTableStringColumn('revenue', 'Revenue', (value: number) =>
      this.currencyFormatter.format(value),
    ),
    new CurveDataTableActionColumn(['Go to details', 'Set inactive']),
  ];

  private currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  protected rowActionTriggered(event: CurveDataTableRowEvent<App>) {
    this.lastActionDisplay = `'${event.action}' op rij ${event.record.id}`;
  }
}
