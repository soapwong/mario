class Tower1 extends GuaImage {
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
            this.fire(this.target)
        }
    }
    fire() {
        if (this._fireCount !== 0) {
            this._fireCount--
            return false
        } else {
            this._fireCount = this._cooldown
            this.target.被攻击(this.attack)
            // log('攻击敌人', this.target, this.target.dead)
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
        let e = enemy
        // 检查 enemy 是否为空, 避免隐式转换, 并且不要反写逻辑
        if (e === null) {
            return
        }
        // 检查敌人是否死亡, 如果是, 取消目标
        let enemyExist = e !== null && !e.dead
        let inRange = this.center().distance(e.center()) < this.range
        let can = enemyExist && inRange
        if (!can) {
            this.target = null
        }
        return can
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
