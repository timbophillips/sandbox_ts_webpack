// from https://github.com/Microsoft/TypeScript/issues/1897#issuecomment-338650717
// type checking for json schema objects
type AnyJson = boolean | number | string | null | JsonArray | JsonMap;
interface JsonMap {
  [key: string]: AnyJson;
}
interface JsonArray extends Array<AnyJson> { }

// the custom fields I want in every record
type hbDbFields = Record<"doctype" | "modstamp", string>;

export class Collection<T extends AnyJson> {
  // internal private array of documents
  // with type defined as the submitted type T (json schema) ...
  // *plus* the special fields we're putting in it
  private _documents: Array<T & hbDbFields>;
  private _message: string;

  // constructor recieves the string name of the doctype
  constructor(public readonly doctype: string, public readonly database: Database) {
    // needed to initialize the array
    this._documents = [];
    this._message = "collection of doctype: " + this.doctype + " created within database: " + this.database.name;
  }

  // returns the array of documents
  // ** TODO: make this read only (how best to do that?)
  get documents(): Array<T & hbDbFields> {
    return JSON.parse(JSON.stringify(this._documents));
  }

  get message(): string { return (new Date()).toUTCString() + ": " + this._message + "\n" };

  logdocs(): void {
    const log =
      JSON.stringify(this._documents);
    this._message = log;
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

  get recycled(): Collection<T> {
    this._message =
      "collection recycled with doctype: " +
      this.doctype +
      ", inside database: " +
      this.database.name;
    return this;
  }

}

export class Database {

  private _collections: Array<Collection<any>> = [];
  private _message: string = "";

  constructor(public readonly name: string) {
    this._message = "new database created named " + name;
  }
  public addNewOrExistingCollection<T extends AnyJson>(name: string): Collection<T> {
    const existingCollection = this._collections.find(x => x.doctype === name);
    if (existingCollection) {
      return existingCollection.recycled;
    } else {
      const newCollection = new Collection<T>(name, this);
      this._collections.push(newCollection);
      return newCollection;
    }
  }

  get message(): string { return (new Date()).toUTCString() + ": " + this._message + "\n" };

}