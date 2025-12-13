import { Component } from "react";
import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";
import "./components/styles.css";

class App extends Component {
  state = {
    query: "",
  };

  handleSearch = (newQuery) => {
    this.setState({ query: newQuery });
  };

  render() {
    return (
      <div className="container">
        <h1 className="title">Пошук зображень</h1>
        <Searchbar onSubmit={this.handleSearch} />
        <ImageGallery query={this.state.query} />
      </div>
    );
  }
}

export default App;
