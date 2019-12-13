var Block = function() {
    var image = imageFormPath('block.png')
    var o = {
        image: image,
        x: 100,
        y: 100,
        w: 50,
        h: 20,
        alive: true,
    }
    o.kill = function() {
        o.alive = false
    }
    o.collide = function(b) {
        return o.alive && rectIntersects(o, b) || rectIntersects(b, o)
    }
    return o
}
