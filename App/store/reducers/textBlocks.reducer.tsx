import {
  GET_TEXT_LIST,
  TextBlocksState,
  TextBlocksTypes,
} from '../../types/textBlocksTypes';

const initialState: TextBlocksState = {
  loading: false,
  data: {
    NonStandard: {
      content: '',
      id: 0,
      slug: ',',
    },
    UserAgreement: {
      content: '',
      id: 0,
      slug: ',',
    },
  },
};

const textBlocksReducer = function (
  state = initialState,
  action: TextBlocksTypes,
) {
  switch (action.type) {
    case GET_TEXT_LIST:
      return {
        ...state,
        data: {
          NonStandard: action.payload.find((i) => i.slug === 'NonStandard'),
          UserAgreement: action.payload.find((i) => i.slug === 'UserAgreement'),
        },
      };
    default:
      return state;
  }
};

export default textBlocksReducer;
