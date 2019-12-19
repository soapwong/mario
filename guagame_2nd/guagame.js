const GuaGame = function(fps, images, runCallback) {
    // loads 是一个对象, 里面是图片的名字
    // 程序会在所有图片载入图片成功后才运行
    let g = {
        actions: {},
        keydowns: {},
        images: {},
    }
    const canvas = e('#id-canvas')
    const context = canvas.getContext('2d')
    g.canvas = canvas
    g.context = context
    // draw
    g.drawImage = function(guaImage) {
        g.context.drawImage(guaImage.image, guaImage.x, guaImage.y)
    }


    // events
    window.addEventListener('keydown', function (event) {
        g.keydowns[event.key] = true
    })
    window.addEventListener('keyup', function (event) {
        g.keydowns[event.key] = false
    })
    //
    g.registerAction = function(key, callback) {
        g.actions[key] = callback
    }
    // timer
    window.fps = 30
    const runloop = function(fps, images) {
        // event
        let actions = Object.keys(g.actions)
        for (let i = 0; i < actions.length; i++) {
            let key = actions[i]
            if (g.keydowns[key]) {
                g.actions[key]()
            }
        }
        // update
        g.update()
        // clear
        context.clearRect(0, 0, canvas.width, canvas.height)
        // draw
        g.draw()
        //
        setTimeout(() => {
            runloop()
        }, 1000 / window.fps)

    }

    const loads = []
    // 预先载入所有图片
    let names = Object.keys(images)
    for (let i = 0; i < names.length; i++) {
        let name = names[i]
        let path = images[name]
        let img = new Image()
        img.src = path
        img.onload = function() {
            // 存入 g.images 中
            g.images[name] = img
            // 所有图片都载入成功之后, 调用 run
            loads.push(1)
            if (loads.length === names.length) {
                g.run()
            }
        }
    }
    g.imageByName = function(name) {
        let img = g.images[name]
        let image = {
            w: img.width,
            h: img.height,
            image: img,
        }
        return image
    }
    g.run = function() {
        runCallback()
        // 开始运行程序
        setTimeout(() => {
            runloop()
        }, 1000 / fps)
        return g
    }
}
