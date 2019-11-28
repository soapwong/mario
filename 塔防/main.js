var loadlevel = function(game, n) {
    n = n - 1
    var blocks = []
    var level = levels[n]
    for (var i = 0; i < level.length; i++) {
        var p = level[i]
        var b = Block(game, p)
        blocks.push(b)
    }
    return blocks
}

var enableDebugMode = function(game, enable) {
    if (!enable) {
        return
    }
    // 控制速度
    e('#id-input-speed').addEventListener('input', function(event) {
        var input = event.target
        window.fps = Number(input.value)
    })
}

const ajax = request => {
    let r = new XMLHttpRequest()
    r.open('GET', request.url, true)
    r.responseType = 'arraybuffer'
    r.onreadystatechange = event => {
        if (r.readyState === 4) {
            request.callback(r.response)
        }
    }
    r.send()
}

var __main = function() {
    var images = {
        // flappy bird images
        bg: 'img/scene/bg.png',
        pipe: 'img/scene/pipe.png',
        ground: 'img/scene/ground.png',
        // bird
        b1: 'img/bird/b1.png',
        b2: 'img/bird/b2.png',
        b3: 'img/bird/b3.png',
        // scene
        title: 'img/headline/title.png',
        ready: 'img/headline/ready.png',
        gameover: 'img/headline/gameover.png',
        //
        t1: 'tiles/t1.png',
        t2: 'tiles/t2.png',
        t3: 'tiles/t3.png',
        t4: 'tiles/t4.png',
        // score
        // s0: 'img/score/0.png',
        // s1: 'img/score/1.png',
        // s2: 'img/score/2.png',
        // s3: 'img/score/3.png',
        // s4: 'img/score/4.png',
        // s5: 'img/score/5.png',
        // s6: 'img/score/6.png',
        // s7: 'img/score/7.png',
        // s8: 'img/score/8.png',
        // s9: 'img/score/9.png',
    }

    var request = {
        url: 'mario.nes',
        callback(r) {
            window.bytes = new Uint8Array(r)
            log('mario file', window.bytes.length)
            var game = GuaGame.instance(60, images, function(g) {
                // var s = Scene.new(g)
                // var s = SceneTitle.new(g)
                var s = SceneEditor.new(g)
                g.runWithScene(s)
            })

            enableDebugMode(game, true)

        },
    }
    ajax(request)
}

__main()
