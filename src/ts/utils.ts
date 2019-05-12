const addHTMLtoDocument = ({
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

export { addHTMLtoDocument };
