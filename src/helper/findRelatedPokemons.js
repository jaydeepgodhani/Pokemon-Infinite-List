import { names } from './names';

export const findRelatedPokemons = (searchTerm) => {

  if(!searchTerm || searchTerm === '') {
    return null;  //return 0;
  }

  const lowerCaseSearchTerm = searchTerm.toLowerCase();
  const fussySearch = [];
  let shouldExit = false;

  for(let item of names) {
    if (item.startsWith(lowerCaseSearchTerm)) {
      fussySearch.push(item);
      shouldExit = true;
    } else if(shouldExit === true) {
      break;
    }
  }

  return fussySearch;

}