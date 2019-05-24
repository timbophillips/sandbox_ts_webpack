import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { Collection, Database, Database$ } from "./ts/generics";

// my utils.ts file
import { addDivToDocument, addHtmlToDivsByClass } from "./ts/utils";

// my css file
import "./styles/style.css";

// my HTML
import * as gridHTML from "./html/barebones.html";
import { Observable, merge } from "rxjs";

// add HTML to document as new <div>
const newDiv = addDivToDocument({
  html: gridHTML,
  document: document
});

let myCollection: Collection<any>;
let myDatabase: Database;

// write testing 456 in all "target" elements
addHtmlToDivsByClass({
  outerElement: newDiv,
  className: "output-box",
  html: ""
});

// when button1 is clicked do something
document.getElementsByName("createDatabase").item(0).onclick = () => {

  const box = document.getElementsByName(
    "database-name"
  )[0] as HTMLInputElement;
  const dbName = box.value;

  Database$(dbName).subscribe(a => {
    myDatabase = a;

    myDatabase.message$.subscribe(m => {
      addHtmlToDivsByClass({
        outerElement: newDiv,
        className: "output-box",
        html: m + " ... <br/>"
      });
    });

  });
};

// when button1 is clicked do something
document.getElementsByName("createCollection").item(0).onclick = () => {
  const box = document.getElementsByName(
    "collection-name"
  )[0] as HTMLInputElement;
  const colName = box.value;
  type myType = {
    firstname: string;
    lastname: string;
    age: number;
  };

  myDatabase.addNewOrExistingCollection$<myType>(colName).subscribe(c => {
    myCollection = c;
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
  });

  addHtmlToDivsByClass({
    outerElement: newDiv,
    className: "output-box",
    html: firstname + " " + lastname + " added ... <br/>"
  });
};

// when button2 is clicked do something else
document.getElementsByName("outputCollection").item(0).onclick = () => {
  let docString: string = "";
  myCollection.documents.map(
    doc => (docString += JSON.stringify(doc) + "<br/>")
  );
  addHtmlToDivsByClass({
    outerElement: newDiv,
    className: "output-box",
    html: docString
  });
};
