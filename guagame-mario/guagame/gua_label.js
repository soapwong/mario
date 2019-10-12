class GuaLabel {
    constructor(game, text) {
        this.game = game
        this.text = text
    }
    static new(...args) {
        return new this(...args)
    }
    draw() {
        // log('draw label', this.game, this.text)
        this.game.context.fillText(this.text, 100, 190)
    }
    update() {

    }
}
