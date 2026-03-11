import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModuleRoutingModule } from './home-module-routing.module';
import { CalculatorComponent } from '../calculator/calculator.component';
import { MenuComponent } from '../menu/menu.component';
import { NotesComponent } from '../notes/notes.component';
import { HomeComponent } from '../home/home.component';
import { ɵInternalFormsSharedModule, ReactiveFormsModule } from "@angular/forms";


@NgModule({
  declarations: [
    CalculatorComponent,
    MenuComponent,
    NotesComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeModuleRoutingModule,
    ɵInternalFormsSharedModule,
    ReactiveFormsModule
]
})
export class HomeModuleModule { }
