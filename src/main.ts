// src/main.ts
import { bootstrapApplication }    from '@angular/platform-browser';
import { provideRouter }           from '@angular/router';
import { importProvidersFrom }     from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule }  from '@angular/material/button';
import { MatIconModule }    from '@angular/material/icon';

import { AppComponent } from './app/app.component';
import { routes }       from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      BrowserAnimationsModule,
      MatToolbarModule,
      MatButtonModule,
      MatIconModule
    )
  ]
})
.catch(err => console.error(err));
