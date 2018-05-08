let requests;


const simulatorBuilder = function(page, req){
	requests = req;
	return {
		page,
		event,
		click,
		input,
		selectt,
		waitForSelector: selector => page.waitForSelector(selector),
		delay: ms => page.waitFor(ms)
	};
}

const event = async function ({
  selector,
  event,
  text,
  delay,
  button = 'right',
  value
}) {
  try {
    if (event === 'mousedown') {
      await this.page.click(selector, { button });
    } else if (event === 'input') {
      await this.page.type(selector, text, { delay });
      await this.page.evaluate('document.activeElement.blur()');
    }
	else if (event === 'select'){
		await this.page.select(selector, value);
	}
    await this.page.waitFor(500);
  } catch ($$e) {};
};

const click = async function (selector, opts = selector) {
	if(opts.msg != undefined){
	requests.push({
		title:"click",
		text: opts.msg
	});
	}
  return this.event({
    event: 'mousedown',
    selector,
    button: 'right',
    ...opts
  });
};

const input = async function (selector, opts = selector) {
	if(opts.msg != undefined){
	requests.push({
		title:"input",
		text: opts.msg
	});
	}
  return this.event({
    event: 'input',
    selector,
    text: 't ex to',
    delay: 10,
    ...opts
  });
};

const selectt = async function (selector, opts = selector){
	if(opts.msg != undefined){
	requests.push({
		title:"select",
		text: opts.msg
	});
	}
  return this.event({
    event: 'select',
    selector,
    delay: 10,
    ...opts
  });
};

module.exports = simulatorBuilder;