import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// my utils.ts file
import { addHTMLtoDocument } from "./ts/utils";

// my css file
import "./styles/style.css";

// my HTML
import * as gridHTML from "./html/grid.html";

addHTMLtoDocument({
  html: gridHTML,
  document: document
})
