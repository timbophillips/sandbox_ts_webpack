import { Observable, of, BehaviorSubject } from "rxjs";

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
  private _documents$: BehaviorSubject<Array<T & hbDbFields>>;

  // constructor recieves the string name of the doctype
  constructor(
    public readonly doctype: string,
    public readonly database: Database
  ) {
    // needed to initialize the array
    this._documents = [];
    this._documents$ = new BehaviorSubject<Array<T & hbDbFields>>([]);
  }

  documents$ = (): Observable<Array<T & hbDbFields>> =>
    this._documents$.asObservable();

  addDocument$ = (doc: T): Observable<T & hbDbFields> =>
    of(this._addDocument(doc));

  // adding a document, typechecked to be same as json schema type T
  // the doctype and modstamp are then added
  private _addDocument(doc: T): T & hbDbFields {
    const hbDoc = Object.assign(doc, {
      doctype: this.doctype,
      modstamp: new Date().toJSON()
    });
    this._documents.push(hbDoc);
    this._documents$.next(this._documents);
    return hbDoc;
  }

  recycled = (): Collection<T> => this;
}

export class Database {
  private _name: string = "";
  private _collections: Array<Collection<any>> = [];
  private _message$: BehaviorSubject<string>;

  constructor(public readonly name: string) {
    this._message$ = new BehaviorSubject<string>(
      "new database created named " + name
    );
    this._message$.next("new database created named " + name);
  }

  message$ = (): Observable<string> => this._message$.asObservable();

  addNewOrExistingCollection$ = <T extends AnyJson>(
    name: string
  ): Observable<Collection<T>> => {
    const existingCollection = this._collections.find(x => x.doctype === name);
    if (existingCollection) {
      this._message$.next(
        "collection recycled with doctype: " +
          existingCollection.doctype +
          ", inside database: " +
          this.name
      );
      return of(existingCollection.recycled());
    } else {
      const newCollection = new Collection<T>(name, this);
      this._collections.push(newCollection);
      this._message$.next(
        "collection of doctype: " +
          newCollection.doctype +
          " created within database: " +
          this.name
      );
      return of(newCollection);
    }
  };
}

export const Database$ = (name: string): Observable<Database> => {
  return of(new Database(name));
};
