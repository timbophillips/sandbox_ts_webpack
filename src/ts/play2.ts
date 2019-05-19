// from https://github.com/Microsoft/TypeScript/issues/1897#issuecomment-338650717
// type checking for json schema objects
type AnyJson = boolean | number | string | null | JsonArray | JsonMap;
interface JsonMap { [key: string]: AnyJson; }
interface JsonArray extends Array<AnyJson> { }

// the custom fields I want in every record
type hbDbFields = Record<'doctype' | 'modstamp', string>

class Collection<T extends AnyJson> {
    // internal private array of documents
    // with type defined as the submitted type T (json schema) ...
    // *plus* the special fields we're putting in it
    private _documents: Array<T & hbDbFields>

    // constructor recieves the string name of the doctype
    constructor(private doctype: string) {
        // needed to initialize the array
        this._documents = [];
    }
    // returns the array of documents
    // ** TODO: make this read only (how best to do that?)
    get documents(): Array<T & hbDbFields> { return this._documents }

    // adding a document, typechecked to be same as json schema type T
    // the doctype and modstamp are then added
    addDocument(doc: T): T & hbDbFields {
        const hbDoc = Object.assign(doc, { doctype: this.doctype, modstamp: (new Date).toJSON() });
        this._documents.push(hbDoc);
        return hbDoc;
    }
}

type qType = {
    greeting: string;
    firstname: string;
}

let q = new Collection<qType>("legends");

let qDoc: qType = {
    greeting: "hello",
    firstname: "timothy",
};

let qDoc2 = {
    greeting: "ciao",
    firstname: "sarah",
    doctype: "poo",
    weird: "is it?",
    modstamp: 1234456356456
};

let notQDoc = {
    greeter: "bonjour",
    firstname: "ben"
}

q.addDocument(qDoc);
q.addDocument(qDoc2);

// this fails
// q.addDocument(notQDoc);

console.log(JSON.stringify(q.documents));
console.log(q.documents);