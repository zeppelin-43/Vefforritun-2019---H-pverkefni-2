import * as helpers from './helpers';

export default class Lecture {
    constructor() {
        this.contentBox = document.querySelector('.main') //TODO Finna hentugt nafn á þetta, þarf að vera í samræmi við HTMl
        this.URL = 'lectures.json';
        this.SLUG; // Geyma slug-ið í þessu
    }

    /**
     * Finnur réttan fyrirlestur miðað við SLUG
     */
    getLecture() {
        fetch(url)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Villa við að sækja gögn');
            })
            .then((data) => {
                const lectures = data.lectures;
                lectures.forEach(o => {
                    if (o.slug == this.SLUG) {
                        return o;
                    }
                });
                throw new Error('Rangt slug');

            })
            .catch((error) => {
                displayError('Villa!');
                console.error(error); /* eslint-disable-line */
            });
    }

    displayLecture(lecture) {
        //TODO 
        helpers.empty();
        const content = lecture.content; // Sækja contentið úr lecture
        const children = helpers.el('div'); // Börn aðal divsins
        content.forEach(object => {
            const type = object.type;
            //TODO setja class name á allt
            switch (type) {
                case 'youtube':
                    const videoFrame = helpers.el('iframe')
                    videoFrame.setAttribute('src', object.data); // data er urlið

                    children.appendChild(videoFrame);
                    break;
                case 'text':
                    const texts = object.data.split('\n');
                    const textElements = texts.map((x) => { return helpers.el('p', x); }); // Vantar að bæta við klasanöfnum
                    textElements.forEach((t) => {
                        children.appendChild(t);
                    });
                    break;
                case 'quote':
                    const blockQuote = helpers.el('blockquote ', object.data)
                    children.appendChild(blockQuote);
                    break;
                case 'image':
                    const img = helpers.el('img');
                    img.setAttribute('src', object.data);
                    const figcaption = helpers.el('figcaption', object.caption);
                    const figure = helpers.el('figure', img, figcaption);
                    children.appendChild(figure);
                    break;
                case 'heading':
                    const h2 = helpers.el('h2', object.data);
                    children.appendChild(h2);
                    break;
                case 'list':
                    const listElements = [];
                    object.data.forEach((item) => {
                        listElements.push(helpers.el('li', item));
                    });
                    const ul = helpers.el('ul', listElements);
                    children.appendChild(ul);
                    break;
                case 'code':
                    const pre = helpers.el('pre', object.data);
                    const code = helpers.el('code', pre);
                    children.appendChild(code);
                    break;
                default:
                    //TODO
                    console.log('TODO: Default case')
            }
        });

        this.contentBox.appendChild(children);

    }



    load() {
        console.log('load me');
        // Sækir slug úr browser urli
        // this.SLUG = url;
        // Sækir viðeigandi gögn úr .json skránni
        // Kallar á fleiri föll sem sjá um að birta
        this.SLUG = (new URLSearchParams(window.location.search)).get('slug'); // Sækja sluggið
        const lecture = this.getLecture(); // Sækja fyrirlestur
        displayLecture(lecture);

    }

    //TODO Fall til að merkja fyrirlestur sem lokið
}
