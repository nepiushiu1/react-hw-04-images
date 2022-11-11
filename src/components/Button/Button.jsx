import css from './Button.module.css';
import PropTypes from 'prop-types';

export const Button = ({ text, loadMore }) => {
  return (
    <div className={css.conteiner}>
      <button onClick={loadMore} className={css.button} type="button">
        {text}
      </button>
    </div>
  );
};

Button.propType = {
  text: PropTypes.string.isRequired,
  loadMore: PropTypes.func.isRequired,
};
