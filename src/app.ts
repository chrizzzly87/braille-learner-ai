import { Application } from '@nativescript/core';
import { install } from 'react-nativescript';
import App from './App';

install();

Application.run({ create: () => <App /> });