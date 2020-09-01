import {NavigationActions} from 'react-navigation';

let navigator;

const setTopLevelNavigator = (navigatorRef) => {
  navigator = navigatorRef;
};

const navigate = (routeName, params) => {
  navigator &&
    navigator.dispatch(
      NavigationActions.navigate({
        routeName,
        params,
      }),
    );
};

export {setTopLevelNavigator, navigate};
