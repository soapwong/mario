class GuaScene {
    constructor(game) {
        this.game = game
        this.debugModeEnabled = true
        this.elements = []
    }
    static new(...args) {
        var i = new this(...args)
        return i
    }
    // 删除, 添加 element
    addElement(img) {
        img.scene = this
        this.elements.push(img)
    }
    removeElement(node) {
        this.elements = this.elements.filter(e => {
            return e != node
        })
    }
    draw() {
        // 父类加 draw
        for (var e of this.elements) {
            // var e = this.elements[i]
            // this.game.drawImage(e)
            e.draw()
        }
    }
    update() {
        this.debug && this.debug()
        if (this.debugModeEnabled) {
            for (var i = 0; i < this.elements.length; i++) {
                var e = this.elements[i]
                e.debug && e.debug()
            }
        }
        for (var i = 0; i < this.elements.length; i++) {
            var e = this.elements[i]
            e.update()
        }
    }
}
