class SceneEditor extends GuaScene {
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
        // tile map
        let map = GuaTileMap.new(game)
        this.addElement(map)
        // mario
        let mario = GuaNesSprite.new(game, map)
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
        let playerSpeed = 2
        var game = this.game
        self.game.registerAction('a', function(keyStatus) {
            b.move(-playerSpeed, keyStatus)
        })
        self.game.registerAction('d', function(keyStatus) {
            b.move(playerSpeed, keyStatus)
        })
        self.game.registerAction('j', function(keyStatus) {
            b.jump()
        })
    }
}
