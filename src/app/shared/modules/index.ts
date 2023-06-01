import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModuleTsModule } from './app-material.module.ts.module';
import { FlexLayoutModule } from '@angular/flex-layout';
export { FlexLayoutModule };
export { AppMaterialModuleTsModule };
export { FormsModule, ReactiveFormsModule };

export const ALL = [
  AppMaterialModuleTsModule,
  FlexLayoutModule,
  FormsModule,
  ReactiveFormsModule,
];
