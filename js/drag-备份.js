$(function () {
    let $diaLogMark = $(".diaLogMark"),
        $diaLogBox = $(".diaLogBox"),
        $title = $diaLogBox.find(".title"),
        $i = $diaLogBox.find("i");
    let winX = document.documentElement.clientWidth,
        winY = document.documentElement.clientHeight,
        boxX = $diaLogBox[0].offsetWidth,
        boxY = $diaLogBox[0].offsetHeight;
    //拖拽的盒子移动到中间
    $diaLogBox.css({
        left: (winX - boxX) / 2,
        top: (winY - boxY) / 2
    })
    //点击关闭
    $i.on("click", function () {
        $diaLogBox.stop().fadeOut(200, () => {
            $diaLogBox.css("display", "none");
            $diaLogMark.css("display", "none");
        });
    });
    //鼠标点击记录位置
    let clickDown = function (ev) {
        this.starX = ev.clientX;
        this.starY = ev.clientY;
        this.starL = parseFloat($diaLogBox.css("left"));
        this.starT = parseFloat($diaLogBox.css("top"));
        this.clickMove = clickMove.bind(this);
        this.clickUp = clickUp.bind(this);
        $(document).on("mousemove",this.clickMove).on("mouseup",this.clickUp);
    }
    //跟随移动
    let clickMove = function (ev) {
        let {starX, starY, starL, starT} = this;
        let curL = ev.clientX - starX + starL,
            curT = ev.clientY - starY + starT;
        let minL = 0,
            minT = 0,
            maxL = winX - boxX,
            maxT = winY - boxY;
        curL = curL < minL ? minL : (curL > maxL ? maxL : curL);
        curT = curT < minT ? minT : (curT > maxT ? maxT : curT);
        $diaLogBox.css({
            left: curL,
            top: curT
        });
    }
    //鼠标上台
    let clickUp = function (ev) {
        $(document).off("mousemove", this.clickMove).off("mouseup",this.clickUp);
    }
    $title.on("mousedown",clickDown);
});