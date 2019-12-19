const e = sel => document.querySelector(sel)

const log = console.log.bind(console)

// const log = function(s) {
//     e('#id-text-log').value += '\n' + s
// }

const imageFormPath = function(path) {
    let img = new Image()
    img.src = path
    return img
}

const rectIntersects = function(a, b) {
    let o = a
    if (b.y > o.y && b.y < o.y + o.image.height) {
        if (b.x > o.x && b.x < o.x + o.image.width) {
            return true
        }
    }
    return false
}
