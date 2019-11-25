import * as helpers from './helpers';
import * as storage from './storage';

export default class List {
  constructor() {
    this.container = document.querySelector('.lectures__row');
    this.filters = document.querySelectorAll('.filter__button');
    this.URL = 'lectures.json';
  }

  init() {
    // EVENTLISTERNER á filter takka
  }

  load() {
    helpers.empty(this.container);

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

  /* -----------Event methods------------- */

  active(e) {
    e.target.classList.toggle('filter--active');
    helpers.empty(this.container);
    this.update();
  }

  /* --------------------------------- */


  eventlistenerOnButton() {
    for (const button of this.filters) { /* eslint-disable-line */
      button.addEventListener('click', this.active.bind(this));
    }
  }

  filterLectures(lectures) {
    const filteredLectures = [];
    for (const button of this.filters) { /* eslint-disable-line */
      if (button.classList.contains('filter--active')) {
        for (const item of lectures) { /* eslint-disable-line */
          if (item.category === button.getAttribute('lecture-category')) {
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
      const h1 = helpers.el('h1');
      h1.classList.add('lectures__card__category');
      h1.classList.add('lectures__card__text');
      switch (lecture.category) {
        case 'javascript':
          h1.innerText = 'JavaScript';
          break;

        case 'html':
          h1.innerText = 'HTML';
          break;

        default:
          h1.innerText = 'CSS';
      }


      const h2 = helpers.el('h2');
      h2.classList.add('lectures__card__title');
      h2.classList.add('lectures__card__text');
      h2.innerText = lecture.title;


      const check = helpers.el('div');
      check.classList.add('lectures__card__done');
      check.classList.add('lectures__card__check');

      const lecturesCardBorder = helpers.el('div', h1, h2, check);
      lecturesCardBorder.classList.add('lectures__card__border');

      const lecturesCard = helpers.el('a', lecturesCardBorder);
      lecturesCard.classList.add('lectures__card');
      lecturesCard.setAttribute('href', `fyrirlestur.html?slug=${lecture.slug}`);

      if (lecture.thumbnail) {
        const img = helpers.el('img');
        img.src = lecture.thumbnail;
        lecturesCard.appendChild(img);
      }

      /*storage.ifFinished(lecture.slug)*/ 
      if (true) {
        const lecturesCardDone = helpers.el('div', '✓');
        lecturesCardDone.classList.add('lectures__card__done');
        lecturesCardBorder.appendChild(lecturesCardDone);
      }

      const lecturesCol = helpers.el('div', lecturesCard);
      lecturesCol.classList.add('lectures__col');
      this.container.appendChild(lecturesCol);
    }

  }


}
