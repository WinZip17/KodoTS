import {GET_LABELS_LIST} from '../Stores/reducers/labels';

export interface labelsType {
  [propName: number]: label;
}

export interface labelsState {
  labels: labelsType;
}

export interface label {
  name: string;
  id: number;
  icon: string;
}

export interface getLabelsList {
  type: typeof GET_LABELS_LIST;
  payload: label[];
}

export type labelsTypes = getLabelsList;
