var Physics = require('luster-physics')
var scrollEl = document.querySelector('.pull-down-menu')
var handleEls = document.querySelectorAll('.nav-header, .close-handle')
var isOpen = false
var boundry = new Physics.Boundry({ top: 0, bottom: window.innerHeight, left: 0, right: 0 })

var menu = new Physics(menuEl)
  .style('translateY', function(pos) { return pos.y + 'px' })

var drag = menu.drag({ handle: handleEls, boundry: boundry })

function end() {
  if(this.moved()) {
    isOpen = menu.direction('down')
  } else {
    isOpen = !isOpen
  }

  if(isOpen) {
    menu.accelerate({ acceleration: 1500, bounceAcceleration: 4000, bounce: true })
      .to(0, boundry.bottom).start()
  } else {
    menu.spring({ tension: 100, damping: 15 })
      .to(0, boundry.top).start()
  }
}

drag.on('end', end)