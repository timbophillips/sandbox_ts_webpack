import { } from 'rxjs';

const addDivToDocument = ({
  html,
  document
}: {
  html: string;
  document: Document;
}): HTMLDivElement => {
  const component = () => {
    const element = document.createElement("div");
    element.innerHTML = html;
    return element;
  };

  return document.body.appendChild(component());
};

const addHtmlToDivsByClass = ({
  outerElement,
  className,
  html,
  overwrite
}: {
  outerElement: HTMLElement;
  className: string;
  html: string;
  overwrite?: boolean;
}): HTMLCollectionOf<Element> => {
  const items = outerElement.getElementsByClassName(className);
  for (let item of items) {
    if (overwrite) {
      item.innerHTML = html;
    } else {
      item.innerHTML += html;
    }
  }
  return items;
};



class boxForObs {

  private _template = /*html*/`
  <div class="col-12 docs-box pre-scrollable"></div>
  `

  private _style = /*css*/`
  .output-box, .docs-box {
    margin-left: 1rem;
    margin-right: 1rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
    background-color: rgba(86, 61, 124, 0.15);
    border: 1px solid rgba(86, 61, 124, 0.2);
    min-height: 40rem;
    max-height: 40rem;
  }
  `
  
  constructor(private document: Document) {
  }
  
  component = () => {
    const element = this.document.createElement("div");
    element.innerHTML = this._template;
    element.setAttribute("style", this._style);
    return element
  }
}

customElements.define('box-observable',
  class extends HTMLElement {
    constructor() {
      super();

      const pElem = document.createElement('p');
      pElem.textContent = this.getAttribute('observable');

      const shadowRoot = this.attachShadow({mode: 'open'});
      shadowRoot.appendChild(pElem);
    }
  }
);

export { addDivToDocument, addHtmlToDivsByClass, boxForObs };
