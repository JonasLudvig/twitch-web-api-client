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
  const inpCtr = document.createElement('div');
  const inp = document.createElement('input');
  inp.type = 'text';
  inp.placeholder = 'Channel ID';

  const axnCtr = document.createElement('div');
  const conf = document.createElement('button');
  conf.classList.add('confirm');
  conf.innerText = 'Ok';
  const cxl = document.createElement('button');
  cxl.classList.add('cancel');
  cxl.innerText = 'Cancel';

  conf.addEventListener('click', setAdd(conf, inpCtr, inp, pop, filter));
  cxl.addEventListener('click', setClose(pop, filter));

  axnCtr.appendChild(conf);
  axnCtr.appendChild(cxl);
  inpCtr.appendChild(inp);
  pop.appendChild(hdr);
  pop.appendChild(inpCtr);
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
  conf: HTMLButtonElement,
  inputContainer: HTMLElement,
  input: HTMLInputElement,
  pop: HTMLElement,
  filter: HTMLElement
) {
  return async function () {
    setPrompt();
    setPending(conf, true);

    if (!(await validateChannel(parseInt(input.value)))) {
      setPending(conf, false);
      setPrompt(inputContainer);
      return;
    }

    setPending(conf, true);

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

async function validateChannel(channelId: number) {
  const response = await fetch(
    `https://qsdlr.org/twitch-rest-api/get-user?${channelId}`
  );
  const channelArray = JSON.parse(await response.json());
  if (channelArray.data) return true;
  else return false;
}

function setPending(button: HTMLButtonElement, pending: boolean) {
  if (pending) button.disabled = true;
  else button.disabled = false;
}

function setPrompt(inputContainer?: HTMLElement) {
  if (!inputContainer) {
    if (document.querySelector('.prompt'))
      document.querySelector('.prompt')?.remove();
    return;
  }

  const prmptCtr = document.createElement('div');
  const prmptPt = document.createElement('div');
  prmptCtr.classList.add('prompt');
  const prmpt = document.createElement('p');
  prmpt.innerText = 'Not found';
  prmptCtr.appendChild(prmptPt);
  prmptCtr.appendChild(prmpt);
  inputContainer.appendChild(prmptCtr);
}
