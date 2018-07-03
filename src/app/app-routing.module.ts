import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {InputComponent} from './input/input.component';
import {AboutComponent} from './about/about.component';

const appRoutes: Routes = [
  {path: 'about', component: AboutComponent},
  {path: '', component: InputComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule] 
})
export class AppRoutingModule {

}
