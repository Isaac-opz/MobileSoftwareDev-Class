import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders without crashing', async () => {
  const { baseElement } = render(<App />);
  expect(await screen.findAllByText('Reto 7 - Sensores')).not.toHaveLength(0);
  expect(baseElement).toBeDefined();
});
