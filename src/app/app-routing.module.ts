import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { TwoimgComponent } from './components/twoimg/twoimg.component';
import { VrComponent } from './components/vr/vr.component';
import { SkillsComponent } from './components/skills/skills.component';
import { AboutComponent } from './components/about/about.component';



const routes: Routes = [
  
  { path: '', component: HeaderComponent},
  { path: 'twoimg', component: TwoimgComponent},
  { path: 'vr', component: VrComponent},
  { path: 'skills', component: SkillsComponent},
  { path: 'about', component: AboutComponent}
  
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

