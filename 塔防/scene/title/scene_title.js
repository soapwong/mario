
class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
    }
    debug() {
        this.birdSpeed = config.bird_speed.value
    }
    setup() {
        // 先初始化属性
        this.enemies = []
        this.towers = []
        this.setupBG()
        //
        this.setupGameElements()
        this.setupTower()
        //
        this.setupHUD()
        //
        this.setupInputs()
    }
    addTower(x, y) {
        x = Math.floor(x / 100) * 100
        y = Math.floor(y / 100) * 100
        let t1 = Tower1.new(this.game)
        t1.x = x
        t1.y = y
        this.addElement(t1)
        //
        this.towers.push(t1)
    }
    setupTower() {
        this.addTower(120, 240)
        this.addTower(120, 150)
    }
    setupGameElements() {
        let offset = [0, 30]
        for (var i = 0; i < 23; i++) {
            let e1 = Enemy.new(this.game)
            e1.x -= i * 40
            e1.y += offset[i % 2]
            this.addElement(e1)
            this.enemies.push(e1)
        }
    }
    setupBG() {
        var bg = GuaImage.new(this.game, 'bg')
        this.addElement(bg)
    }
    setupHUD() {
        var gun = GuaImage.new(this.game, 'gun')
        gun.x = 400
        gun.y = 300
        this.gun = gun
        this.addElement(gun)
    }
    update() {
        super.update()
        // 给所有, 没有 target 的 tower 寻找目标
        for (let t of this.towers) {
            if (t.target === null) {
                t.findTarget(this.enemies)
            }
        }
    }
    startGame(game) {
        var s = Scene.new(game)
        game.replaceScene(s)
    }
    setupInputs() {
        let self = this
        // mouse inputs
        let startDrag = false
        let ox = 0
        let oy = 0
        this.game.registerMouse(function(event, status) {
            let x = event.offsetX
            let y = event.offsetY
            if (status == 'down') {
                let 点到了 = self.gun.pointInFrame(x, y)
                if (点到了) {
                    startDrag = true
                    self.tower = self.gun.clone()
                    self.addElement(self.tower)
                    // 设置偏移的ox oy ox oy
                    ox = self.gun.x - x
                    ox = self.gun.y - y
                }
            } else if (status == 'move') {
                self.tower.x = x + ox
                self.tower.y = y + oy
            } else {
                startDrag = false
                self.removeElement(self.tower)
                // 添加一个 tower
                self.addTower(x, y)
            }
            // log('mouse event', status, event)
        })
        // keyboard inputs
        // var b = this.mario
        // let playerSpeed = 5
    }
}
