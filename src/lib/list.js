import { empty } from './helpers';

export default class List {
  constructor() {
    this.container = document.querySelector('.list');
    this.filters = document.querySelectorAll('.filter');
    this.URL = 'lectures.json'
  }

  init() {
    // EVENTLISTERNER á filter takka
  }

  load() {
    empty(this.container);
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
          //TODO
      })
      .catch((error) => {
          displayError('Villa!');
          console.error(error); /* eslint-disable-line */
      });
  }



  //TODO Fall til að merkja fyrirlestur sem lokið
  
  //TODO Föll fyrir filtera





}
