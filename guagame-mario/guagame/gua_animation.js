class GuaAnimation {
    constructor(game) {
        this.game = game
        // 设置 gameover
        this.gameover = false
        // 设置开始标题
        this.isTitle = false
        // 为省事, 硬编码动画
        this.animations = {
            idle: [],
        }
        for (var i = 1; i < 4; i++) {
            var name = `b${i}`
            var t = game.textureByName(name)
            this.animations['idle'].push(t)
        }
        this.animationName = 'idle'
        this.texture = this.frames()[0]
        this.w = this.texture.width
        this.h = this.texture.height
        this.framesIndex = 0
        this.framesCount = 3
        //
        this.flipX = false
        this.rotation = 0
        this.alpha = 1
        // 重力和加速度
        this.gy = 10
        this.vy = 0
    }
    static new(...args) {
        return new this(...args)
    }
    frames() {
        return this.animations[this.animationName]
    }
    jump() {
        this.vy = -10
        this.rotation = -45
    }
    update() {
        // 更新 alpha
        if (this.alpha > 0) {
            this.alpha -= 0.05
        }
        if (!this.isTitle) {
            this.y += this.vy
            this.vy += this.gy * 0.2
            var h = 414
            if (this.y > h) {
                this.y = h
            }
            // 更新角度
            if (this.rotation < 45) {
                this.rotation += 5
            }
        }
        // 更新受力
        if (!this.gameover) {
            this.framesCount--
            if (this.framesCount === 0) {
                this.framesCount = 3
                this.framesIndex = (this.framesIndex + 1) % this.frames().length
                this.texture = this.frames()[this.framesIndex]
            }
        }
    }
    draw() {
        var context = this.game.context
        context.save()

        var w2 = this.w / 2
        var h2 = this.h / 2
        context.translate(this.x + w2, this.y + h2)
        if (this.flipX) {
            context.scale(-1, 1)
        }
        context.globalAlpha = this.alpha
        context.rotate(this.rotation * Math.PI / 180)
        context.translate(-w2, -h2)
        context.drawImage(this.texture, 0, 0)

        context.restore()
    }
    move(x, keyStatus) {
        this.flipX = (x < 0)
        this.x += x
    }
    changeAnimation(name) {
        this.animationName = name
    }
}
