import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MatrixComponent } from './components/matrix/matrix.component';
import { ScrollComponent } from './components/scroll/scroll.component';
import { TwoimgComponent } from './components/twoimg/twoimg.component';
import { VrComponent } from './components/vr/vr.component';

import { QuizComponent } from './components/quiz/quiz.component';
import { GlitchComponent } from './components/glitch/glitch.component';
import { FooterComponent } from './components/footer/footer.component';
import { SkillsComponent } from './components/skills/skills.component';
import { AboutComponent } from './components/about/about.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MatrixComponent,
    ScrollComponent,
    TwoimgComponent,
    VrComponent,
    QuizComponent,
    GlitchComponent,
    FooterComponent,
    SkillsComponent,
    AboutComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
