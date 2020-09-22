import {AUTOCOMPLETE_HIDE, AUTOCOMPLETE_SHOW} from '../Stores/reducers/scroll';

export interface scrollState {
  stopScrollParent: boolean;
  hideAutocompleteResult: boolean;
}

export interface handleAutocompleteShow {
  type: typeof AUTOCOMPLETE_SHOW;
  payload: boolean;
}

export interface handleAutocompleteHide {
  type: typeof AUTOCOMPLETE_HIDE;
}

export type scrollTypes = handleAutocompleteShow | handleAutocompleteHide;
