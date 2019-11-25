import * as helpers from './helpers';
import * as storage from './storage';

export default class Lecture {
    constructor() {
        this.body = document.querySelector('.lecture-page');
        this.URL = 'lectures.json';
        this.SLUG; // Geyma slug-ið í þessu
    }

    /**
     * Finnur réttan fyrirlestur miðað við SLUG
     */
    getLecture() {
        fetch(this.URL)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Villa við að sækja gögn');
        })
        .then((data) => {
            
            const lectures = data.lectures;
            var lecture = null;
            for(let i = 0; i<lectures.length; i++) {
                if(lectures[i].slug === this.SLUG) {
                    console.log('Found the right slug ' + lectures[i].slug);
                    // console.log(lectures[i]);
                    lecture= lectures[i];
                    // return o;
                }
            }
            
            if(lecture) {
               this.displayLecture(lecture);
            }
            else {
                throw new Error('Rangt slug');
            }
            
            
        })
        .catch((error) => {
            // displayError('Villa!');
            console.error(error); /* eslint-disable-line */
        });
    }

    
    createHeader(header, lecture) {
        const content = helpers.el('div');
        content.className = 'header__content';
        const category = helpers.el('h1', lecture.category);
        category.className = 'header__title';
        const  title = helpers.el('h2', lecture.title);
        title.className = 'header__undertitle';

        content.appendChild(category);
        content.appendChild(title);
        header.appendChild(content);
    }
    displayLecture(lecture) {
        //TODO 
        console.log(lecture);
        const col = this.body.querySelector('.lecture__col');
        const header = this.body.querySelector('.header.header__overlay');
        helpers.empty(col);
        helpers.empty(header);
        // TODO búa til header

        const content = lecture.content; // Sækja contentið úr lecture

        this.createHeader(header, lecture);

        content.forEach(object => {
            const type = object.type;
            //TODO setja class name á allt
            switch (type) {
                case 'youtube':
                    const youtube = helpers.el('div');
                    youtube.className = 'lecture__youtube';
                    const videoFrame = helpers.el('iframe');
                    videoFrame.setAttribute('src', object.data); // data er urlið
                    videoFrame.className = 'lecture__youtube__iframe';

                    youtube.appendChild(videoFrame);
                    col.appendChild(youtube);
                    break;
                case 'text':
                    const texts = object.data.split('\n');
                    const textElements = texts.map((x) => { 
                        const el = helpers.el('p', x);
                        el.className = 'lecture__text__part'
                        return el;}); // Vantar að bæta við klasanöfnum
                    const lectureText  = helpers.el('div');
                    lectureText.className = 'lecture__text';
                    textElements.forEach((t) => {
                        lectureText.appendChild(t);
                    });
                    col.appendChild(lectureText);
                    break;
                case 'quote':
                    // const blockQuote = helpers.el('blockquote', object.data)
                    // children.appendChild(blockQuote);
                    const lectureQuote = helpers.el('div');
                    lectureQuote.className = 'lecture__quote';
                    const text = helpers.el('p', object.data);
                    text.className = 'lecture__quote__text';
                    const attribute = helpers.el('p', object.attribute);
                    attribute.className = 'lecture__quote__attribute';
                    lectureQuote.appendChild(text);
                    lectureQuote.appendChild(attribute);
                    col.appendChild(lectureQuote);
                    break;
                case 'image':
                    // const img = helpers.el('img');
                    // img.setAttribute('src', object.data);
                    // const figcaption = helpers.el('figcaption', object.caption);
                    // const figure = helpers.el('figure', img, figcaption);
                    // children.appendChild(figure);

                    const lectureImage = helpers.el('div');
                    lectureImage.className = 'lecture__image';
                    const img = helpers.el('img');
                    const caption = helpers.el('p');
                    caption.className = 'lecture__image__caption';

                    lectureImage.appendChild(img);
                    lectureImage.appendChild(caption);
                    col.appendChild(lectureImage);
                    break;
                case 'heading':
                    const heading = helpers.el('h2', object.data);
                    heading.className = 'lecture__heading';
                    col.appendChild(heading);
                    break;
                case 'list':
                    // debugg   er;
                    const ul = helpers.el('ul');
                    ul.className = 'lecture__list';
                    // const listElements = [];
                    object.data.forEach((item) => {
                        // listElements.push(helpers.el('li', item));
                        const li = helpers.el('li', item);
                        li.className = 'lecture__list__li';
                        ul.appendChild(li);
                    });
                    // const ul = helpers.el('ul', listElements);
                    col.appendChild(ul);
                    break;
                case 'code':
                    const pre = helpers.el('pre', object.data);
                    const code = helpers.el('code', pre);
                    col.appendChild(code);
                    break;
                default:
                    //TODO
                    console.log('TODO: Default case')
            }
        });

        //this.body.appendChild(col);


        //this.createFooter(lecture);
        // TODO búa til footer/eða það sem er neðst
    }


    createFooter(lecture) {
        const footer = helpers.el('footer');
        footer.className = 'lecture__footer';
        const finish = helpers.el('a', 'Klára fyrirlestur');
        finish.className = 'lecture__footer__finish';
        finish.setAttribute('href', '/');
        const back = helpers.el('a', 'Til baka');
        back.className = 'lecture__footer__back';
        back.setAttribute('href', '/');
        footer.appendChild(finish);
        footer.appendChild(back);
        this.body.appendChild(footer);
        }


        finishLecture(e) {
            //console.log('saving the ' + this.SLUG.bind(this));
            storage.save((new URLSearchParams(window.location.search)).get('slug'));
        }

    load() {
        console.log('load me');
        // Sækir slug úr browser urli
        // this.SLUG = url;
        // Sækir viðeigandi gögn úr .json skránni
        // Kallar á fleiri föll sem sjá um að birta
        this.SLUG = (new URLSearchParams(window.location.search)).get('slug'); // Sækja sluggið
        console.log(this.SLUG);

        const finish = document.querySelector('.lecture__footer__finish');
        finish.addEventListener('click', this.finishLecture);
        this.getLecture();
        // debugger;
       
    
    }

    //TODO Fall til að merkja fyrirlestur sem lokið
}
