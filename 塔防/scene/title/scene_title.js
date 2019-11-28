class SceneTitle extends GuaScene {
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
        // title
        var title = GuaImage.new(game, 'title')
        title.x = 50
        title.y = 30
        this.addElement(title)
        // ready
        var ready = GuaImage.new(game, 'ready')
        ready.x = 40
        ready.y = 100
        this.addElement(ready)
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
        // mario
        let mario = GuaNesSprite.new(game)
        this.addElement(mario)
        mario.x = 100
        mario.y = 385
        this.mario = mario
    }
    update() {
        super.update()
        // 地面移动
    }
    startGame(game) {
        var s = Scene.new(game)
        game.replaceScene(s)
    }
    setupInputs() {
        var self = this
        var b = this.mario
        let playerSpeed = 5
        var game = this.game
        self.game.registerAction('a', function(keyStatus) {
            b.move(-playerSpeed, keyStatus)
            // var s = Scene.new(game)
            // game.replaceScene(s)
        })
        self.game.registerAction('d', function(keyStatus) {
            b.move(playerSpeed, keyStatus)
            // var s = Scene.new(game)
            // game.replaceScene(s)
        })
        self.game.registerAction('j', function(keyStatus) {
            b.jump()
            // var s = Scene.new(game)
            // game.replaceScene(s)
        })
    }
}
