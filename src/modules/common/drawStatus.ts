import { apiDetails } from '../../app.js';
import { Status } from '../obj/status.js';

export function drawStatus(status: Status) {
  let rerender: boolean = false;

  const stat = document.createElement('div');
  stat.classList.add('status-entry');
  stat.id = status.getId();

  const statLbl = document.createElement('div');
  statLbl.classList.add('status-entry-label');
  const prmpt = document.createElement('p');
  prmpt.innerText = status.getPrompt();
  statLbl.appendChild(prmpt);
  stat.appendChild(statLbl);

  if (document.querySelector(`#${status.getId()}`)) {
    if (!apiDetails.getApiDetails()) {
      document.querySelector(`#${status.getId()}`)?.remove();
      return;
    }

    document.querySelector(`#${status.getId()}`)?.remove();
    rerender = true;

    const statD = document.createElement('div');
    statD.classList.add('status-entry-details');

    const cl = document.createElement('img');
    cl.src = 'src/static/ico/close.svg';
    cl.addEventListener('click', function () {
      document.querySelector(`#${status.getId()}`)?.remove();
    });

    statLbl.appendChild(cl);

    const stm = document.createElement('p');
    stm.innerText = `Issued: ${status.getStamp()}`;

    const resp = document.createElement('p');
    resp.innerText = `Response: ${status.getResponse().toString()}`;

    const respT = document.createElement('p');
    respT.innerText = `Response time: ${status
      .getResponseTime()
      .toString()} seconds`;

    statD.appendChild(stm);
    statD.appendChild(resp);
    statD.appendChild(respT);

    stat.appendChild(statD);
  }

  if (!rerender) {
    statLbl.classList.add('pending');

    const spnr = document.createElement('div');
    spnr.classList.add('spinner');
    statLbl.appendChild(spnr);
  }

  const stCtr = document.querySelector('.side-panel-status');
  stCtr?.appendChild(stat);
}
