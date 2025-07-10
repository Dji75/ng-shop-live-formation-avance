import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withRouterConfig } from '@angular/router';
import { provideStore } from '@ngrx/store';

import { routes } from './app.routes';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideHttpClient(),
    provideRouter(routes,
      /*, withDebugTracing()*/
      withRouterConfig({
        // ...
      })
    ),
    provideStore(),
    // provideState(appFeature),
    // provideEffects(AppEffects),
    provideStoreDevtools({
      name: 'Formation Angular',
      maxAge: 50,
    })
  ]
};
