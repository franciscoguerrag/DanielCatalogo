import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressbarComponent } from './progressbar/progressbar.component';
import { ViewimageComponent } from './viewimage/viewimage.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AlertComponent } from './alert/alert.component';
import { MatButtonModule } from '@angular/material/button';
@NgModule({
  declarations: [ViewimageComponent, ProgressbarComponent, AlertComponent],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatButtonModule
  ],
  exports: [ViewimageComponent, ProgressbarComponent, AlertComponent],
  bootstrap: [ViewimageComponent, ProgressbarComponent, AlertComponent]

})
export class SharedModule { }
