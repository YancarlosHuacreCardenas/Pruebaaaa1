// main.ts
import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';   // 👈 IMPORTANTE
import { CommonModule } from '@angular/common'; // 👈 IMPORTANTE
import { AppComponent } from '../app/app.component';
import { appConfig } from '../app/app.config';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule, FormsModule, CommonModule)  // 👈 agregados
  ]
}).catch(err => console.error(err));
