class GuaNesSprite {
    constructor(game) {
        this.game = game
        this.tileOffset = 32784
        this.data = window.bytes.slice(this.tileOffset)
        // 为省事, 硬编码动画
        this.animations = {
            idle: [],
        }
        // this.animationName = 'idle'
        // this.texture = this.frames()[0]
        this.pixelWidth = 2
        this.rowsOfSprite = 4
        this.columnsOfSprite = 2
        this.w = this.pixelWidth * this.columnsOfSprite * 8
        this.h = this.pixelWidth * this.rowsOfSprite * 8
    
        this.framesIndex = 0
        this.framesCount = 4
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
    drawBlock(context, data, x, y, pixelWidth) {
        const colors = [
            'white',
            '#dc0000',  // 衣服
            '#fbb100',  // 皮肤
            '#6e6a01',
        ]
        let w = pixelWidth
        let h = pixelWidth
        for (let i = 0; i < 8; i++) {
            let p1 = data[i]
            let p2 = data[i + 8]
            for (let j = 0; j < 8; j++) {
                // 8 bits per line
                // 78 69 0100 1110 0100 0101
                // 在 j 循环中, 每一次画一个像素点
                let c1 = (p1 >> (7 - j)) & 0b00000001
                let c2 = (p2 >> (7 - j)) & 0b00000001
                let pixel = (c2 << 1) + c1
                if (pixel === 0) {
                    continue
                }
                let color = colors[pixel]
                context.fillStyle = color
                let px = x + j * w
                let py = y + i * h
                context.fillRect(px, py, w, h)
            }
        }
    }
    drawSprite() {
        let bytesPerBlock = 16
        let dataOffset = this.framesIndex * bytesPerBlock * 8
        let data = this.data.slice(dataOffset)
        let context = this.game.context
        let pixelsPerBlock = 8
        let pixelWidth = this.pixelWidth
        let blockSize = pixelsPerBlock  * pixelWidth
        let offset = 0
        for (var i = 0; i < this.rowsOfSprite; i++) {
            for (var j = 0; j < this.columnsOfSprite; j++) {
                let x = j * blockSize
                let y = i * blockSize
                let pixels = data.slice(offset)
                this.drawBlock(context, pixels, x, y, pixelWidth)
                offset += 16
            }
        }
    }
    

    frames() {
        return this.animations[this.animationName]
    }
    jump() {
        this.vy = -10
        // this.rotation = -45
    }
    update() {
        // 更新受力
        this.y += this.vy
        this.vy += this.gy * 0.2
        var h = 385
        if (this.y > h) {
            this.y = h
        }

        this.framesCount--
        if (this.framesCount === 0) {
            this.framesCount = 4
            this.framesIndex++
            this.framesIndex %= 3
            // this.framesIndex = (this.framesIndex + 1) % this.frames().length
            // this.texture = this.frames()[this.framesIndex]
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

        // draw mario
        this.drawSprite()

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
