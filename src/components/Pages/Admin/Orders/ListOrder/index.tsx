import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useObservable } from 'react-use-observable';

import './styles.css';

import Toolbar from 'components/Layout/Toolbar';
import orderService from 'services/order';
import Item from './Item';

const ListRequests: React.FC = () => {
  const [data] = useObservable(() => {
    return orderService.list().pipe();
  }, []);

  if (!data) return <p>Loading..</p>;

  return (
    <Fragment>
      <Toolbar title='Pedidos' />

      <div id='card-container'>
        <Link to='/pedidos/novo'>Novo Pedido</Link>

        <table id='table-container'>
          <thead>
            <tr>
              <th>Código</th>
              <th>Descrição</th>
              <th>Quantidade</th>
              <th>Valor</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <Item key={String(item.id)} item={item} />
            ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default ListRequests;
