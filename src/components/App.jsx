import React from 'react';
// import { useState, useEffect } from 'react';

import css from './App.module.css';

import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';
import { Message } from './Message/Message';
import { getPhoto } from 'api/articlesApi';
import { useState, useEffect } from 'react';

export const App = () => {
  const [photos, setPhotos] = useState([]);
  const [request, setRequest] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [contentLoad, setContentLoad] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');

  const per_page = 12;

  const searchResponse = e => {
    e.preventDefault();
    if (!e.target.findForm.value) {
      setMessage('Please fill in the search field');
    }
    setRequest(e.target.findForm.value);
    setPage(1);
    setPhotos([]);
    e.target.reset();
  };

  const loadMore = () => {
    setPage(page + 1);
  };

  const getLargeImg = largeImageURL => {
    setShowModal(true);
    setLargeImageURL(largeImageURL);
  };

  const onCloseModal = () => {
    setShowModal(false);
  };
  // ====================================================

  useEffect(() => {
    setContentLoad(false);
    if (!request) {
      setContentLoad(true);
      return;
    }
    getPhoto(request, page, per_page).then(r => {
      if (r.hits.length === 0) {
        setMessage('Sorry, nothing was found, please try your search again');
        setContentLoad(true);
        return;
      }
      const photosContent = r.hits.map(
        ({ id, webformatURL, largeImageURL }) => ({
          id,
          webformatURL,
          largeImageURL,
        })
      );
      setMessage('');
      setPhotos(prevState => [...prevState, ...photosContent]);
      setTotalPages(r.totalHits / per_page);
      setContentLoad(true);
    });
  }, [page, request]);

  return (
    <div className={css.app}>
      <Searchbar search={searchResponse} />
      {message && <Message message={message} />}
      {!contentLoad && <Loader />}
      <ImageGallery photos={photos} getLargeImg={getLargeImg} />
      {totalPages > page && <Button text="Load more" loadMore={loadMore} />}
      {showModal && (
        <Modal largeImageURL={largeImageURL} onClose={onCloseModal} />
      )}
    </div>
  );
};
