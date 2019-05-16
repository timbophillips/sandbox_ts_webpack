export namespace Databases {
  export class Database {
    private online: boolean = true;
    private collections: Array<Collection> = [];
    constructor(public name: string) {
      alert("new database created named " + name);
    }
    public toggleConnection = () => {
      this.online = !this.online;
    };
    public isOnline = () => this.online;
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
    public listCollectionNames = (): string => {
      let names: string = "";
      this.collections.map(x => {
        names += x.name + " ";
      });
      return names;
    };
  }
  export class Collection {
    constructor(public db: Database, public name: string) {
      // alert('new collection named ' + name + ' created in ' + db.name + ' database');
      alert(db.addCollection(this));
    }
  }
}

export function doSomeStuff() {
  let db: Databases.Database;
  let tim: Databases.Collection;

  let button1 = document.createElement("button");
  button1.textContent = "create database named phillips";
  button1.onclick = () => {
    db = new Databases.Database("Phillips");
  };

  let text1 = document.createElement("input");

  let button2 = document.createElement("button");
  button2.textContent =
    "create collection called tim in database named phillips";
  button2.onclick = () => {
    tim = new Databases.Collection(db, text1.value || "tim");
  };

  let button3 = document.createElement("button");
  button3.textContent = "list collections in database";
  button3.onclick = () => {
    alert(db.listCollectionNames());
  };

  document.body.appendChild(button1);
  document.body.appendChild(button2);
  document.body.appendChild(text1);
  document.body.appendChild(button3);
}
