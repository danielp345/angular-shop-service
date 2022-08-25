import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryItemDialogComponent } from './history-item-dialog.component';

describe('HistoryItemDialogComponent', () => {
  let component: HistoryItemDialogComponent;
  let fixture: ComponentFixture<HistoryItemDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryItemDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
