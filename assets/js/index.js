'use strict';

import settings, { elements } from './settings.js';

const handleLoad = evt => {
    let target = evt.target;
    let w = elements.img1.offsetWidth;
    let h = w / target.naturalWidth * target.naturalHeight;

    elements.img1.style.height = h + 'px';
    elements.img2.style.height = h + 'px';

    elements.img1.style.backgroundSize = `${w}px ${h}px`;
    elements.img2.style.backgroundSize = `${w}px ${h}px`;

    elements.divider.style.height = `${h}px`;
    elements.curtain.style.height = `${h}px`;

}

const loadImage = () => {
    elements.img1.style.backgroundImage = `url(/img/${settings.filename}_web.jpg)`;
    elements.img2.style.backgroundImage = `url(/img/${settings.filename}_preview.jpg)`;

    // Bild extra laden, um auf die Größe des Bildes reagieren zu können
    const elImg = document.createElement('img');
    elImg.addEventListener('load', handleLoad)
    elImg.src = `/img/${settings.filename}_web.jpg`;
}

const fillTitle = () => {
    let title = settings.filename;
    title = title.split('/')
    title = title[title.length-1];
    title = title.split('_');
    title = title.map(el => el[0].toUpperCase() + el.substr(1));
    title = title.join(' ');
    console.log(title);
    
    elements.title.innerHTML = title;
}

const findImage = () => {
    const url = new URL(window.location.href);
    settings.filename = url.searchParams.get('image');
    loadImage();
    fillTitle();
}

const handleDownDivider = evt => {
    settings.holding = elements.divider;
    console.log(evt);

    settings.pos = [evt.clientX, evt.clientY];
}

const handleUpDivider = () => {
    settings.holding = null;
}

const handleMove = evt => {
    if (settings.holding) {
        let left = evt.clientX - elements.curtain.offsetLeft;
        left = Math.max(0,left);
        left = Math.min(elements.curtain.offsetWidth,left);
        
        elements.divider.style.left = left + 'px';
        elements.img2.style.left = left + 'px';
    }

}

const createIcon = () => {
    let c = elements.c;
    let ctx = c.getContext('2d');

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 5;

    ctx.beginPath();

    ctx.moveTo(c.width / 2 + 6, 6);
    ctx.lineTo(c.width - 3, c.height / 2);
    ctx.lineTo(c.width / 2 + 6, c.height - 6);

    ctx.moveTo(c.width / 2 - 6, 6);
    ctx.lineTo(3, c.height / 2);
    ctx.lineTo(c.width / 2 - 6, c.height - 6);

    ctx.stroke();

}


const makeMover = () => {
    elements.divider.addEventListener('mousedown', handleDownDivider);
    document.body.addEventListener('mouseup', handleUpDivider);
    document.body.addEventListener('mousemove', handleMove);
}

const init = () => {
    findImage();
    createIcon();
    makeMover();
}


init();