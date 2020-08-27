export const GET_LABELS_LIST = '[LABELS] GET_LABELS_LIST';

export interface labelsState {
  labels: {
    [propName: number]: label;
  };
}

export interface label {
  name: string;
  id: number;
  icon: string;
}

export interface getLabelsList {
  type: typeof GET_LABELS_LIST;
  payload: {
    key: string;
    value: {
      [propName: number]: label;
    };
  };
}

export type labelsTypes = getLabelsList;
