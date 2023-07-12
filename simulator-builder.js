const simulatorBuilder = (page) => ({
  page,
  event,
  click,
  input,
  goto,
  getDataLayer,
  delay: (ms) => page.waitForTimeout(ms),
});

const event = async function ({
  selector,
  event,
  text,
  delay,
  button = 'right',
}) {
  try {
    if (event === 'mousedown') {
      await this.page.click(selector, { button });
    } else if (event === 'click') {
      await this.page.click(selector);
    } else if (event === 'input') {
      await this.page.type(selector, text, { delay });
      await this.page.evaluate('document.activeElement.blur()');
    }
    await this.page.waitForTimeout(500);
  } catch ($$e) {}
};

const click = async function (selector, opts = selector) {
  return await this.event({
    event: 'mousedown',
    selector,
    button: 'right',
    ...opts,
  });
};

const input = async function (selector, opts = selector) {
  return await this.event({
    event: 'input',
    selector,
    text: 't ex to',
    delay: 10,
    ...opts,
  });
};

const goto = async function (url, options = {waitUntil: 'networkidle2'}) {
  return await this.page.goto(url, options);
};

const getDataLayer = async function (key) {
  return await this.page.evaluate(function(key) {
    return window.dataLayer.filter(({event}) => event === key);
  }, key)
};

module.exports = simulatorBuilder;
