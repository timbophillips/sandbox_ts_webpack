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

export { addDivToDocument, addHtmlToDivsByClass };
