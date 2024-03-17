import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyListComponent } from './components/empty-list/empty-list.component';



@NgModule({
  declarations: [
    EmptyListComponent
  ],
  exports: [
    EmptyListComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
