import React from 'react';

const Search = ({ setListSearch, filter, setSearch }) => {

  const onChange = (e) => {
    // setSearch(e.target.value);
    setListSearch(filter(e));
  }
  return (
    <form
      className='d-flex border rounded align-items-center px-2 mx-2'
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='20'
        height='20'
        fill='#798188'
        class='bi bi-search'
        viewBox='0 0 16 16'
      >
        <path d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z' />
      </svg>
      <input
        type='text'
        className='form-control  border-0 focus-none '
        id='search'
        placeholder='Search...'
        required
        onChange={onChange}
      />
    </form>
  );
};

export default Search;
