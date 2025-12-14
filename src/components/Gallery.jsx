import { Component } from "react";
import "./styles.css";

class Searchbar extends Component {
  state = { value: "" };

  handleChange = (e) => {
    this.setState({ value: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.value);
  };

  render() {
    return (
      <header className="searchbar">
        <form className="form" onSubmit={this.handleSubmit}>
          <input
            className="input"
            type="text"
            placeholder="Search images"
            value={this.state.value}
            onChange={this.handleChange}
          />
          <button type="submit" className="button">
            Search
          </button>
        </form>
      </header>
    );
  }
}

const ImageGalleryItem = ({ image, onClick }) => (
  <li className="gallery-item" onClick={() => onClick(image.largeImageURL)}>
    <img src={image.webformatURL} alt="" />
  </li>
);

const Button = ({ onClick }) => (
  <button className="load-more" onClick={onClick}>
    Load more
  </button>
);

const Loader = () => <div className="loader">Loading...</div>;

class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.handleEsc);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleEsc);
  }

  handleEsc = (e) => {
    if (e.code === "Escape") {
      this.props.onClose();
    }
  };

  handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    return (
      <div className="overlay" onClick={this.handleOverlayClick}>
        <div className="modal">
          <img src={this.props.image} alt="" />
        </div>
      </div>
    );
  }
}

class Gallery extends Component {
  state = {
    query: "",
    images: [],
    page: 1,
    loading: false,
    selectedImage: null,
  };

  handleSearch = (query) => {
    this.setState({ query, images: [], page: 1 }, this.fetchImages);
  };

  fetchImages = () => {
    const { query, page } = this.state;

    if (query === "") {
      return;
    }

    const API_KEY = "50870503-c2d8068ee53ef019121c927e8";
    const URL = `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;

    this.setState({ loading: true });

    fetch(URL)
      .then((response) => response.json())
      .then((data) =>
        this.setState((prev) => ({
          images: prev.images.concat(data.hits),
          loading: false,
        }))
      );
  };

  loadMore = () => {
    this.setState((prev) => ({ page: prev.page + 1 }), this.fetchImages);
  };

  openModal = (url) => {
    this.setState({ selectedImage: url });
  };

  closeModal = () => {
    this.setState({ selectedImage: null });
  };

  render() {
  const imagesList = this.state.images.map(img => (
    <ImageGalleryItem
      key={img.id}
      image={img}
      onClick={this.openModal}
    />
  ));

  let loader = null;
  if (this.state.loading) {
    loader = <Loader />;
  }

  let loadMoreButton = null;
  if (this.state.images.length > 0) {
    loadMoreButton = <Button onClick={this.loadMore} />;
  }

  let modal = null;
  if (this.state.selectedImage !== null) {
    modal = <Modal image={this.state.selectedImage} onClose={this.closeModal} />;
  }

  return (
    <div>
      <Searchbar onSubmit={this.handleSearch} />
      <ul className="gallery">
        {imagesList}
      </ul>
      {loader}
      {loadMoreButton}
      {modal}
    </div>
  );
}

}

export default Gallery;
