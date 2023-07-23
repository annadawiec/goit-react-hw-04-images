import { useState, useEffect } from 'react';
//import React, { Component, useState } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { fetchImages } from './SearchImage/SearchImage';
import ImageGallery from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';
import { animateScroll } from 'react-scroll';

export const App = () => {
  const [imageName, setImageName] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  //const [per_page, setPer_page] = useState(12);
  const [loading, setLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  //const [id, setId] = useState(null);
  const per_page = 12;

  //export class App extends Component {
  // state = {
  // imageName: '',
  //  images: [],
  // page: 1,
  // per_page: 12,
  // loading: false,
  // loadMore: false,
  //  error: null,
  //  showModal: false,
  //   largeImageURL: 'largeImageURL',
  //  id: null,
  // };

  //componentDidUpdate(prevProps, prevState) {
  //  const { imageName, page } = this.state;
  //  if (prevState.imageName !== imageName || prevState.page !== page) {
  //   this.getImages(imageName, page);
  // }
  // }

  useEffect(() => {
    getImages(imageName, page);
  }, [imageName, page]);

  const getImages = async (im, page) => {
    // this.setState({ loading: true });
    if (!im) {
      return;
    }
    setLoading(true);
    try {
      const { hits, totalHits } = await fetchImages(im, page);
      if (hits.length === 0) {
        return alert('Sorry, nothin found');
      }

      //this.setState(prevState => ({
      //  images: [...prevState.images, ...hits],
      // loadMore: this.state.page < Math.ceil(totalHits / this.state.per_page),
      // }));
      //} catch (error) {
      //  this.setState({ error: error.message });
      // } finally {
      //   this.setState({ loading: false });
      //  }
      // };

      setImages(prevImages => [...prevImages, ...hits]);
      setLoadMore(page < Math.ceil(totalHits / per_page));
    } catch (error) {
      setError({ error });
      //this.setState({ error: error.message });
    } finally {
      setLoading(false);
      //this.setState({ loading: false });
    }
  };
  const handleFormSubmit = imageName => {
    // this.setState({
    // imageName,
    // images: [],
    //  page: 1,
    //  loadMore: false,
    setImageName(imageName);
    setImages([]);
    setPage(1);
    setLoadMore(false);
  };

  const onLoadMore = () => {
    //this.setState(prevState => ({ page: prevState.page + 1 }));
    //this.scrollOnMoreButton();
    setLoading(true);
    setPage(prevPage => prevPage + 1);
    //this.setState(prevState => ({ page: prevState.page + 1 }));
    scrollOnMoreButton();
  };

  const scrollOnMoreButton = () => {
    animateScroll.scrollToBottom({
      duration: 1000,
      delay: 10,
      smooth: 'linear',
    });
  };

  const openModal = largeImageURL => {
    //this.setState({
    //  showModal: true,
    setShowModal(true);
    setLargeImageURL(largeImageURL);
  };

  const closeModal = () => {
    //this.setState({
    //showModal: false,
    setShowModal(false);
  };

  // render() {
  // const { images, loading, loadMore, page, showModal, largeImageURL } =
  //   this.state;
  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />

      {loading ? (
        <Loader />
      ) : (
        <ImageGallery images={images} openModal={openModal} />
      )}

      {error && <p>something went wrong</p>}

      {loadMore && <Button onLoadMore={onLoadMore} page={page} />}

      {showModal && (
        <Modal largeImageURL={largeImageURL} onClose={closeModal} />
      )}
    </>
  );
};
