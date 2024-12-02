import { useState } from '#app';

export const useSearch = () => {
  const showSearch = useState('showSearch', () => false);
  const toggleSearch = () => {
    showSearch.value = !showSearch.value;
  };

  return { showSearch, toggleSearch };
};