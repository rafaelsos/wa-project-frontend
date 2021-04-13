import React, { Fragment, useCallback } from 'react';
import ArrowLeftIcon from 'mdi-react/ArrowLeftIcon';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import * as yup from 'yup';

import { logError } from 'helpers/rxjs-operators/logError';
import { tap } from 'rxjs/operators';

import { useFormikObservable } from 'hooks/useFormikObservable';

import Toast from 'components/Shared/Toast';
import TextField from 'components/Shared/Fields/Text';
import Toolbar from 'components/Layout/Toolbar';

import orderService, { ICreateOrder } from 'services/order';

import './styles.css';

const NewRequest: React.FC = () => {
  const route = useHistory();

  const validationSchema = yup.object().shape({
    description: yup.string().required().min(3).max(50),
    amount: yup.number().required().min(1),
    price: yup.number().required().min(1)
  });

  const handleNavigateList = useCallback(() => {
    route.push('/pedidos');
  }, [route]);

  const formik = useFormikObservable<ICreateOrder>({
    validationSchema,
    onSubmit(model) {
      return orderService.create(model).pipe(
        tap(() => {
          Toast.show('Pedido criado com sucesso!', 3000);
          setTimeout(() => {
            route.replace('/pedidos');
          }, 3000);
        }),
        logError(true)
      );
    }
  });

  return (
    <Fragment>
      <Toolbar title='Novo Pedido' />

      <div id='card-container'>
        <button className='button-navigate' type='button' onClick={handleNavigateList}>
          <ArrowLeftIcon size={26} color='#3a3a3a' />
          Lista de Pedido
        </button>

        <h1>Inserir as informações para cadastrar um novo pedido.</h1>

        <form onSubmit={formik.handleSubmit} id='form-order'>
          <TextField label='Descrição' name='description' formik={formik} />

          <TextField label='Quantidade' name='amount' type='number' formik={formik} />

          <TextField label='Valor' name='price' type='number' formik={formik} />

          <Button color='primary' variant='contained' type='submit'>
            Salvar
          </Button>
        </form>
      </div>
    </Fragment>
  );
};

export default NewRequest;
