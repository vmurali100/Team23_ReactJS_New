import React, { Component } from "react";

const HocComponent = (OriginalComponent) => {
  class NewComponent extends Component {
    constructor(props) {
      super(props);

      this.state = {
        count: 0,
      };
    }

    handleIncrementCount = () => {
      this.setState({ count: this.state.count + 1 });
    };

    handleDecrementCount = () => {
      this.setState({ count: this.state.count - 1 });
    };

    render() {
      return (
        <OriginalComponent
          count={this.state.count}
          handleIncrementCount={this.handleIncrementCount}
          handleDecrementCount={this.handleDecrementCount}
        />
      );
    }
  }
  return NewComponent;
};

export default HocComponent;
