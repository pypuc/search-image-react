import { Component } from "react";
import "./styles.css";

class Searchbar extends Component {
  state = { value: "" };
  handleChange = (e) => {
    this.setState({ value: e.target.value });
  };
  handleSubmit = (e) => {
    e.prevenDefault();
    this.props.onSubmit(this.state.value);
  };

  render() {
    return (
      <header className="">
        <form className="" onSubmit={this.handleSubmit} action="">
          <button type="submit" className="">
            Шукай картину
          </button>
          <input
            value={this.state.value}
            className=""
            placeholder="Пиши сюди"
            type="text"
          />
        </form>
      </header>
    );
  }
}

const ImageGalleryItem = ({ image, onClick }) => (
  <li class="gallery-item">
    <img src="" alt="" />
  </li>
);

const Button = ({ onClick }) => (
  <button className="" onClick={onClick}>
    Load more
  </button>

//   const Loader = () => 
);
