import { sampleProducts } from './products';
import { Component } from '@angular/core';

@Component({
  selector: "app-root",
  template: `
    <kendo-grid [data]="gridData">
      <ng-template kendoGridToolbarTemplate>
        <kendo-dropdownlist [(value)]="value" [data]="listItems">
        </kendo-dropdownlist>
      </ng-template>
      <kendo-grid-column field="ProductName">
        <ng-template
          kendoGridHeaderTemplate
          let-column
          let-columnIndex="columnIndex"
        >
          {{ column.field }}({{ columnIndex }})
        </ng-template>
      </kendo-grid-column>
      <kendo-grid-column field="size">
        <ng-template kendoGridCellTemplate let-dataItem>
          <kendo-dropdownlist [(value)]="dataItem.size" [data]="listItems">
          </kendo-dropdownlist>
        </ng-template>
      </kendo-grid-column>
    </kendo-grid>
  `
})
export class AppComponent {
  public gridData: any[] = sampleProducts;
  public value = "Small";
  public listItems: Array<string> = [
    "X-Small",
    "Small",
    "Medium",
    "Large",
    "X-Large",
    "2X-Large"
  ];
  public title = 'Grid with dropdowns';
}