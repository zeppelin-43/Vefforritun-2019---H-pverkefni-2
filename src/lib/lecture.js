import * as helpers from './helpers';
import * as storage from './storage';
import * as contentCreation from './content';

export default class Lecture {
  constructor() {
    this.body = document.querySelector('.lecture');
    this.URL = 'lectures.json';
  }

  /**
     * Finnur réttan fyrirlestur miðað við SLUG
     */
  getLecture(slug) {
    fetch(this.URL)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Villa við að sækja gögn');
      })
      .then((data) => {
        const { lectures } = data;
        let lecture = null;
        for (let i = 0; i < lectures.length; i += 1) {
          if (lectures[i].slug === slug) {
            lecture = lectures[i];
          }
        }

        if (lecture) {
          this.displayLecture(lecture);
        } else {
          throw new Error('Rangt slug');
        }
      })
      .catch((error) => {
            console.error(error); /* eslint-disable-line */
      });
  }


  createHeader(lecture) {
    const header = helpers.el('header');
    header.className = 'header header__overlay';
    const content = helpers.el('div');
    content.className = 'header__content';
    const title = helpers.el('h1', lecture.category);
    title.className = 'header__title';
    const undertitle = helpers.el('h2', lecture.title);
    undertitle.className = 'header__undertitle';

    content.appendChild(title);
    content.appendChild(undertitle);
    header.appendChild(content);
    if (lecture.image) {
      header.style.backgroundImage = `url(${lecture.image})`;
    }
    this.body.appendChild(header);
  }

  createMain(lecture) {
    const main = helpers.el('main');
    const row = helpers.el('div');
    row.className = 'lecture__row';
    const col = helpers.el('div');
    col.className = 'lecture__col';
    row.appendChild(col);
    main.appendChild(row);

    const { content } = lecture; // Sækja contentið úr lecture
    content.forEach((object) => {
      const { type } = object;
      switch (type) {
        case 'youtube':
          col.appendChild(contentCreation.youtube(object));
          break;
        case 'text':
          col.appendChild(contentCreation.text(object));
          break;
        case 'quote':
          col.appendChild(contentCreation.quote(object));
          break;
        case 'image':
          col.appendChild(contentCreation.image(object));
          break;
        case 'heading':
          col.appendChild(contentCreation.heading(object));
          break;
        case 'list':
          col.appendChild(contentCreation.list(object));
          break;
        case 'code':
          col.appendChild(contentCreation.code(object));
          break;
        default:
          col.appendChild(helpers.el('div', object.type));
      }
    });

    this.body.appendChild(main);
  }

  createFooter(lecture) {
    const footer = helpers.el('footer');
    footer.className = 'lecture__footer';
    const { slug } = lecture;
    const finish = helpers.el('a');
    finish.className = 'lecture__footer__finish';
    if (storage.load().includes(slug)) {
      finish.innerHTML = '✓ Fyrirlestur kláraður';
      finish.classList.add('lecture__footer__finish--check');
    } else {
      finish.innerHTML = 'Klára fyrirlestur';
    }
    finish.setAttribute('href', '#');
    finish.setAttribute('onclick', 'return false');
    finish.addEventListener('click', this.finishLecture);
    const back = helpers.el('a', 'Til baka');
    back.className = 'lecture__footer__back';
    back.setAttribute('href', '/');
    footer.appendChild(finish);
    footer.appendChild(back);
    this.body.appendChild(footer);
  }


  displayLecture(lecture) {
    helpers.empty(this.body);

    this.createHeader(lecture);
    this.createMain(lecture);
    this.createFooter(lecture);
  }


  finishLecture(e) {
    const slug = (new URLSearchParams(window.location.search)).get('slug');

    // const finish = document.querySelector('.lecture__footer__finish');

    e.target.innerHTML = '✓ Fyrirlestur kláraður';
    e.target.classList.add('lecture__footer__finish--check');
    storage.save(slug);
  }

  load() {
    const slug = (new URLSearchParams(window.location.search)).get('slug'); // Sækja sluggið
    this.getLecture(slug);
  }
}
