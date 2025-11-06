import { ProductsDataTransferService } from './../../../../shared/services/products/products-data-transfer.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { GetAllCategoriesResponse } from 'src/app/models/interfaces/categories/responses/GetCategoriesResponse';
import { CreateProductRequest } from 'src/app/models/interfaces/products/request/CreateProductRequest';
import { ProductsService } from 'src/app/services/products/products.service';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { EventAction } from 'src/app/models/interfaces/products/event/EventAction';
import { GetAllProductsResponse } from 'src/app/models/interfaces/products/response/GetAllProductResponse';
import { ProductEvent } from 'src/app/models/enuns/products/ProductEvent';
import { EditProductRequest } from 'src/app/models/interfaces/products/request/EditProductRequest';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: []
})
export class ProductFormComponent implements OnInit, OnDestroy{

  private readonly destroy$: Subject<void> = new Subject();

  public categoriesDatas: Array<GetAllCategoriesResponse> = [];
  public selectedCategory: Array<{name: string; code: string}> = [];

  public productAction!: {
    event: EventAction;
    productDatas: Array<GetAllProductsResponse>
  }

  public productSelectedDatas!: GetAllProductsResponse;

  public productsDatas: Array<GetAllProductsResponse>= [];

  public addProductForm = this.formBuilder.group({
    name: ['', Validators.required],
    price: ['', Validators.required],
    description: ['', Validators.required],
    category_id: ['', Validators.required],
    amount: [0, Validators.required]
  });

  public editProductForm = this.formBuilder.group({
    name: ['', Validators.required],
    price: ['', Validators.required],
    description: ['', Validators.required],
    amount: [0, Validators.required]
  });

  public addProductAction = ProductEvent.ADD_PRODUCT_EVENT;
  public editProductAction = ProductEvent.EDIT_PRODUCT_EVENT;
  public saleProductAction = ProductEvent.SALE_PRODUCT_EVENT;

  constructor(
    private categoriesService: CategoriesService,
    private productService: ProductsService,
    private productsDataTransferService: ProductsDataTransferService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private router: Router,
    public ref: DynamicDialogConfig,
  ){}

  ngOnInit(): void {
    this.productAction = this.ref.data;

    if(this.productAction?.event?.action === this.editProductAction && this.productAction?.productDatas){
      Promise.resolve().then(() => {
        this.getProductSelectedDatas(this.productAction?.event?.id as string);
      });
    }

    if(this.productAction?.event?.action === this.saleProductAction){
      this.getProductDatas();
    }

    this.getAllCategories();
  }

  getAllCategories(): void {
    this.categoriesService.getAllCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if(response.length > 0){
            this.categoriesDatas = response;
          }
        },
      });
  }

  handleSubmitAddProduct(): void {
    if(this.addProductForm?.valid){
     const requestCreateProduct: CreateProductRequest = {
      name: this.addProductForm.value.name!,
      price: this.addProductForm.value.price!,
      description: this.addProductForm.value.description!,
      category_id: this.addProductForm.value.category_id!,
      amount: Number(this.addProductForm.value.amount),
     };

     this.productService.createProduct(requestCreateProduct)
     .pipe(takeUntil(this.destroy$))
     .subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Produto criado com sucesso!',
          life: 2000,
        });
        this.addProductForm.reset();
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao criar Produto!',
          life: 2000,
        });
      }
     });
    }
  }

  handleSubmitEditProduct(): void {
    if (this.editProductForm.valid && this.productAction.event.id) {

      const requestEditProduct: EditProductRequest = {
        name: this.editProductForm.value.name!,
        price: this.editProductForm.value.price!,
        description: this.editProductForm.value.description!,
        product_id: this.productAction.event.id,
        amount: Number(this.editProductForm.value.amount),
      };

      this.productService.editProduct(requestEditProduct)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Produto editado com sucesso',
            life: 2500,
          });
          this.editProductForm.reset();
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Erro ao editar produto',
            life: 2500,
          });
          this.editProductForm.reset();
        }
      });
    }
  }

  getProductSelectedDatas(productId: string): void {
    const p = this.productAction?.productDatas?.find(prod => prod.id === productId);
    if (!p) return;

    this.productSelectedDatas = p;

    this.editProductForm.patchValue({
      name: p.name,
      price: p.price,
      amount: p.amount,
      description: p.description
    });
  }

  getProductDatas(): void {
    this.productService.getAllProducts()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (response) => {
        if(response){
          this.productsDatas = response;
          this.productsDataTransferService.setProductsDatas(this.productsDatas);
        }
      },
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
