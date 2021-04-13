import React, { memo } from 'react';
import { Route, Switch } from 'react-router-dom';

import NewOrder from './NewOrder';
import ListOrder from './ListOrder';

const OrderPages = memo(() => {
  return (
    <Switch>
      <Route path='/pedidos/novo' component={NewOrder} />
      <Route path='/pedidos' component={ListOrder} />
    </Switch>
  );
});

export default OrderPages;
