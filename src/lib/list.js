import { empty } from './helpers';
import * as helpers from './helpers';

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
    this.update();
    // Tékka hvað á að birta og hvernig, hvaða filterar
  }


  /**
   * Fall sem sækir fyrirlestrana.
   */
  update() {
    fetch(this.URL)
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
    empty(this.container);
    this.update();
  }

  eventlistenerOnButton() {
    for (const button of filters.querySelectorAll('.filters__button')) { /* eslint-disable-line */
      button.addEventListener('click', this.active.bind(this));
    }
  }

  filterLectures(lectures) {
    const filteredLectures = [];
    for (const button of filters.querySelectorAll('.filters__button')) { /* eslint-disable-line */
      if (button.classList.contains('button-active')) {
        for (const item of lectures) { /* eslint-disable-line */
          if (item.category === button.id) {
            filteredLectures.push(item);
          }
        }
      }
    }
    if (filteredLectures.length < 1) {
      return lectures;
    }
    return filteredLectures;
  }


  displayLectures(lectures) {
    for (const lecture of lectures) { /* eslint-disable-line */
      const title = helpers.el('h2');
      title.innerText = lecture.title;

      const category = helpers.el('h3');
      category.innerText = lecture.category;


      const img = helpers.el('img');
      img.src = lecture.thumbnail;


      const div = helpers.el('div', img, title, category);
      this.container.appendChild(div);
    }

  }


}
