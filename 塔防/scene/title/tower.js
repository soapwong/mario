class Tower1 extends GuaImage{
    constructor(game, name) {
        name = name || 'gun'
        super(game, name)
        this.setup()
    }
    setup() {
        // this.rotation = 90
        this.attack = 1
        this.range = 80
        this.target = null
        this._cooldown = 3
        this._fireCount = 0
    }
    drawAttackRange() {
        let context = this.game.context
        context.fillStyle = 'rgba(200, 200, 200, 0.8)';
        context.beginPath()
        let v = this.center()
        context.arc(v.x, v.y, this.range, 0, Math.PI * 2)
        context.fill()
    }
    draw() {
        this.drawAttackRange()
        //
        super.draw()
    }
    update() {
        // TODO, 当敌人渐渐远去, 你要设置 target = null
        this.updateRotation(this.target)
        if (this.canAttack(this.target)) {
            // log('攻击敌人')
            // this.fire(target)
            this.target.被攻击(this.attack)
            if (this.target.dead) {
                this.target = null
            }
        }
    }
    updateRotation(target) {
        if (target !== null) {
            let v = target.center().sub(this.center()).normal()
            let r = 向量夹角(v.x, -v.y)
            this.rotation = r
        }
    }
    canAttack(enemy) {
        //
        let e = enemy
        let enemyExist = e !== null && !e.dead
        if (enemyExist) {
            let can = this.center().distance(e.center()) < this.range
            // 检查是否冷却
            if (this._fireCount !== 0) {
                this._fireCount--
                return false
            } else {
                this._fireCount = this._cooldown
                return can
            }
        } else {
            return false
        }
    }
    findTarget(enemies) {
        for (let e of enemies) {
            if (this.canAttack(e)) {
                this.target = e
                break
            }
        }
    }
}
