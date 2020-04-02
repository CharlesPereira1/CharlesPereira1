import React from 'react';

import { debounce } from 'lodash';

// import { Container } from './styles';

export default function InputSearch({ handleSearch, ...rest }) {
  const search = debounce(value => handleSearch(value), 400);

  function handleChange(e) {
    search(e.target.value);
  }

  return (
    <>
      <input onChange={handleChange} placeholder="Buscar repositório" />
    </>
  );

}
