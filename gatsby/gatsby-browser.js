import React from 'react';
import Layout from './src/components/Layout';
import { OrderProvider } from './src/components/OrderContext';

export function wrapPageElement({ element, props }) {
  return (
    <div>
      <Layout {...props}>{element}</Layout>
    </div>
  );
}

export function wrapRootElement({ element }) {
  return <OrderProvider>{element}</OrderProvider>;
}
