class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
    }
    debug() {
        this.birdSpeed = config.bird_speed.value
    }
    setup() {
        // bg
        var bg = GuaImage.new(this.game, 'bg')
        this.addElement(bg)
        // gun ui
        var gun = GuaImage.new(this.game, 'gun')
        gun.x = 400
        gun.y = 300
        this.gun = gun
        this.addElement(gun)
        //
        this.setupInputs()
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
        let self = this
        // mouse inputs
        let startDrag = false
        this.game.registerMouse(function(event, status) {
            let x = event.offsetX
            let y = event.offsetY
            if (status == 'down') {
                let 点到了 = self.gun.pointInFrame(x, y)
                if (点到了) {
                    startDrag = true
                }
            } else if (status == 'move') {
                self.gun.x = x
                self.gun.y = y
            } else {
                startDrag = false
            }
            // log('mouse event', status, event)
        })
        // keyboard inputs
        // var b = this.mario
        // let playerSpeed = 5
    }
}
