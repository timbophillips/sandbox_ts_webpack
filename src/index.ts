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

// write testing 456 in all "target" elements
addHtmlToDivsByClass({
  outerElement: newDiv,
  className: "output-box",
  html: ""
});

// when button1 is clicked do something
document.getElementsByName("button1").item(0).onclick = () => {
  const box = document.getElementsByName("dbname")[0] as HTMLInputElement;
  const dbname = box.value;
  y.initDB(dbname);
  addHtmlToDivsByClass({
    outerElement: newDiv,
    className: "output-box",
    html: testFunction() + "<br/>"
  });
};

// when button2 is clicked do something else
document.getElementsByName("button2").item(0).onclick = () => {
  const box = document.getElementsByName("colname")[0] as HTMLInputElement;
  const colname = box.value;
  const z = y.createCollection<{ firstname: string; age: number }>(colname)
  addHtmlToDivsByClass({
    outerElement: newDiv,
    className: "output-box",
    html: z.openingMsg + "<br/>"
  });
};

// when button2 is clicked do something else
document.getElementsByName("button3").item(0).onclick = () => {
  let a: string = "";
  y.collectionNamesInDb.map(x => (a += x + "<br/>"));
  addHtmlToDivsByClass({
    outerElement: newDiv,
    className: "output-box",
    html: a + "<br/>"
  });
};
