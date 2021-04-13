import React, { forwardRef, ReactNode, useCallback, useImperativeHandle, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';

import './styles.css';

export interface IModalHandles {
  openModal: () => void;
  closeModal: () => void;
}

interface IModalProps {
  children?: ReactNode;
}
const ModalDetail: React.ForwardRefRenderFunction<IModalHandles, IModalProps> = ({ children }, ref) => {
  const [visible, setVisible] = useState(false);

  const openModal = useCallback(() => {
    setVisible(true);
  }, []);

  const closeModal = useCallback(() => {
    setVisible(false);
  }, []);

  useImperativeHandle(ref, () => {
    return {
      openModal,
      closeModal
    };
  });

  return (
    <Dialog open={visible}>
      <div className='content-modal'>{children}</div>
    </Dialog>
  );
};

export default forwardRef(ModalDetail);
