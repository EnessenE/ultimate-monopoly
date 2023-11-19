import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonopolyComponent } from './components/monopoly/monopoly.component';

const routes: Routes = [
  { path: '', component: MonopolyComponent },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
