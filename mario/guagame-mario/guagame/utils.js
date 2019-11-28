const log = console.log.bind(console)

const e = function(selector) {
    var element = document.querySelector(selector)
    if (element === null) {
        var s = `元素没有找到, 选择器 ${selector} 写错了或者没有把 js 放在 </body> 前面`
        alert(s)
    } else {
        return element
    }
}

const es = selector => document.querySelectorAll(selector)

const imageFromPath = function(path) {
    var img = new Image()
    img.src = path
    return img
}

const rectIntersects = function(a, b) {
    var o = a
    if (b.y > o.y && b.y < o.y + o.texture.height) {
        if (b.x > o.x && b.x < o.x + o.texture.width) {
            return true
        }
    }
    return false
}


const randomBetween = function(start, end) {
    let n = Math.random() * (end - start + 1)
    return Math.floor(n + start)
}
