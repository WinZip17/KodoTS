import React, { Component } from 'react'

export default function withShowAutocompleteResult (WrappedComponent) {
  return class extends Component {
    state = {
      stopScrollParent: false,
      hideAutocompleteResult: true,
    }

    handleAutocompleteShow = stopScrollParent => {
      this.setState({
        stopScrollParent,
        hideAutocompleteResult: false,
      });
    };
  
    handleAutocompleteHide = () => {
      this.setState({
        stopScrollParent: false,
        hideAutocompleteResult: true,
      });
    };

    render(){
      return (
        <WrappedComponent
          {...this.props}
          {...this.state}
          handleAutocompleteShow={this.handleAutocompleteShow}
          handleAutocompleteHide={this.handleAutocompleteHide}
        />
      )
    }
  }
}