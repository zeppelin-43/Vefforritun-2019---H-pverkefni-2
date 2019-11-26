import * as helpers from './helpers';


export function youtube(object) {
  const you = helpers.el('div');
  you.className = 'lecture__youtube';
  const videoFrame = helpers.el('iframe');
  videoFrame.setAttribute('src', object.data); // data er urlið
  videoFrame.className = 'lecture__youtube__iframe';

  you.appendChild(videoFrame);
  return you;
}

export function text(object) {
  const texts = object.data.split('\n');
  const textElements = texts.map((x) => {
    const el = helpers.el('p', x);
    el.className = 'lecture__text__part';
    return el;
  });
  const lectureText = helpers.el('div');
  lectureText.className = 'lecture__text';
  textElements.forEach((t) => {
    lectureText.appendChild(t);
  });
  return lectureText;
}


export function quote(object) {
  const lectureQuote = helpers.el('div');
  lectureQuote.className = 'lecture__quote';
  const texti = helpers.el('p', object.data);
  texti.className = 'lecture__quote__text';
  const attribute = helpers.el('p', object.attribute);
  attribute.className = 'lecture__quote__attribute';
  lectureQuote.appendChild(texti);
  lectureQuote.appendChild(attribute);
  return lectureQuote;
}

export function image(object) {
  const lectureImage = helpers.el('div');
  lectureImage.className = 'lecture__image';
  const img = helpers.el('img');
  const caption = helpers.el('p');
  caption.className = 'lecture__image__caption';
  caption.innerHTML = object.caption;

  img.setAttribute('src', object.data);
  lectureImage.appendChild(img);
  lectureImage.appendChild(caption);
  return lectureImage;
}

export function heading(object) {
  const head = helpers.el('h2', object.data);
  head.className = 'lecture__heading';
  return head;
}

export function list(object) {
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
  return ul;
}

export function code(object) {
  const pre = helpers.el('pre', object.data);
  pre.className = 'lecture__code';
  const c = helpers.el('code', pre);
  return c;
}
