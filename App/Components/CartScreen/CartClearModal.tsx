import React from 'react';
import ConfirmModal from '../SharedComponents/ConfirmModal';
import {useDispatch, useSelector} from 'react-redux';
import * as Actions from '../../Stores/reducers/Actions';
import {RootState} from '../../Stores/reducers';

const CartClearModal: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const showClear = useSelector(
    (state: RootState) => state.cartModal.showClear,
  );

  return (
    <ConfirmModal
      isVisible={showClear}
      onYes={() => {
        dispatch(Actions.cartClear());
        dispatch(Actions.hideClear());
      }}
      onDismiss={() => dispatch(Actions.hideClear())}>
      Удалить корзину целиком?
    </ConfirmModal>
  );
};

export default CartClearModal;
