import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBoxContentComponent } from './dialog-box-content.component';

describe('DialogBoxContentComponent', () => {
  let component: DialogBoxContentComponent;
  let fixture: ComponentFixture<DialogBoxContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogBoxContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogBoxContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
