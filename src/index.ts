// import "bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
import '../src/style.css';

function component() {
  const element = document.createElement("div");
  element.innerHTML = /*html*/ `
<p> tim </p>
  `;
  return element;
}

document.body.appendChild(component());

console.log("why o why");
