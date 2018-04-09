const simulatorBuilder = page => ({
  page,
  event,
  click,
  input,
  delay: ms => page.waitFor(ms)
});

const event = async function ({
  selector,
  event,
  text,
  delay,
  button = 'right'
}) {
  try {
    if (event === 'mousedown') {
      await this.page.click(selector, { button });
    } else if (event === 'input') {
      await this.page.type(selector, text, { delay });
      await this.page.evaluate('document.activeElement.blur()');
    }
    await this.page.waitFor(500);
  } catch ($$e) {};
};

const click = async function (selector, opts = selector) {
  return this.event({
    event: 'mousedown',
    selector,
    button: 'right',
    ...opts
  });
};

const input = async function (selector, opts = selector) {
  return this.event({
    event: 'input',
    selector,
    text: 't ex to',
    delay: 10,
    ...opts
  });
};

module.exports = simulatorBuilder;