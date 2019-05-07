function component() {
    const element = document.createElement('div');
  
    element.innerHTML = "Hello typescript on webpack";
  
    return element;
  }
  
  document.body.appendChild(component());