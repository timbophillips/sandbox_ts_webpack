import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { doSomeStuff } from "./ts/playground";
import {Collection, testFunction} from "./ts/generics";

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


let y = new doSomeStuff();

let myCollection:  Collection<any>;

// write testing 456 in all "target" elements
addHtmlToDivsByClass({
  outerElement: newDiv,
  className: "output-box",
  html: ""
});

// when button1 is clicked do something
document.getElementsByName("createCollection").item(0).onclick = () => {
  const box = document.getElementsByName("collection-name")[0] as HTMLInputElement;
  const colName = box.value;
  myCollection = new Collection<{ firstname: string; lastname: string; age: number}>(colName)
  addHtmlToDivsByClass({
    outerElement: newDiv,
    className: "output-box",
    html: myCollection.logdocs() + "<br/>"
  });
};

// when button2 is clicked do something else
document.getElementsByName("addDocument").item(0).onclick = () => {
  const boxFn = document.getElementsByName("firstname")[0] as HTMLInputElement;
  const boxLn = document.getElementsByName("lastname")[0] as HTMLInputElement;
  const boxAge = document.getElementsByName("age")[0] as HTMLInputElement;
  const firstname = boxFn.value;
  const lastname = boxLn.value;
  const age = boxAge.value;

  myCollection.addDocument({
    firstname: firstname,
    lastname: lastname,
    age: age
  })

};

// when button2 is clicked do something else
document.getElementsByName("outputCollection").item(0).onclick = () => {
  addHtmlToDivsByClass({
    outerElement: newDiv,
    className: "output-box",
    html: myCollection.logdocs() + "<br/>"
  });
};
