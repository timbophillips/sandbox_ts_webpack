function component() {
    const element = document.createElement('div');
    element.innerHTML = "text goes here";
    return element;
  }
  
  document.body.appendChild(component());