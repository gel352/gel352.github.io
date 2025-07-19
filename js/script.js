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
});