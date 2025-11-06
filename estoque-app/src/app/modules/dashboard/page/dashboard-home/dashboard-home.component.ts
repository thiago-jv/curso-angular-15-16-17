import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products/products.service';
import { MessageService } from 'primeng/api';
import { GetAllProductsResponse } from 'src/app/models/interfaces/products/response/GetAllProductResponse';
import { ProductsDataTransferService } from 'src/app/shared/services/products/products-data-transfer.service';
import { Subject, takeUntil } from 'rxjs';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: [],
  providers: [MessageService]
})
export class DashboardHomeComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();
  productsList: GetAllProductsResponse[] = [];
  public productsChartDatas!: ChartData;
  public productsChartOptions!: ChartOptions;

  constructor(
    private productsService: ProductsService,
    private messageService: MessageService,
    private productsDtService: ProductsDataTransferService
  ) {}

  ngOnInit(): void {
    this.getProductsData();
  }

  getProductsData(): void {
    this.productsService.getAllProducts()
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe({
      next: (response) => {
        if (response.length > 0) {
          this.productsList = response;
          this.productsDtService.setProductsDatas(this.productsList);
          this.setProductsChartConfig();
        }
      },
      error: (err) => {
        console.error(err);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao buscar produtos!',
          life: 2500
        });
      }
    });
  }

  setProductsChartConfig(): void {
   const documentStyle = getComputedStyle(document.documentElement);
   const textColor = documentStyle.getPropertyValue('--text-color');
   const textColorSecondary = documentStyle.getPropertyValue(
    '--text-color-secondary'
   );
   const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

   this.productsChartDatas = {
    labels: this.productsList.map((element) => element?.name),
    datasets: [
      {
      label: 'Quantidade',
      backgroundColor: documentStyle.getPropertyValue('--indigo-400'),
      borderColor: documentStyle.getPropertyValue('--indigo-400'),
      hoverBackgroundColor: documentStyle.getPropertyValue('--indigo-500'),
      data: this.productsList.map((elemtent) => elemtent?.amount),
      },
    ],
   };

   this.productsChartOptions = {
    maintainAspectRatio: false,
    aspectRatio: 0.8,
    plugins: {
      legend: {
        labels: {
          color: textColor,
        },
      },
    },

    scales: {
      x: {
        ticks: {
          color: textColorSecondary,
          font: {
            weight: 500,
          },
        },
        grid: {
          color: surfaceBorder,
        },
      },
      y: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
    },
   };
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
