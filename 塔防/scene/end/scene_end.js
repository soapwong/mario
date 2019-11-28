class SceneEnd extends GuaScene {
    constructor(game, pipe, bird, score) {
        super(game)
        // setup
        this.setup(pipe, bird, score)
        this.setupInputs()
    }
    static new(...args) {
        return new this(...args)
    }
    // constructor draw 了, 不能有 draw 方法
    setup(pipe, bird, score) {
        var game = this.game
        // bg
        var bg = GuaImage.new(game, 'bg')
        this.addElement(bg)
        // 水管
        this.pipe = pipe
        pipe.gameover = true
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
        this.bird = bird
        this.bird.gameover = true
        this.addElement(this.bird)
        // gamvoer 图片
        var end = GuaImage.new(game, 'gameover')
        end.x = 50
        end.y = 150
        this.addElement(end)
        // score
        var s = score
        log('score', s)
        var img = Score.new(game, `${s}`)
        this.scoreImage = img
        this.addElement(img)
    }
    setupInputs() {
        var self = this
        var game = self.game
        self.game.registerAction('r', function(keyStatus) {
            var s = SceneTitle.new(game)
            game.replaceScene(s)
        })
    }
    update() {
        super.update()
    }
}
