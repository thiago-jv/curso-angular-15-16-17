import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarVavigationComponent } from './toolbar-vavigation.component';

describe('ToolbarVavigationComponent', () => {
  let component: ToolbarVavigationComponent;
  let fixture: ComponentFixture<ToolbarVavigationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToolbarVavigationComponent]
    });
    fixture = TestBed.createComponent(ToolbarVavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
