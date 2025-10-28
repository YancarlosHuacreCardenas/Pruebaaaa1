import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';   // 👈 AppComponent
import { config } from './app/app.config.server';

const bootstrap = () => bootstrapApplication(AppComponent, config);  // 👈 usar AppComponent

export default bootstrap;
