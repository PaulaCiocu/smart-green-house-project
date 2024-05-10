import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getDatabase, provideDatabase } from '@angular/fire/database';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"rpi-lab-project","appId":"1:977563218901:web:edcc6713b860a19593035c","databaseURL":"https://rpi-lab-project-default-rtdb.firebaseio.com","storageBucket":"rpi-lab-project.appspot.com","apiKey":"AIzaSyC1d-x5s-DHPTIzARn7A59Kt8QjAfakO-s","authDomain":"rpi-lab-project.firebaseapp.com","messagingSenderId":"977563218901","measurementId":"G-FSEDDR02BZ"}))), importProvidersFrom(provideDatabase(() => getDatabase()))]
};
