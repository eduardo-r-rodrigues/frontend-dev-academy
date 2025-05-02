import { bootstrapApplication }    from '@angular/platform-browser';
import { provideRouter }           from '@angular/router';
import { importProvidersFrom }     from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// módulos do Angular Material
import { MatToolbarModule }   from '@angular/material/toolbar';
import { MatButtonModule }    from '@angular/material/button';
import { MatIconModule }      from '@angular/material/icon';
import { MatCardModule }      from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule }     from '@angular/material/input';
import { MatChipsModule }     from '@angular/material/chips';
import { MatListModule }      from '@angular/material/list';

import { AppComponent } from './app/app.component';
import { routes }       from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      BrowserAnimationsModule,
      // material
      MatToolbarModule,
      MatButtonModule,
      MatIconModule,
      MatCardModule,
      MatFormFieldModule,
      MatInputModule,
      MatChipsModule,
      MatListModule,
    )
  ]
})
.catch(err => console.error(err));
