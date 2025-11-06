import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogService } from 'primeng/dynamicdialog';
import { ToolbarVavigationComponent } from './components/toolbar-vavigation/toolbar-vavigation.component';


@NgModule({
  declarations: [
    ToolbarVavigationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ToolbarModule,
    CardModule,
    ButtonModule
  ],
  providers: [DialogService, CurrencyPipe],
  exports: [ToolbarVavigationComponent]
})
export class SharedModule { }
