import { validateLink } from './validate.js';

const doStats = (resolver, route) => (
  new Promise((resolve, reject) => {
    const linkStatus = validateLink(route);
    linkStatus.then(response => {
      const result = resolver(response);
      resolve(result);
    }).catch(err => reject(err)); 
  })
);
 
export const totalLinksStats = (route) => {
  const resolver = response => `Total: ${response.length}`;
  return doStats(resolver, route);
};

export const uniqueLinksStats = route => {
  const resolver = response => `Unique: ${new Set(response.map(uniqueLinks => uniqueLinks.href)).size}`;
  return doStats(resolver, route);
};

export const brokenLinksStats = route => {
  const resolver = response => `Broken: ${response.filter(statusText => statusText.message === 'Fail').length}`;
  return doStats(resolver, route);
};
