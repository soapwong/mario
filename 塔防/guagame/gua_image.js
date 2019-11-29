class GuaImage {
    constructor(game, name) {
        this.game = game
        this.texture = game.textureByName(name)
        this.x = 0
        this.y = 0
        this.w = this.texture.width
        this.h = this.texture.height
        //
        this.flipY = false
        this.rotation = 0
    }
    static new(...args) {
        var i = new this(...args)
        return i
    }
    pointInFrame(x, y) {
        let xIn = x >= this.x && x <= this.x + this.w
        let yIn = y >= this.y && y <= this.y + this.h
        return xIn && yIn
    }
    draw() {
		this.game.drawImage(this)
    }
    collide(img) {
        var c = rectIntersects(this, img) || rectIntersects(img, this)
        return c
    }
    update() {

    }
}
