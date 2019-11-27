import * as helpers from './helpers';
import * as storage from './storage';

export default class List {
  constructor() {
    this.container = document.querySelector('.lectures__row');
    this.filters = document.querySelectorAll('.filter__button');
    this.URL = 'lectures.json';
  }

  load() {
    helpers.empty(this.container);
    this.eventlistenerOnButton();
    this.update();
  }


  /**
   * Fall sem sækir fyrirlestrana og kallar á viðeigandi föll
   * til að filtera og birta fileraðan lista af fyrirlestrum
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
        let { lectures } = data;
        lectures = this.filterLectures(lectures);
        this.displayLectures(lectures);
      })
      .catch((error) => {
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


  /**
   * Setur eventlisteners a filter takkana.
   */
  eventlistenerOnButton() {
    for (const button of this.filters) { /* eslint-disable-line */
      button.addEventListener('click', this.active.bind(this));
    }
  }

  /**
    * Filterar lectures útfrá því hvaða filter takkar eru active.
    * Skilar filteraðum lista, ef ekkert filterað þá skilar hann lectures til baka.
    */
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

  /**
    * Birtir lectures í lectures__row.
    */
  displayLectures(lectures) {
    for (const lecture of lectures) { /* eslint-disable-line */
      const h1 = helpers.el('h1');
      h1.classList.add('lectures__card__category');
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
      h2.innerText = lecture.title;

      const lecturesCardText = helpers.el('div', h1, h2);
      lecturesCardText.classList.add('lectures__card__text');


      const lecturesCardBorder = helpers.el('div', lecturesCardText);
      lecturesCardBorder.classList.add('lectures__card__border');

      const lecturesCard = helpers.el('a', lecturesCardBorder);
      lecturesCard.classList.add('lectures__card');
      lecturesCard.setAttribute('href', `fyrirlestur.html?slug=${lecture.slug}`);

      if (lecture.thumbnail) {
        const img = helpers.el('img');
        img.src = lecture.thumbnail;
        img.alt = lecture.title;
        lecturesCard.appendChild(img);
      }

      if (storage.isFinished(lecture.slug)) {
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
