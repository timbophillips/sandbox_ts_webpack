// from https://github.com/Microsoft/TypeScript/issues/1897#issuecomment-338650717
// type checking for json schema objects
type AnyJson = boolean | number | string | null | JsonArray | JsonMap;
interface JsonMap {
  [key: string]: AnyJson;
}
interface JsonArray extends Array<AnyJson> {}

// the custom fields I want in every record
type hbDbFields = Record<"doctype" | "modstamp", string>;

export class Collection<T extends AnyJson> {
  // internal private array of documents
  // with type defined as the submitted type T (json schema) ...
  // *plus* the special fields we're putting in it
  private _documents: Array<T & hbDbFields>;

  // constructor recieves the string name of the doctype
  constructor(private doctype: string) {
    // needed to initialize the array
    this._documents = [];
  }
  // returns the array of documents
  // ** TODO: make this read only (how best to do that?)
  get documents(): Array<T & hbDbFields> {
    return JSON.parse(JSON.stringify(this._documents));
  }

  logdocs(): string {
    const log =
      "docs logged from inside the class \n" + JSON.stringify(this._documents);
    console.log(log);
    return log;
  }

  // adding a document, typechecked to be same as json schema type T
  // the doctype and modstamp are then added
  addDocument(doc: T): T & hbDbFields {
    const hbDoc = Object.assign(doc, {
      doctype: this.doctype,
      modstamp: new Date().toJSON()
    });
    this._documents.push(hbDoc);
    return hbDoc;
  }
}


