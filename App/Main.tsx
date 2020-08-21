import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import ErrorBoundary from './components/ErrorBoundary';
import NavigationContainer from './navigation/Container';
import * as Actions from './store/actions';

const Main: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Actions.getUser());
    dispatch(Actions.getItems());
  }, []);

  return (
    <ErrorBoundary>
      <NavigationContainer />
    </ErrorBoundary>
  );
};

export default Main;
