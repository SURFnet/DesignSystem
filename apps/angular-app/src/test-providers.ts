import { EnvironmentProviders, Provider, provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

const testProviders: (Provider | EnvironmentProviders)[] = [
  provideHttpClientTesting(),
  provideZonelessChangeDetection(),
  provideRouter([]),
];

export default testProviders;
