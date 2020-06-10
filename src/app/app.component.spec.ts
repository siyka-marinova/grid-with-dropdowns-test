import { GridModule } from '@progress/kendo-angular-grid';
import {
  async,
  TestBed,
  tick,
  fakeAsync,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';
import { DropDownListModule, DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { POPUP_CONTAINER } from '@progress/kendo-angular-popup';
import { ElementRef } from '@angular/core';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        DropDownListModule,
        NoopAnimationsModule,
        GridModule,
        DropDownsModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        {
          provide: POPUP_CONTAINER,
          useFactory: () => {
            return { nativeElement: document.body } as ElementRef;
          }
        }
      ]
    }).compileComponents();
  }));

  afterEach(() => {
    Array.from(document.body.querySelectorAll('kendo-popup'))
        .map(node => document.body.removeChild(node));
  });

  const togglePopupFactory = selector => (fixture: any, toggle: boolean = true) => {
      const component: any = fixture.debugElement.query(By.css(selector)).componentInstance;
      component.toggle(toggle);
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      tick();
  };
  const togglePopup = togglePopupFactory('kendo-dropdownlist');
  const getPopup = (fixture: any): any => {
      const popup: any = fixture.debugElement.query(By.css('kendo-dropdownlist')).componentInstance.popupRef;
      return popup ? popup.popupElement : null;
  };
  const ddlFixture = (fixture: any) => fixture.debugElement.query(By.css('kendo-dropdownlist'));
  const getComponentInstance = (fixture: any) => ddlFixture(fixture).componentInstance;
  const getPopupElement: any = (fixture: any) => getComponentInstance(fixture).popupRef.popupElement;

  it('should open a dropdown', fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    togglePopup(fixture);

    const popup: any = getPopupElement(fixture).children[0];
    // expect(popup).toHaveCssClass('k-popup');
    expect(popup).not.toBeNull();

    fixture.destroy();
  }));

  it('should set dropdown value', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    const dropdownlist: any = fixture.debugElement.query(By.css('kendo-dropdownlist')).componentInstance;
    dropdownlist.onKeyPress({ charCode: 'm'.charCodeAt(0) });

    fixture.detectChanges();

    expect(dropdownlist.selectionService.selected[0]).toEqual(2);
  });
});

