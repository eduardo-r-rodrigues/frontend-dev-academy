// src/app/app.config.ts
import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  provideClientHydration,
  withEventReplay,
  BrowserModule,
} from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Angular Material Modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // opcional: otimiza detecção de mudanças agrupando eventos
    provideZoneChangeDetection({ eventCoalescing: true }),

    // HTTP client para injetar HttpClient nos serviços
    provideHttpClient(withFetch()),

    // roteamento
    provideRouter(routes),

    // hidratação no SSR (mantido conforme solicitado)
    provideClientHydration(withEventReplay()),

    // qualquer provider adicional via importProvidersFrom
    importProvidersFrom(
      BrowserAnimationsModule,
      MatToolbarModule,
      MatButtonModule,
      MatIconModule,
      MatCardModule,
      MatFormFieldModule,
      MatInputModule,
      MatChipsModule,
      MatListModule,
      MatProgressSpinnerModule,
      MatSnackBarModule,
      MatSelectModule
    ),
  ],
};