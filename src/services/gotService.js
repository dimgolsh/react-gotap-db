export default class GotService {
  constructor() {
    this._apiBase = "https://www.anapioficeandfire.com/api";
    // this._apiBase = "https://cors-anywhere.herokuapp.com/https://www.anapioficeandfire.com/api";
  }
  getResorce = async (url) => {
    const res = await fetch(`${this._apiBase}${url}`);
    if (!res.ok) {
      throw new Error(`Could not fey ${url} status ${res.status}`);
    }
    const some = await res.json();

    return some;
  };

  getAllCharacters = async () => {
    const res = await this.getResorce("/characters?page=5&pageSize=10");
    return res.map(this._transformCharacter);
  };
  getCharacter = async (id) => {
    const res = await this.getResorce(`/characters/${id}`);
    return this._transformCharacter(res);
  };
  getAllBooks = async () => {
    const res = await this.getResorce("/books");
    return res.map(this._transformBook);
  };
  getBook = async (id) => {
    const book = await this.getResorce(`/books/${id}`);
    return this._transformBook(book);
  };

  getAllHouses = async () => {
    const res = await this.getResorce("/houses/");
    return res.map(this._transformHouse);
  };
  
  getHouse = async (id) => {
    const house = await this.getResorce(`/houses/${id}`);
    return this._transformHouse(house);
  };

  _extractId = (item) => {
    const idRegExp = /\/([0-9]*)$/;
    // console.log(item);
    return item.match(idRegExp)[1];
  };
  _transformCharacter = (char) => {
    //   console.log(char);
    return {
      id: this._extractId(char.url),
      url: char.url.match(/\d+/gm)[0],
      name: char.name,
      gender: char.gender,
      born: char.born,
      died: char.died ? char.died : "unknown",
      culture: char.culture,
    };
  };
  _transformHouse = (house) => {
    return {
      id: this._extractId(house.url),
      url: house.url.match(/\d+/gm)[0],
      name: house.name,
      region: house.region,
      words: house.words,
      titles: house.titles,
      overlord: house.overlord,
      ancestralWeapons: house.ancestralWeapons,
    };
  };

  _transformBook = (book) => {
    return {
      id: this._extractId(book.url),
      url: book.url.match(/\d+/gm)[0],
      name: book.name,
      numberOfPages: book.numberOfPages,
      publisher: book.publisher,
      released: book.released,
    };
  };
}
