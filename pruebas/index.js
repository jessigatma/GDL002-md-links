import { validateLink } from './controller/validate.js';
import { lookUpForLinks } from './controller/links.js';

export const mdLinks = (route, options) => {
  if (options.validate) {
    return validateLink(route).then(resp => resp).catch(err => err);  
  } else if (options.validate === false) {
    return new Promise(resolve => resolve(lookUpForLinks(route)));
  } 
};