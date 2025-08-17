$(document).ready(function () {
    $("#peg").click(function () {
        $("#pegimg").css("filter","none")
        setTimeout(function () {
        $("#popup").fadeIn(300)
            
        }, 200)
    });
    $("#close").click(function () {
        $("#popup").fadeOut(300)
        setTimeout(function () {
        $("#pegimg").css("filter","brightness(0) invert(100%)")
            
        },200)
    })
    $("#logis").click(function () {
        $(".search").css("display","block")
        setTimeout(function () {
        $(".search").css("left","20px")
        }, 200)
    })
    $("#clearBtn").click(function () {
        $(".search").css("left","-222px")
        setTimeout(function () {
        $(".search").css("display","none")
        }, 800)
    })
});