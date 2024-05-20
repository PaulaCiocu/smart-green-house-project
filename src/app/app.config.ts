import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp } from '@angular/fire/app';
import { getDatabase } from '@angular/fire/database';
import { provideFirebaseApp } from '@angular/fire/app';
import { provideDatabase } from '@angular/fire/database';
import { routes } from "./app-routing.module";
import { environment } from '../environments/environment';
import {getFirestore, provideFirestore} from "@angular/fire/firestore";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideDatabase(() => getDatabase()),
    provideFirestore(()=> getFirestore())
  ]
};

