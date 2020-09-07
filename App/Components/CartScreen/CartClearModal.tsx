import React from 'react';
// import ConfirmModal from '../SharedComponents/ConfirmModal';
import { useDispatch, useSelector } from "react-redux";
// import Actions from '../../Stores/reducers/Actions'
import { RootState } from "../../Stores/reducers";
import { hideClear } from "../../Types/cartModalTypes";


// @ts-ignore
// const CartClearModal: React.FC = (): JSX.Element => {
  // const dispatch = useDispatch();
  // const showClear = useSelector((state: RootState) => state.cartModal.showClear);

  // const showCleardff = () => {

  // }

  // return (
  //   <ConfirmModal
  //     isVisible={showClear}
      // onYes={() => {
      //   dispatch(Actions.hideClear())
      //   dispatch(Actions.hideClear())
      // }}
//       onDismiss={() => dispatch(Actions.hideClear())}>
//       Удалить корзину целиком?
//     </ConfirmModal>
//   );
// };
