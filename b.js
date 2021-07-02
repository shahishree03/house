var x,z,x2,z2,x3 = 45,z3 = -65, ps, srnkPs = false, dtSrnkPs = false, intrvl, drIntrvl, wtDrIntrvl, draining = false, mov = false, rdHeight = 200, wtIntvl, flooding = false, drpCrl = false;
var wtlvlSpeed = 0.5;
var rDropSpeed = 100;

window.onload = function(){
    app = document.querySelector(".app");
    gr = document.querySelector(".ground");
    br = document.querySelector(".branch");
    b1 = document.querySelector(".b1");
    cld = document.querySelector(".cld");
    rplr= document.querySelector(".rplr");
    l = document.querySelectorAll(".l");
    bs = document.querySelectorAll(".bs");
    cl = document.querySelectorAll(".cl");
    r = document.querySelectorAll(".r");
    alrt = document.querySelector(".alrt");
    wtr = document.querySelector(".wtr");
    wc = document.querySelectorAll(".wc");
    sun = document.querySelector(".sun");
    
    setTimeout(function(){
        alrt.style.bottom = 0;
    },500);

    
    app.addEventListener("touchstart", start, false);
    app.addEventListener("mousedown", start, false);
    app.addEventListener("touchmove", move, false);
    app.addEventListener("mousemove", move, false);
    app.addEventListener("touchend", end, false);
    app.addEventListener("mouseup", end, false);
    
    for(var i = 0; i < cl.length; i++){
        cl[i].addEventListener("touchstart", rnS, false);
        cl[i].addEventListener("mousedown", rnS, false);
        cl[i].addEventListener("touchend", rnE, false);
        cl[i].addEventListener("mouseup", rnE, false);
    }
    sun.addEventListener("touchstart", dnS, false);
    sun.addEventListener("mousedown", dnS, false);
    sun.addEventListener("touchend", dnE, false);
    sun.addEventListener("mouseup", dnE, false);
    sun.addEventListener("mouseleave", dnE, false);
}




//this thing learnt from kirupa. go to google then search kirupa drag.
function start(e) {
    if (e.type === "touchstart") {
        x = Math.floor(e.touches[0].clientX - x3);
        z = Math.floor(e.touches[0].clientY - z3);
    }
    else {
        x = Math.floor(e.clientX - x3);
        z = Math.floor(e.clientY - z3);
    }
    mov = true;
}
function move(e){
    if(mov){
        e.preventDefault();
        if (e.type === "touchmove") {
            x2 = Math.floor(e.touches[0].clientX - x);
            z2 = Math.floor(e.touches[0].clientY - z);
        }
        else {
            x2 = Math.floor(e.clientX - x);
            z2 = Math.floor(e.clientY - z);
        }
        x3 = x2;
        z3 = z2;
        
        gr.style.transform = "translate(-50%,-50%) rotateX(" + -z3 + "deg) rotateZ(" + -x3 + "deg)";
        br.style.transform = "rotateX(90deg) rotateY(" + x3 + "deg)";
        b1.style.transform = "translateZ(25px) rotateX(90deg) rotateZ(-40deg) rotateY(" + x3 + "deg)";
        l[0].style.transform = "translate3d(-50%, -50%, 100px) rotateX(" + z3 + "deg) rotateY(" + -x3 + "deg)";
        l[1].style.transform = "translate3d(-50%, -50%, 75px) rotateX(" + z3 + "deg) rotateY(" + -x3 + "deg)";
        if(srnkPs){
            ps = "translateY(-50%) rotateX(" + z3 + "deg) rotateY(" + -x3 + "deg) scale(0.85)";
            sun.style.transform = "translate3d(-50%, -50%, 240px) rotateX(" + z3 + "deg) rotateY(" + -x3 + "deg) scale(1.25)";
 
        }
        else{
            ps = "translateY(-50%) rotateX(" + z3 + "deg) rotateY(" + -x3 + "deg) scale(1)";
            sun.style.transform = "translate3d(-50%, -50%, 240px) rotateX(" + z3 + "deg) rotateY(" + -x3 + "deg) scale(1)";
        }
        for(var i = 0; i < bs.length; i++){
            bs[i].style.transform = "translate3d(-100%,-50%, 5px) rotateX(" + z3 + "deg) rotateY(" + -x3 + "deg)";
            cl[i].style.transform = ps;
        }
    }
}

