import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatStepperModule} from '@angular/material/stepper';
import { InputComponent } from './input/input.component';
import {
  MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule,
  MatRadioModule
} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {MatDividerModule} from '@angular/material/divider';
import {MatToolbarModule} from '@angular/material/toolbar';
//import {MessageService} from './app.service';
import { AboutComponent } from './about/about.component';
//import {RouterModule, Routes} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatExpansionModule} from '@angular/material/expansion';
/*const appRoutes: Routes = [
  {path: 'about', component: AboutComponent},
  {path: '', component: InputComponent}
];*/
@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    AboutComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatStepperModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatRadioModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    AppRoutingModule,
    MatTooltipModule,
    MatExpansionModule
   // RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
