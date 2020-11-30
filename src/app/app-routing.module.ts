import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CovidComponent } from './project/covid/covid.component';


const routes: Routes = [

  { path: '',   redirectTo: '/covid', pathMatch: 'full' },
  { path: 'covid' , component: CovidComponent  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
