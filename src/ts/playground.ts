export class Database {
  private _online: boolean = true;
  private collections: Array<Collection> = [];
  constructor(public name: string) {
    alert("new database created named " + name);
  }
  public toggleConnection = () => {
    this._online = !this._online;
  };
  public get online() {
    return this._online;
  }
  public addCollection(collection: Collection): string {
    if (this.collections.find(x => x.name === collection.name)) {
      return "already have a collection named " + collection.name;
    } else {
      this.collections.push(collection);
      return (
        "new collection added to me (" +
        this.name +
        ") and it is called ... " +
        collection.name
      );
    }
  }
  public get collectionNames(): string {
    let names: string = "";
    this.collections.map(x => {
      names += x.name + " ";
    });
    return names;
  };
}
export class Collection {
  openingMsg: string;
  constructor(public db: Database, public name: string) {
    this.openingMsg = db.addCollection(this);
  }
  get feedback(): string {
    return this.openingMsg;
  }
}

export function doSomeStuff() {
  let db: Database;
  let tim: Collection;

  let button1 = document.createElement("button");
  button1.textContent = "create database named phillips";
  button1.onclick = () => {
    db = new Database("Phillips");
  };

  let text1 = document.createElement("input");

  let button2 = document.createElement("button");
  button2.textContent =
    "create collection called tim in database named phillips";
  button2.onclick = () => {
    tim = new Collection(db, text1.value || "tim");
    alert(tim.feedback);
  };

  let button3 = document.createElement("button");
  button3.textContent = "list collections in database";
  button3.onclick = () => {
    alert(db.collectionNames);
  };

  document.body.appendChild(button1);
  document.body.appendChild(button2);
  document.body.appendChild(text1);
  document.body.appendChild(button3);
}
