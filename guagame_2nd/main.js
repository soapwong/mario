const loadlevel = function(game, n) {
    n = n - 1
    let level = levels[n]
    let blocks = []
    for (let i = 0; i < level.length; i++) {
        let p = level[i]
        let b = Block(p)
        // 设置 block 坐标
        // b.x = p[0]
        // b.y = p[1]
        blocks.push(b)
    }
    return blocks
}

const enableDebugMode = function(game, enable) {
    if (!enable) {
        return
    }
    window.paused = false
    window.addEventListener('keydown', function(event) {
        let k = event.key
        if (k === 'p') {
            window.paused = !window.paused
        } else if ('1234567'.includes(k)) {
            // 为了 debug 临时加的载入关卡功能
            blocks = loadlevel(game, Number(k))
        }
    })
    // 控制速度
    e('#id-input-speed').addEventListener('input', function(event) {
        let input = event.target
        window.fps = Number(input.value)
    })
}


var blocks = []
const __main = () => {
    enableDebugMode(true)
    // 为了 debug

    let images = {
        ball: 'ball.png',
        block: 'block.png',
        paddle: 'paddle.png',
    }
    let score = 0

    let game = GuaGame(30, images)
    let paddle = Paddle(game)
    let ball = Ball(game)

    blocks = loadlevel(game,1)

    var paused = false
    game.registerAction('a', function() {
        paddle.moveLeft()
    })
    game.registerAction('d', function() {
        paddle.moveRight()
    })
    game.registerAction('f', function() {
        ball.fire()
    })


    game.update = function() {
        if (window.paused) {
            return
        }
        ball.move()
        if (paddle.collide(ball)) {
            ball.speedY *= -1
        }
        // 判断 ball 和 block 相撞
        for (let i = 0; i < blocks.length; i++) {
            let block = blocks[i]
            if (block.collide(ball)) {
                log('block 相撞')
                block.kill()
                ball.反弹()
                // 更新分数
                score += 100
            }
        }
    }

    game.draw = function() {
        // draw
        game.drawImage(paddle)
        game.drawImage(ball)
        // draw blocks
        for (let i = 0; i < blocks.length; i++) {
            let block = blocks[i]
            if (block.alive) {
                game.drawImage(block)
            }
        }
        // draw labels
        game.context.fillText(`分数: ${score}`, 10, 290)
    }
}

__main()
