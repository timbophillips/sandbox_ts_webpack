import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// my utils.ts file
import { addHTMLtoDocument } from "./utils";

// my css file
import "./style.css";

// my HTML
import * as gridHTML from "./grid.html";

addHTMLtoDocument({
  html: gridHTML,
  document: document
})