function end(){
    mov = false;
}
function rnS(){
    srnkPs = true;
    for(var i = 0; i < cl.length; i++){
        cl[i].style.transform = "translateY(-50%) rotateX(" + z3 + "deg) rotateY(" + -x3 + "deg) scale(0.85)";
    }
    rnF();
}
function rnE(){
    srnkPs = false;
    flooding = false;
    clearInterval(intrvl);
    clearInterval(wtIntvl);
    for(var i = 0; i < cl.length; i++){
        cl[i].style.transform = "translateY(-50%) rotateX(" + z3 + "deg) rotateY(" + -x3 + "deg) scale(1)";
    }
}
function rnF(){
    if(srnkPs){
        intrvl = setInterval(function(){
            var rn1 = Math.floor(Math.random() * (40 - 5)) - 20;
            var rn2 = Math.floor(Math.random() * 70);
            var e1 = document.createElement("div");
            var e2 = document.createElement("div");
            var rpl = document.createElement("div");
            e1.className = "r";
            e1.style.top = rn1 + "px";
            e1.style.left = rn2 + "px";
            e2.className = "rd";
            rpl.className = "rpl";
            rpl.style.top = rn1 + "px";
            rpl.style.left = rn2 + "px";
            if(drpCrl){
                rpl.style.background = "rgba(255,255,255,0.3)";
            }
            else{
                rpl.style.background = "rgba(0,0,0,0.1)";
            }
            e1.appendChild(e2);
            cld.appendChild(e1);
            setTimeout(function(){
                e1.style.transform = "translateZ(-" + rdHeight + "px)";
                rplr.style.transform = "translateZ(" + (200-rdHeight) + "px)";
                wtr.style.transform = "translateZ(" + ((200-rdHeight)-2) + "px)";
                wc[0].style.width = (200 - rdHeight) + "px";
                wc[1].style.width = (200 - rdHeight) + "px";
                wc[2].style.height = (200 - rdHeight) + "px";
                wc[3].style.height = (200 - rdHeight) + "px";
                setTimeout(function(){
                    cld.removeChild(e1);
                    rplr.appendChild(rpl);
                    setTimeout(function(){
                        rpl.style.opacity = 0;
                        setTimeout(function(){
                            rplr.removeChild(rpl);
                        },500);
                    },1000);
                },1000);
            },20);
        },rDropSpeed);
        setTimeout(function(){
            flooding = true;
            drpCrl = true;
        },2000);
        wtIntvl = setInterval(function(){
            if(flooding && rdHeight > 25){
                rdHeight -= wtlvlSpeed;
            }
            if(rdHeight == 25){
                flooding = false;
                clearInterval(intrvl);
                clearInterval(wtIntvl);
            }
        },rDropSpeed);
    }
}
function dnS(){
    dtSrnkPs = true;
    sun.style.transform = "translate3d(-50%, -50%, 240px) rotateX(" + z3 + "deg) rotateY(" + -x3 + "deg) scale(1.25)";
    sun.style.background = "#f5d442";
    dnF();
}
function dnE(){
    dtSrnkPs = false;
    draining = false;
    clearInterval(drIntrvl);
    clearInterval(wtDrIntvl);
    sun.style.transform = "translate3d(-50%, -50%, 240px) rotateX(" + z3 + "deg) rotateY(" + -x3 + "deg) scale(1)";
    sun.style.background = "#f5a742";
}
function dnF(){
    if(dtSrnkPs){
        draining = true;
        drIntrvl = setInterval(function(){
            wtr.style.transform = "translateZ(" + ((200-rdHeight)-2) + "px)";
            wc[0].style.width = (200 - rdHeight) + "px";
            wc[1].style.width = (200 - rdHeight) + "px";
            wc[2].style.height = (200 - rdHeight) + "px";
            wc[3].style.height = (200 - rdHeight) + "px";
        }, rDropSpeed);
        wtDrIntvl = setInterval(function(){
            if(draining && rdHeight < 200){
                rdHeight += wtlvlSpeed;
            }
            if(rdHeight == 200){
                draining = false;
                clearInterval(drIntrvl);
                clearInterval(wtDrIntvl);
            }
        },rDropSpeed);
    }
}
function clsF(){
    alrt.style.bottom = "-51%";
}
