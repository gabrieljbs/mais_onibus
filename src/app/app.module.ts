import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
/* import { initializeApp } from "firebase/app"; */
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { HeaderComponent} from './components/template/header/header.component';
import { FooterComponent} from './components/template/footer/footer.component';
import { PerfilComponent} from './components/template/perfil/perfil.component';
import { environment } from 'src/environments/environment';
import { FormsModule } from '@angular/forms';
import { ModalController } from '@ionic/angular'; // importando o ModalController


@NgModule({

  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PerfilComponent],
  providers: [ModalController,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy, }],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FormsModule,


  ],


})
export class AppModule {}
