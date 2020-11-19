const { URL } = require('url');
const blacklist = ['image', 'media', 'font'];

const blockRequests = (req) => {
  if (blacklist.includes(req.resourceType()) && !isGA(new URL(req.url()))) {
    //console.info(`blocked: ${req.url()}`);
    return req.abort();
  }

  req.continue();
};

const queryToObject = (url = '') =>
  url.split('&').reduce((acc, param) => {
    const [key, ...values] = param.split('=');
    acc[key] = decodeURIComponent(values.join('='));
    return acc;
  }, {});

const isGA = ({ hostname, pathname }) => {
  return (
    hostname === 'www.google-analytics.com' &&
    pathname.includes('/collect') === true
  );
};

const requestHandlerBuilder = (requests) => (req) => {
  const url = new URL(req.url());
  if (!isGA(url)) return;

  const { search } = url;
  const data = queryToObject(
    req.method() === 'GET' ? search.slice(1) : req.postData()
  );

  requests.push(data);
};

module.exports = {
  blockRequests,
  queryToObject,
  requestHandlerBuilder,
};
