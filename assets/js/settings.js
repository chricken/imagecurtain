'use strict';

const settings = {
    filename: '',
    holding: null,
    pos: [0, 0],
    elements: {
        img1: document.querySelector('#img1'),
        img2: document.querySelector('#img2'),
        divider: document.querySelector('#divider'),
        curtain: document.querySelector('curtain'),
        c: document.querySelector('#handleIcon'),
        title: document.querySelector('h1'),
    }
}

export default settings;
export let elements = settings.elements;