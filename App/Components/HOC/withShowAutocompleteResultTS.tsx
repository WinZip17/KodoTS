import React, {useState} from 'react';

const WithShowAutocompleteResultTS = (props: any) => {
  const {WrappedComponent} = props;
  const [stopScrollParent, setStopScrollParent] = useState(false);
  const [hideAutocompleteResult, setHideAutocompleteResult] = useState(true);

  const handleAutocompleteShow = (stopScrollParent: boolean) => {
    setStopScrollParent(stopScrollParent);
    setHideAutocompleteResult(false);
  };

  const handleAutocompleteHide = () => {
    setStopScrollParent(false);
    setHideAutocompleteResult(true);
  };

  return (
    <WrappedComponent
      {...props}
      stopScrollParent={stopScrollParent}
      hideAutocompleteResult={hideAutocompleteResult}
      handleAutocompleteShow={handleAutocompleteShow}
      handleAutocompleteHide={handleAutocompleteHide}
    />
  );
};

export default WithShowAutocompleteResultTS;
