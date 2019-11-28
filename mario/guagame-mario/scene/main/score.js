class Score {
    constructor(game, score) {
        this.game = game
        this.scores = []
        for (var i = 0; i < score.length; i++) {
            var number = score[i]
            var img = GuaImage.new(game, `s${number}`)
            this.scores.push(img)
        }
    }
    static new(...args) {
        return new this(...args)
    }
    draw() {
        var context = this.game.context
        var x = 120 - (this.scores.length - 1) * 20
        var y = 60

        for (var i = 0; i < this.scores.length; i++) {
            var s = this.scores[i]
            var sx = x + i * 30
            var sy = y
            context.drawImage(s.texture, sx, sy)
        }
    }
    update() {

    }
}
