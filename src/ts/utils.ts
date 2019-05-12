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
  html
}: {
  outerElement: HTMLElement;
  className: string;
  html: string;
}): HTMLCollectionOf<Element> => {
  const items = outerElement.getElementsByClassName(className);
  for (let item of items) {
    item.innerHTML = html;
  }
  return items;
};

export { addDivToDocument, addHtmlToDivsByClass };
