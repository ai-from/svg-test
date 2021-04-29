let svg = null;
let square = null;
let isDraggable = false;
blockStatus = {
    yellow: false,
    blue: false,
    green: false,
    purple: false
};

document.addEventListener('mousemove', drag);

function makeDraggable(event) {
    svg = event.target.closest('svg');
    square = document.querySelector('.center svg');
    svg.addEventListener('mousedown', startDrag);
    svg.addEventListener('mouseup', endDrag);
}

function startDrag(event) {
    svg = event.target.closest('svg');
    isDraggable = true;
}

function drag(event) {
    if(svg && isDraggable) {
        event.preventDefault();
        let xMouse = event.clientX;
        let yMouse = event.clientY;
        let width = svg.getBoundingClientRect().width;
        let height = svg.getBoundingClientRect().height;
        svg.style.position = 'absolute';
        svg.style.zIndex = 10;
        svg.style.left = (xMouse - width / 2) + 'px';
        svg.style.top = (yMouse - height / 2) + 'px';
    }
}

function endDrag(event) {
    event.preventDefault();

    let isTopCircle = event.target.closest('svg').classList.contains('top');
    let isBottomCircle = event.target.closest('svg').classList.contains('bottom');

    let topSvg = svg.getBoundingClientRect().top;
    let rightSvg = svg.getBoundingClientRect().left + svg.getBoundingClientRect().width;
    let bottomSvg = svg.getBoundingClientRect().top + svg.getBoundingClientRect().height;
    let leftSvg = svg.getBoundingClientRect().left;

    let topSquare = square.getBoundingClientRect().top;
    let rightSquare = square.getBoundingClientRect().left + square.getBoundingClientRect().width;
    let bottomSquare = square.getBoundingClientRect().top + square.getBoundingClientRect().height;
    let leftSquare = square.getBoundingClientRect().left;

    let isYellow = topSvg >= topSquare && rightSvg <= rightSquare - 150 && bottomSvg <= bottomSquare - 150 && leftSvg >= leftSquare;
    let isBlue = topSvg >= topSquare && rightSvg <= rightSquare && bottomSvg <= bottomSquare - 150 && leftSvg >= leftSquare + 150;
    let isGreen = topSvg >= topSquare + 150 && rightSvg <= rightSquare - 150 && bottomSvg <= bottomSquare && leftSvg >= leftSquare;
    let isPurple = topSvg >= topSquare + 150 && rightSvg <= rightSquare && bottomSvg <= bottomSquare && leftSvg >= leftSquare + 150;

    if (isYellow && !blockStatus.yellow && isTopCircle) {
        addCircle(1);
        blockStatus.yellow = true;
    } 
    else if (isBlue && !blockStatus.blue && isTopCircle) {
        addCircle(2);
        blockStatus.blue = true;
    } 
    else if (isGreen && !blockStatus.green && isBottomCircle) {
        addCircle(3);
        blockStatus.green = true;
    } 
    else if (isPurple && !blockStatus.purple && isBottomCircle) {
        addCircle(4);
        blockStatus.purple = true;
    } 
    else {
        svg.style.position = 'static';
        isDraggable = false;
    }
}

function addCircle(num) {
    let g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    let circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', '21');
    circle.setAttribute('cy', '21');
    circle.setAttribute('r', '20.5');
    circle.setAttribute('stroke', 'white');

    let path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path1.setAttribute('d', 'M41 21.0003C41 32.046 32.0457 41.0003 21 41.0003C9.9543 41.0003 1 32.046 1 21.0003C7.5 21.0002 9.9543 21.0002 21 21.0002C32.0457 21.0002 36 21.0002 41 21.0003Z');

    let path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path2.setAttribute('d', 'M1 21C1 9.95428 9.9543 0.999975 21 0.999975C32.0457 0.999975 41 9.95428 41 21C34.5 21 32.0457 21 21 21C9.9543 21 6 21 1 21Z');

    if (num === 1) {
        g.setAttribute('transform', 'translate(54.5, 54.5)');
        path1.setAttribute('fill', '#49C2F1');
        path2.setAttribute('fill', '#E6E356');
    }
    if(num === 2) {
        g.setAttribute('transform', 'translate(204.5, 54.5)');
        path1.setAttribute('fill', '#49C2F1');
        path2.setAttribute('fill', '#E6E356');
    }
    if(num === 3) {
        g.setAttribute('transform', 'translate(54.5, 204.5)');
        path1.setAttribute('fill', '#9F4292');
        path2.setAttribute('fill', '#39AA36');
    }
    if(num === 4) {
        g.setAttribute('transform', 'translate(204.5, 204.5)');
        path1.setAttribute('fill', '#9F4292');
        path2.setAttribute('fill', '#39AA36');
    }

    g.appendChild(circle);
    g.appendChild(path1);
    g.appendChild(path2);

    square.appendChild(g);
    isDraggable = false;
    svg.style.display = 'none';
}