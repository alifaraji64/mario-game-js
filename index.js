const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const gravity = 0.5
const keys = {
  right: {
    pressed: false
  },
  left: {
    pressed: false
  }
}
class Player {
  constructor () {
    this.position = {
      x: 100,
      y: 100
    }
    this.width = 30
    this.height = 30
    this.velocity = {
      x: 0,
      y: 0
    }
  }
  draw () {
    c.fillStyle = 'red'
    c.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
  update () {
    c.clearRect(0, 0, canvas.width, canvas.height)
    this.position.y += this.velocity.y
    this.position.x += this.velocity.x
    this.velocity.y += gravity
    if (this.position.y + this.height + this.velocity.y > canvas.height) {
      this.velocity.y = 0
    }
    if (this.position.y < this.height / 2) {
      //this.velocity.y = -this.velocity.y
    }
    this.draw()
  }
}
class Platform {
  constructor () {
    this.position = {
      x: 200,
      y: 200
    }
    this.width = 200
    this.height = 20
  }
  draw () {
    c.fillStyle = 'blue'
    c.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
}
const player = new Player()
const platform = new Platform()

function animate () {
  requestAnimationFrame(animate)
  player.update()
  platform.draw()
  if (keys.right.pressed && player.position.x < 400) {
    player.velocity.x = 5
  } else if (keys.left.pressed && player.position.x > 50) {
    player.velocity.x = -5
  } else {
    player.velocity.x = 0
    if (keys.right.pressed) {
      console.log('edge')
      platform.position.x -= 5
    }
    else if (keys.left.pressed) {
      platform.position.x += 5
    }
  }
  //collision detection
  if (
    player.position.y + player.height <= platform.position.y &&
    player.position.y + player.height + player.velocity.y >=
      platform.position.y &&
    player.position.x + player.width >= platform.position.x &&
    platform.position.x + platform.width > player.position.x
  ) {
    player.velocity.y = 0
  }
}
animate()

addEventListener('keydown', ({ key }) => {
  if (key == 'w') {
    player.velocity.y = -20
  }
  if (key == 'a') {
    keys.left.pressed = true
  }
  if (key == 's') {
    console.log('down')
  }
  if (key == 'd') {
    keys.right.pressed = true
  }
})
addEventListener('keyup', ({ key }) => {
  if (key == 'w') {
    console.log(player.velocity.y)
    player.velocity.y = 0
  }
  if (key == 'a') {
    keys.left.pressed = false
  }
  if (key == 's') {
    console.log('down')
  }
  if (key == 'd') {
    keys.right.pressed = false
  }
})
