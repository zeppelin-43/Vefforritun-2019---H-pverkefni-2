import { empty } from './helpers';

export default class List {
  constructor() {
    this.container = document.querySelector('.list');
    this.filters = document.querySelectorAll('.filters');
    this.URL = 'lectures.json';
  }

  init() {
    // EVENTLISTERNER á filter takka
  }

  load() {
    empty(this.container);
    empty('asdad');
    //TODO
    // Tékka hvað á að birta og hvernig, hvaða filterar
  }

  displayLectures() {
    //TODO
  }


  /**
   * Fall sem sækir fyrirlestrana. Notar lectureReader.js
   */
  fetchLectures() {
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Villa við að sækja gögn');
      })
      .then((data) => {
        const lectures = data.lectures;

      })
      .catch((error) => {
        //displayError('Villa!');
        console.error(error); /* eslint-disable-line */
      });
  }

  active(e) {
    console.log(e);
    e.target.classList.toggle('item--done');
  }

  eventlistenerOnButton() {
    for (let i = 0; i < this.filters.length; i += 1) {
      this.filters[i].addEventListener('click', this.active);
      console.log("stoff2");


    }
  }

  filterSelection(c) {
    console.log(c);
  }




  //TODO Föll fyrir filtera





}
