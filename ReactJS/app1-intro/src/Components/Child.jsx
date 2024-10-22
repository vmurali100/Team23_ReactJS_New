import { Component } from "react";

export class ChildComp extends Component {
  constructor(props) {
    super();
    console.log(props);
    this.state = {
      showImage: false,
    };
  }
  showImage = () => {
    this.setState({ showImage: !this.state.showImage });
  };
  render() {
    return (
      <div>
        <button onClick={this.props.deleteLastFriend}>Delete A Friend</button>
        {/* {this.props.friends.map(function (val) {
          return <p>{val}</p>;
        })} */}
        <button onClick={this.showImage}>
          {this.state.showImage ? "Hide Image" : "Show Image"}
        </button>
        {/* {this.state.showImage && (
          <img
            src="https://media.istockphoto.com/id/517188688/photo/mountain-landscape.jpg?s=612x612&w=0&k=20&c=A63koPKaCyIwQWOTFBRWXj_PwCrR4cEoOw2S9Q7yVl8="
            alt=""
          />
        )} */}

        {this.state.showImage ? (
          <img
            src="https://media.istockphoto.com/id/517188688/photo/mountain-landscape.jpg?s=612x612&w=0&k=20&c=A63koPKaCyIwQWOTFBRWXj_PwCrR4cEoOw2S9Q7yVl8="
            alt=""
          />
        ) : (
          <p>NOt able to Show the Image </p>
        )}

        {/* <button onClick={this.handleClick}>Click me</button>
<button onClick={()=>{this.handleClick}}>Click me</button> */}
      </div>
    );
  }
}
