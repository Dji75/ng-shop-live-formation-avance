import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsManagement } from './dashboard-product-management';

describe('DashboardProductManagement', () => {
  let component: ProductsManagement;
  let fixture: ComponentFixture<ProductsManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsManagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsManagement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
