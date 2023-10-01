import { drawChannelFeed } from './drawChannelFeed.js';
import { drawStatus } from './drawStatus.js';
import { getChannelsAndStreams } from './getChannelsAndStreams.js';
import { Pop } from '../obj/pop.js';
import { queue, setChannelsAndStreams, sortingOptions } from '../../app.js';
import { Status } from '../obj/status.js';

export function drawPop(popRequest: Pop) {
  if (document.querySelector('.pop')) return;

  const filter = document.createElement('div');
  filter.classList.add('filter');

  const pop = document.createElement('div');
  pop.classList.add('pop');
  const hdr = document.createElement('h1');
  hdr.innerText = popRequest.getHeader();
  const inp = document.createElement('input');
  inp.type = 'text';

  const axnCtr = document.createElement('div');
  const conf = document.createElement('button');
  conf.classList.add('confirm');
  conf.innerText = 'Ok';
  const cxl = document.createElement('button');
  cxl.classList.add('cancel');
  cxl.innerText = 'Cancel';

  conf.addEventListener('click', setAdd(inp, pop, filter));
  cxl.addEventListener('click', setClose(pop, filter));

  axnCtr.appendChild(conf);
  axnCtr.appendChild(cxl);
  pop.appendChild(hdr);
  pop.appendChild(inp);
  pop.appendChild(axnCtr);
  document.querySelector('.main')?.appendChild(filter);
  document.querySelector('.main')?.appendChild(pop);
}

function setClose(filter: HTMLElement, pop: HTMLElement) {
  return function () {
    close(filter, pop);
  };
}

function setAdd(
  input: HTMLInputElement,
  filter: HTMLElement,
  pop: HTMLElement
) {
  return function () {
    queue.add(input.value);
    queue.updateQueryString();

    const status = new Status('Adding channel');
    drawStatus(status);

    setChannelsAndStreams(
      getChannelsAndStreams(queue.getQueryString(), status)
    );
    drawChannelFeed(sortingOptions);

    close(filter, pop);
  };
}

function close(filter: HTMLElement, pop: HTMLElement) {
  pop.remove();
  filter.remove();
}
