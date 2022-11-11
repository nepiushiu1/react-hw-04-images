import css from './Searchbar.module.css';
import { FiZoomIn } from 'react-icons/fi';

export const Searchbar = ({ search }) => {
  return (
    <header className={css.searchbar}>
      <form className={css.form} onSubmit={search}>
        <button type="submit" className={css.button}>
          <FiZoomIn className={css.icon} />
          <span className={css.label}>Search</span>
        </button>

        <input
          className={css.input}
          type="text"
          name="findForm"
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};
