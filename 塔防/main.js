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
        // gun
        gun: 'img/gun.png',
    }
    var game = GuaGame.instance(60, images, function(g) {
        // var s = Scene.new(g)
        var s = SceneTitle.new(g)
        // var s = SceneEditor.new(g)
        g.runWithScene(s)
    })

    enableDebugMode(game, true)


    // var request = {
    //     url: 'mario.nes',
    //     callback(r) {
    //         window.bytes = new Uint8Array(r)
    //         log('mario file', window.bytes.length)
    //         var game = GuaGame.instance(60, images, function(g) {
    //             // var s = Scene.new(g)
    //             // var s = SceneTitle.new(g)
    //             var s = SceneEditor.new(g)
    //             g.runWithScene(s)
    //         })
    //
    //         enableDebugMode(game, true)
    //
    //     },
    // }
    // ajax(request)
}

__main()
