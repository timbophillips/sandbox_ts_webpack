import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// my utils.ts file
import { addDivToDocument, addHtmlToDivsByClass } from "./ts/utils";

// my css file
import "./styles/style.css";

// my HTML
import * as gridHTML from "./html/barebones.html";

// add HTML to document as new <div>
const newDiv = addDivToDocument({
  html: gridHTML,
  document: document
});

// write testing 456 in all "target" elements
addHtmlToDivsByClass({
  outerElement: newDiv,
  className: "output-box",
  html: /*html*/ `<samp>ts code output goes here</samp>`
});

// when button1 is clicked do something
document.getElementsByName("button1").item(0).onclick = () => {
  addHtmlToDivsByClass({
    outerElement: newDiv,
    className: "output-box",
    html: /*html*/ `<samp>, and so on and so forth</samp>`
  });
};

// when button2 is clicked do something else
document.getElementsByName("button2").item(0).onclick = () => {
  addHtmlToDivsByClass({
    outerElement: newDiv,
    className: "output-box",
    html: /*html*/ `<samp>, this could go forever</samp>`
  });
};
