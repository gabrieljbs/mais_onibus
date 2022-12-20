import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp } from "firebase/app";
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { HeaderComponent} from './components/template/header/header.component';
import { FooterComponent} from './components/template/footer/footer.component';
import { PerfilComponent} from './components/template/perfil/perfil.component';




@NgModule({

  declarations: [AppComponent,HeaderComponent,FooterComponent,PerfilComponent],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    AngularFireModule.initializeApp({ 
      apiKey: "AIzaSyBoyuUeumF3kcGMdQOr83kE6k9yUSMus3c",
      authDomain: "mais-onibus.firebaseapp.com",
      projectId: "mais-onibus",
      storageBucket: "mais-onibus.appspot.com",
      messagingSenderId: "526396793226",
      appId: "1:526396793226:web:be8d0f4f9bd52cd8d86873"
     }),
     AngularFirestoreModule
  ],


})
export class AppModule {}
