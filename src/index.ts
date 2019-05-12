import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import './style.css';

import * as gridHTML from './grid.html';

console.log(gridHTML);

function component() {
  const element = document.createElement("div");
  // element.innerHTML = /*html*/ `<p class="lead"> ben </p>`;
  element.innerHTML = gridHTML;
  return element;
}

document.body.appendChild(component());

console.log("why o why");
