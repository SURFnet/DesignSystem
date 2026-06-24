import { EnvironmentProviders, Provider, provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClientTesting } from '@angular/common/http/testing';

const testProviders: (Provider | EnvironmentProviders)[] = [
  provideHttpClientTesting(),
  provideZonelessChangeDetection(),
];

export default testProviders;
