import {showMessage} from 'react-native-flash-message';

export function successNotification(message: string) {
  return function* () {
    showMessage({type: 'success', message: message, duration: 3000});
  };
}

export function warningNotification(message: string) {
  return function* () {
    showMessage({type: 'warning', message: message, duration: 10000});
  };
}

export function errorNotification(message: string) {
  return function* () {
    showMessage({type: 'danger', message: message, duration: 10000});
  };
}

export function infoNotification(message: string) {
  return function* () {
    showMessage({type: 'info', message: message, duration: 3000});
  };
}

export function defaultNotification(message: string) {
  return function* () {
    showMessage({type: 'default', message: message, duration: 3000});
  };
}
