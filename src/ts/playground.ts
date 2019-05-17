export class Collection<T> {
  public openingMsg: string;
  constructor(public db: Database, public name: string) {
    this.openingMsg =
      "i've been created and my name is " +
      name +
      ", i am a collection inside " +
      db.name;
  }
  get feedback(): string {
    return this.openingMsg;
  }
  get recycled(): Collection<any> {
    this.openingMsg =
      "i've been recycled and my name is " +
      this.name +
      ", i am a collection inside " +
      this.db.name;
    return this;
  }
}

export class Database {
  private _collections: Array<Collection<any>> = [];
  public openingMsg: string = "";
  constructor(public name: string) {
    this.openingMsg = "new database created named " + name;
  }
  public addNewOrExistingCollection<T>(name: string): Collection<T> {
    const existingCollection = this._collections.find(x => x.name === name);
    if (existingCollection) {
      return existingCollection.recycled;
    } else {
      const newCollection = new Collection(this, name);
      this._collections.push(newCollection);
      return newCollection;
    }
  }

  public get collections(): Array<Collection<any>> {
    return this._collections;
  }
}

export class doSomeStuff {
  db!: Database;
  tim: any;

  constructor() {
  }

  public initDB(name: string): Database {
    this.db = new Database(name);
    return this.db;
  }

  public createCollection<T>(name: string): Collection<any> {
    const z = this.db.addNewOrExistingCollection<T>(name);
    return z;
  }

  public get collectionNamesInDb(): Array<string> {
    let names: Array<string> = [];
    this.db.collections.map(x => {
      names.push(x.name);
    });
    return names;
  }
}
