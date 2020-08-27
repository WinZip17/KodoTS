import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ErrorBoundary from './components/ErrorBoundary';
import NavigationContainer from './navigation/Container';
import * as Actions from './store/actions';

const Main: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  // const state = useSelector((state) => state)
  // useEffect(() => {
  //   console.log(state);
  // }, [state]);

  useEffect(() => {
    dispatch(Actions.getUser());
    dispatch(Actions.getItems());
    dispatch(Actions.getCategories());
    dispatch(Actions.getTextList());
    dispatch(Actions.getBannersList());
    dispatch(Actions.getSettings());
    dispatch(Actions.getLabelsList());
    dispatch(Actions.getStreetsList());
    // dispatch(Actions.getLastOrder());
  }, []);

  return (
    <ErrorBoundary>
      <NavigationContainer />
    </ErrorBoundary>
  );
};

export default Main;
