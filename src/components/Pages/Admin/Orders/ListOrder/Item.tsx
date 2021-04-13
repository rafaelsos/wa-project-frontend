import React, { Fragment, useCallback, useRef } from 'react';
import Button from '@material-ui/core/Button';

import ModalDetail, { IModalHandles } from 'components/Shared/ModalDetail';
import TextField from 'components/Shared/Fields/Text';

import { formatPrice } from 'formatters/formatPrice';

import './styles.css';

interface IItemProp {
  item: {
    description: string;
    amount: number;
    price: number;
  };
}

const Item: React.FC<IItemProp> = ({ item }) => {
  const modalRef = useRef<IModalHandles>(null);

  const { description, amount, price } = item;

  const handleDetailOrder = useCallback(() => {
    modalRef.current.openModal();
  }, []);

  const handleCloseModal = useCallback(() => {
    modalRef.current.closeModal();
  }, []);

  return (
    <Fragment>
      <tr>
        <td>{description}</td>
        <td>{amount}</td>
        <td>{formatPrice(price)}</td>
        <td>
          <Button variant='contained' color='primary' onClick={handleDetailOrder}>
            Detalhe pedido
          </Button>
        </td>
      </tr>

      <ModalDetail ref={modalRef}>
        <h2>Detalhes do pedido</h2>

        <TextField label='Descrição' name='description' disabled value={description} />
        <TextField label='Quantidade' name='amount' disabled value={amount} />
        <TextField label='Preço' name='price' disabled value={formatPrice(price)} />

        <Button color='primary' variant='contained' style={{ height: 56 }} onClick={handleCloseModal}>
          OK
        </Button>
      </ModalDetail>
    </Fragment>
  );
};

export default Item;
