const Paddle = function(game) {
    let o = game.imageByName('paddle')
    // let o = {
    //     image: image,
    //     x: 100,
    //     y: 200,
    //     speed: 5,
    // }
    o.x = 100
    o.y = 200
    o.speed = 15
    o.move = function(x) {
        if (x < 0) {
            x = 0
        }
        if (x > 400 - o.image.width) {
            x = 400 - o.image.width
        }
        o.x = x
    }
    o.moveLeft = function() {
        // o.x -= o.speed
        // if (o.x < 0) {
        //     o.x = 0
        // }
        o.move(o.x - o.speed)
    }
    o.moveRight = function() {
        o.move(o.x + o.speed)
    }
    o.collide = function(ball) {
        if (ball.y + ball.image.height > o.y) {
            if (ball.x > o.x && ball.x < o.x + o.image.width) {
                return true
            }
        }
        return false
    }
    return o
}
