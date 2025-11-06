import { Injectable } from '@angular/core';
import { BehaviorSubject, map, take } from 'rxjs';
import { GetAllProductsResponse } from 'src/app/models/interfaces/products/response/GetAllProductResponse';

@Injectable({
  providedIn: 'root'
})
export class ProductsDataTransferService {

  private productsDataEmitters$ = new BehaviorSubject<GetAllProductsResponse[]>([]);
  private productsDatas: GetAllProductsResponse[] = [];

  constructor() {}

  setProductsDatas(products: GetAllProductsResponse[]): void {
    if (products) {
      this.productsDataEmitters$.next(products);
      this.getProductsDatas();
    }
  }

  getProductsDatas(): GetAllProductsResponse[] {
    this.productsDataEmitters$
      .pipe(
        take(1),
        map((data) => data?.filter((product) => product.amount > 0))
      )
      .subscribe((response) => {
        if (response) {
          this.productsDatas = response;
        }
      });

    return this.productsDatas;
  }
}