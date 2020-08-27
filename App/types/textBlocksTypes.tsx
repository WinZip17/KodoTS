export const GET_TEXT_LIST = '[TEXT] GET_TEXT_LIST';

export interface TextBlocksState {
  loading: boolean;
  data: {
    NonStandard: textBlocksObj;
    UserAgreement: textBlocksObj;
  };
}

export interface textBlocksObj {
  content: string;
  id: number;
  slug: string;
}

export interface getTextList {
  type: typeof GET_TEXT_LIST;
  payload: textBlocksObj[];
}

export type TextBlocksTypes = getTextList;
