import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule, ThemeService } from 'ng2-charts';
import { CovidComponent } from './covid.component';
import { CovidService } from '../covid.service';
import { HttpClientModule } from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { DatePipe } from '@angular/common';


@NgModule({
  declarations: [CovidComponent],
  imports: [
    CommonModule,
    ChartsModule,
    HttpClientModule,
    MatCardModule,
    MatDividerModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatButtonModule

  ],
  exports: [
    MatPaginatorModule , MatDatepickerModule , MatNativeDateModule ],

providers: [CovidService , ThemeService , MatDatepickerModule , MatNativeDateModule , DatePipe]
})
export class CovidModule { }

