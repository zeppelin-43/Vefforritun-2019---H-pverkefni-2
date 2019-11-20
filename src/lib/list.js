import { empty } from './helpers';

export default class List {
  constructor() {
    this.container = document.querySelector('.list');
    this.filters = document.querySelectorAll('.filter');
    this.URL = 'lectures.json'
  }

  load() {
    empty(this.container);
  }

  fetchLectures() {

  }

  //TODO Fall til að merkja fyrirlestur sem lokið
  
  //TODO Föll fyrir filtera





}
