class Scene extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
        this.setupInputs()
    }
    debug() {
        this.birdSpeed = config.bird_speed.value
    }
    setup() {
        var game = this.game
        // bg
        var bg = GuaImage.new(game, 'bg')
        this.addElement(bg)
        // 加入水管
        this.pipe = Pipes.new(game)
        this.addElement(this.pipe)
        // 循环移动的地面
        this.grounds = []
        for (var i = 0; i < 30; i++) {
            var g = GuaImage.new(game, 'ground')
            g.x = i * 18
            g.y = 450
            this.addElement(g)
            this.grounds.push(g)
        }
        this.skipCount = 4
        // bird
        this.birdSpeed = 2
        var b = GuaAnimation.new(game)
        b.x = 120
        b.y = 200
        this.bird = b
        this.addElement(b)
        // 加入分数
        this.score = 0
        this.updateScore()
    }
    setupInputs() {
        var self = this
        var b = this.bird
        self.game.registerAction('a', function(keyStatus) {
            b.move(-self.birdSpeed, keyStatus)
        })
        self.game.registerAction('d', function(keyStatus) {
            b.move(self.birdSpeed, keyStatus)
        })
        self.game.registerAction('j', function(keyStatus) {
            b.jump()
        })
    }
    update() {
        super.update()
        // 地面移动
        var offset = -5
        this.skipCount--
        if (this.skipCount === 0) {
            this.skipCount = 4
            offset = 15
        }
        for (var i = 0; i < 30; i++) {
            var g = this.grounds[i]
            g.x += offset
        }
        // 撞到水管
        this.birdCollide()
        // 穿过水管
        this.passPipe()
    }
    birdCollide() {
        var game = this.game
        var pipes = this.pipe.pipes
        for (var p of pipes) {
            if (p.collide(this.bird)) {
                log('boom')
                var s = SceneEnd.new(game, this.pipe, this.bird, this.score)
                game.replaceScene(s)
            }
        }
    }
    passPipe() {
        var pipes = this.pipe.pipes
        for (var p of pipes) {
            var pX = p.x
            var bX = this.bird.x
            if ((bX > pX) && (this.pipe.passed === false)) {
                this.pipe.passed = true
                this.score++
                this.updateScore()
            }
        }
    }
    //
    updateScore() {
        if (this.scoreImage) {
            this.deleteElement(this.scoreImage)
        }
        var s = this.score.toString()
        var img = Score.new(this.game, s)
        this.scoreImage = img
        this.addElement(img)
    }
}
