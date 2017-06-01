var vm = new Vue({
    el: '.container',
    data: {
        proSrc: 'img/img(1).jpg', //奶瓶初始图片
        uploadImg: '', //上传图片地址（转base64格式） 
        mouseOffsetX: '', //当前鼠标相对父容器点击X轴位置，拖动功能实现
        mouseOffsetY: '', //当前鼠标相对父容器点击Y轴位置，拖动功能实现
        isMouseDown: false, //标记是否按下，拖动功能
        diyBoxLeft: '', //上传图片容器的 left 值
        diyBoxTop: '', //上传图片容器的 top 值
        diyBoxWidth: '50', //上传图片容器的初始值
        mouseOffsetX: '', //当前鼠标相对父容器点击Y轴位置，缩放功能实现
        mouseOffsetY: '', //当前鼠标相对父容器点击X轴位置，缩放功能实现
        zoomX: '', //当前鼠标点击Y轴位置，缩放功能实现
        isZoom: '', //标记是否按下，缩放功能

    },
    methods: {
        onImgChange: function(e) { //获取上传图片的file值
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length) {
                return;
            }
            this.createImage(files[0]);
        },
        createImage(file) { //把上传的图片转成base64格式
            var uploadImg = new Image();
            var reader = new FileReader();
            var _this = this;
            reader.onload = (e) => {
                _this.uploadImg = e.target.result;
            };
            reader.readAsDataURL(file);
        },
        imgMouseDown: function(e) { //鼠标按下   拖拽功能实现步骤1
            this.mouseOffsetX = e.pageX - e.target.parentNode.offsetLeft;
            this.mouseOffsetY = e.pageY - e.target.parentNode.offsetTop;
            this.isMouseDown = true;
        },
        imgMousemove: function(e) { //鼠标移动   拖拽功能实现步骤2
            if (this.isMouseDown === true) {
                var mouseX = e.pageX; // 鼠标当前的位置
                var mouseY = e.pageY;
                //拖拽范围设置
                var maxX = e.target.parentNode.parentNode.clientWidth - e.target.parentNode.clientWidth;
                var maxY = e.target.parentNode.parentNode.clientHeight - e.target.parentNode.clientHeight;
                this.diyBoxLeft = Math.min(Math.max(0, mouseX - this.mouseOffsetX), maxX);
                this.diyBoxTop = Math.min(Math.max(0, mouseY - this.mouseOffsetY), maxX);
                //end-拖拽范围设置
            }
        },
        zoomMouseDown: function(e) { //缩放功能1
            this.zoomX = e.pageX
            this.isZoom = true;
        },
        zoomMousemove: function(e) { //缩放功能2
            var boxWidth = e.target.parentNode.clientWidth;
            var wrapWidth = e.target.parentNode.parentNode.clientWidth;
            if (this.isZoom) {
                if (this.zoomX > e.pageX) {
                    this.diyBoxWidth = parseInt(this.diyBoxWidth) - 1;
                } else {
                    if (wrapWidth - boxWidth <= this.diyBoxLeft) {
                        this.diyBoxWidth = (wrapWidth - this.diyBoxLeft) / wrapWidth * 100;
                    } else {
                        this.diyBoxWidth = parseInt(this.diyBoxWidth) + 1;
                    }

                }
            }

        }
    }
});


//截图功能
function saveImg(event) {
    console.log(event)
    html2canvas($('html'), {
        onrendered: function(canvas) {
            //canvas.id = "mycanvas";
            document.body.appendChild(canvas);
            //生成base64图片数据
            var dataUrl = canvas.toDataURL();
            download(dataUrl);
        }
    });
}
function download(src) {
    var $a = $("<a></a>").attr("href", src).attr("download", "img.png");
    $a[0].click();
}