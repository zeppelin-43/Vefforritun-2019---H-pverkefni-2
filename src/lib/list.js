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
    this.eventlistenerOnButton();


    // Tékka hvað á að birta og hvernig, hvaða filterar
  }




  /**
   * Fall sem sækir fyrirlestrana. Notar lectureReader.js
   */
  update() {
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Villa við að sækja gögn');
      })
      .then((data) => {
        let lectures = data.lectures;
        lectures = this.filterLectures(lectures);
        this.displayLectures(lectures);
      })
      .catch((error) => {
        //displayError('Villa!');
        console.error(error); /* eslint-disable-line */
      });
  }

  active(e) {
    e.target.classList.toggle('button-active');
    this.update();

  }

  eventlistenerOnButton() { 
    for (let button of filters.querySelectorAll('.filters__button')) { /* eslint-disable-line */
      button.addEventListener('click', this.active);
    }
  }

  filterLectures(lectures) {
    for (let button of filters.querySelectorAll('.filters__button')) { /* eslint-disable-line */
      button.addEventListener('click', this.active);
    }

  }

  displayLectures(lectures){

  }


  //TODO Föll fyrir filtera





}
