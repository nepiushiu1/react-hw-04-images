import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({
  id,
  webformatURL,
  getLargeImg,
  largeImageURL,
}) => {
  return (
    <li className={css.item} key={id}>
      <img
        className={css.image}
        onClick={() => getLargeImg(largeImageURL)}
        src={webformatURL}
        alt=""
      />
    </li>
  );
};

ImageGalleryItem.propType = {
  id: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  getLargeImg: PropTypes.func.isRequired,
};
