var cvs = document.getElementById("cvs");
var ctx = cvs.getContext("2d");
var gGame = null;
//初始指针的图片序号
var arrowNum = Math.floor(Math.random()*5);
//图片合集
var img = document.getElementsByTagName("img");
//敌人实例对象数组
var enmeyArr = [];
//背景图片数组
var backgroundArr = ["a","m","xa"];
//游戏标志位
var theGameState = "LOADING";//设定3个状态：LOADING,STARTING,RUNING,ENDING,STOPING?
//最高分
var maxScore = 0;

//主体函数
function FrontSight() {
    var _this = this;
    //敌人数量
    this.enemyNum = 5;
    //鼠标移动位置X坐标
    this.mouseMoveX = 0;
    //鼠标移动位置Y坐标
    this.mouseMoveY = 0;
    //鼠标点击位置X坐标
    this.mouseClickX = 0;
    //鼠标点击位置Y坐标
    this.mouseClickY=0;
    //鼠标按下坐标X
    this.mouseDownX = 0;
    //鼠标按下坐标Y
    this.mouseDownY = 0;
    //鼠标抬起坐标X
    this.mouseUpX = 0;
    //鼠标抬起坐标Y
    this.mouseUpY = 0;
    //得分计算
    this.scoreNum = 0;
    //得分分数转字符串
    this.scoreText = "";
    //canvas背景图片序号
    this.backgroundNum = 0;
    //子弹图片的图片X坐标
    this.bulletX = 0;
    //子弹图片的图片Y坐标
    this.bulletY = 0;
    //子弹图片的计时器
    this.flam = 0;
    //子弹数量数字
    this.bulletNum = 10;
    //子弹数量数字转字符串
    this.bulletText = "";
    //鬼火图片序号控制
    this.fireImg = 37;
    //蓝票图片序号控制
    this.bulletImg = 47;
    //能否获取蓝票控制
    this.bulletSuppliesFlag = true;
    //技能数字图片序号控制
    this.timeStopNum = 5;
    //时间静止技能发动控制
    this.timeStopFlag = true;
    //时间流动参数控制
    this.timeRun = true;
    //时间静止时长控制
    this.timeNum = 0;
    //等级提升图片控制1
    this.level = false;
    //等级提升图片出现时间控制
    this.levelNum = 0;
    //等级提升图片类型
    this.levelImg = 57;
    //等级提升图片控制2
    this.imgUp = true;
    //倒计时图片定位位置
    this.timeFlap = 0;
    //开始游戏文字图片X坐标
    this.imgStartTextX = 200;
    //开始游戏文字图片X坐标
    this.imgStartTextY = 410;
    //开始游戏文字图片宽度
    this.imgStartTextWidth = 313;
    //开始游戏文字图片高度
    this.imgStartTextHeight = 89;
    //加载界面图片序号控制
    this.imgLoadingFlam =0;
    //加载界面计时器
    this.loadingTime = 0;
    //加载界面跳转计时器
    this.loadingJump = 0;
    //成就图片序号
    this.achievementNum = 65;
    //成就界面分数展示背景图片
    this.scoreImgNum = 73;
    //新局开启图片X坐标
    this.newGameImgX = 305;
    //新局开启图片Y坐标
    this.newGameImgY = 660;
    //新局开启图片宽度
    this.newGameImgWidth = 142;
    //新局开启图片高度
    this.newGameImgHeight = 40;
    //分享图片X坐标
    this.shareImgX = 599;
    //分享图片Y坐标
    this.shareImgY = 900;
    //分享图片宽度
    this.shareImgWidth = 101;
    //分享图片高度
    this.shareImgHeight = 100;
    //返回图标X坐标
    this.backImgX = 10;
    //返回图标Y坐标
    this.backImgY = 10;
    //返回图标宽度
    this.backImgWidth = 94;
    //返回图标高度
    this.backImgHeight = 89;
    //最高纪录，刷新纪录图片控制
    this.updateScoreImg = 82;
    //是否是最大值
    this.isMax =true;
    //更新事件
    this.updateFrontSight = function () {
        ctx.beginPath();
        ctx.clearRect(0,0,cvs.width,cvs.height);
        if(theGameState === "LOADING"){
            _this.loadingBackground();
        }
        if(theGameState === "STARTING"){
            _this.startButton();
        }
        if(theGameState === "RUNING"){
            _this.levelUp();
            _this.enemyUpdate();
            _this.enemyCreate();
            _this.backButton();
            _this.timeStop();
            _this.timeGoRun();
            _this.bulletSupplies();
            _this.theBullet();
            _this.score();
            _this.draw();
        }
        if(theGameState ==="ENDING"){
            _this.background();
            _this.scoreShow();
            _this.scoreTextInput();
            _this.achievementImg();
            _this.newGame();
            _this.share();
            _this.backButton();
            _this.updateScore()
        }
        window.requestAnimationFrame(_this.updateFrontSight);
    };
    //随分数控制enemy生成数量，随分数改变火焰颜色,控制等级提升图片出现。
    this.enemyUpdate = function () {
        if(_this.scoreNum<10){
            _this.enemyNum = 3;
            _this.fireImg = 37;
            _this.imgUp =true
        }else if(_this.scoreNum<20){
            if(_this.scoreNum == 10 && _this.imgUp == true){
                _this.level = true;
            }
            _this.imgUp =false;
            _this.fireImg = 38;
        }else if(_this.scoreNum<30){
            if(_this.scoreNum == 20 && _this.imgUp == false){
                _this.level = true;
            }
            _this.fireImg = 39;
            _this.imgUp =true
        }else if(_this.scoreNum<40){
            if(_this.scoreNum == 30 && _this.imgUp == true){
                _this.level = true;
            }
            _this.imgUp =false;
            _this.enemyNum = 5;
            _this.fireImg = 40;
        }else if(_this.scoreNum<50){
            if(_this.scoreNum == 40 && _this.imgUp == false){
                _this.level = true;
            }
            _this.fireImg = 41;
            _this.imgUp =true
        }else if(_this.scoreNum<60){
            if(_this.scoreNum == 50 && _this.imgUp == true){
                _this.level = true;
            }
            _this.imgUp =false;
            _this.fireImg = 42;
        }else if(_this.scoreNum<80){
            if(_this.scoreNum == 60 && _this.imgUp == false){
                _this.level = true;
            }
            _this.imgUp =true;
            _this.enemyNum = 8;
            _this.fireImg = 43;
        }else {
            if(_this.scoreNum == 80 && _this.imgUp == true){
                _this.level = true;
                _this.levelImg = 58
            }
            if (_this.scoreNum < 150) {
                _this.fireImg = 44
            } else {
                _this.fireImg = 45
            }
            if (_this.enemyNum >= 20) {
                _this.enemyNum = 20
            } else {
                _this.enemyNum = parseInt(_this.scoreNum / 10)
            }
            _this.imgUp =false;
        }
    };
    //构建enemy，将enemy推入数组，改变enemy飞行速度，enemy数量，到一定值后enemy大小减小
    this.enemyCreate=function () {
        for ( var i = 0;i<_this.enemyNum;i++){
            if (enmeyArr.length < _this.enemyNum) {
                var enemy = new Enemy();
                enmeyArr.push(enemy)
            }
            if(_this.timeRun){
                if(_this.scoreNum<10){
                    enmeyArr[i].enmeyX-=2;
                }else if(_this.scoreNum<20){
                    enmeyArr[i].enmeyX -= 2.2;
                }else if(_this.scoreNum<30){
                    enmeyArr[i].enmeyX -= 2.4;
                }else if(_this.scoreNum<40){
                    enmeyArr[i].enmeyX -= 2.6;
                }else if(_this.scoreNum<50){
                    enmeyArr[i].enmeyX -= 2.8;
                }else if(_this.scoreNum<60){
                    enmeyArr[i].enmeyX -= 3;
                }else if(_this.scoreNum<80){
                    enmeyArr[i].enmeyX -= 3.2;
                }else{
                    if(enmeyArr[i].enmeyWidth<=40){
                        enmeyArr[i].enmeyWidth = 40;
                        enmeyArr[i].enmeyHeight = 40;
                    }else{
                        enmeyArr[i].enmeyWidth =80-(_this.scoreNum-80)/10;
                        enmeyArr[i].enmeyHeight =80-(_this.scoreNum-80)/10;
                    }
                    enmeyArr[i].enmeyX -= (_this.scoreNum*4)/100;
                }
            }
            enmeyArr[i].move();
            if(enmeyArr[i].enmeyX<=-200){
                enmeyArr[i].enmeyDath = false;
                enmeyArr.splice(i,1);
            }
        }
    };
    //鬼火的图标
    this.theBullet = function () {
        ctx.beginPath();
        ctx.drawImage(img[_this.fireImg],
            img[37].width/9*_this.bulletX,0,img[37].width/9,img[37].height,
            200,820,img[37].width/9,img[37].height);
        ++_this.flam;
        if(_this.flam>=10){
            ++_this.bulletX;
            _this.flam = 0;
        }
        if(_this.bulletX>8){
            _this.bulletX=0
        }
        //bullet数量
        ctx.beginPath();
        var imgX = 300;
        _this.bulletText = _this.bulletNum+"";
        var arr = [0];
        arr = _this.bulletText.split("");
        for(var i = 0;i<arr.length;i++){
            ctx.drawImage(img[Number(arr[i])+27],imgX,885,img[28].width*1.1,img[28].height*1.1);
            imgX = imgX+50;
        }
    };
    //画返回图标
    this.backButton=function () {
        ctx.beginPath();
        ctx.drawImage(img[56],_this.backImgX,_this.backImgY,
            _this.backImgWidth,_this.backImgHeight);
    };
    //画指针
    this.draw = function(){
        ctx.beginPath();
        ctx.drawImage(img[arrowNum],0,0,133,151,_this.mouseMoveX,_this.mouseMoveY,133,151);
    };
    //改变背景图片
    this.backgroundPicture = function () {
        cvs.style.backgroundImage = "url(img/background/"+backgroundArr[_this.backgroundNum]+".png)";
        _this.backgroundNum++;
        if (_this.backgroundNum>2){
            _this.backgroundNum = 0;
        }
        clearTimeout(timer);
        var timer = setTimeout(_this.backgroundPicture,28000);
    };
    //游戏分数记录
    this.score=function(){
        ctx.beginPath();
        var imgX = 260;
        _this.scoreText = _this.scoreNum+"";
        var arr = [0];
        arr = _this.scoreText.split("");
        for(var i = 0;i<arr.length;i++){
            ctx.drawImage(img[Number(arr[i])+17],imgX,0,img[18].width,img[18].height);
            imgX = imgX+60;
        }
    };
    //bullet补给
    this.bulletSupplies = function () {
        ctx.beginPath();
        ctx.drawImage(img[_this.bulletImg],580,860,img[46].width,img[46].height);
    };
    //白金之星
    this.timeStop=function () {
        ctx.beginPath();
        ctx.drawImage(img[48],40,865,img[48].width,img[48].height);
        ctx.beginPath();
        ctx.drawImage(img[_this.timeStopNum+49],90,860,img[49].width*0.5,img[49].height*0.5);
    };
    //白金之星解除
    this.timeGoRun=function () {
        if(_this.timeRun == false) {
            _this.timeNum ++;
            ctx.beginPath();
            ctx.drawImage(img[55],0,0,img[55].width,img[55].height);
            ctx.beginPath();
            ctx.drawImage(img[59],img[59].width/5*_this.timeFlap,0,
            img[59].width/5,img[59].height,255,300,img[59].width/5,img[59].height);
            if(_this.timeNum%60 == 0 ){
                _this.timeFlap ++
            }
            if(_this.timeNum == 300){
                _this.timeRun = true;
                _this.timeNum = 0;
                _this.timeFlap = 0;
            }
        }
    };
    //等级提升图片插入
    this.levelUp = function () {
        ctx.beginPath();
        if(_this.level){
            _this.levelNum ++;
            ctx.drawImage(img[_this.levelImg],200,200,img[_this.levelImg].width,img[_this.levelImg].height);
            if(_this.levelNum == 60 ){
                _this.level = false;
                _this.levelNum = 0
            }
        }
    };
    //鼠标移动事件，获取鼠标移动坐标
    this.onmousemove=function (ev) {
        ev = event||window.event;
        _this.mouseMoveX = ev.pageX - cvs.offsetLeft;
        _this.mouseMoveY = ev.pageY - cvs.offsetTop;
    };
    //鼠标点击事件，仅"RUNING"下触发，获取鼠标点击坐标，点击使敌人消失，当子弹为0，进入结束界面
    this.onclick=function(ev){
        ev = event||window.event;
        _this.mouseClickX = ev.pageX - cvs.offsetLeft;
        _this.mouseClickY = ev.pageY - cvs.offsetTop;
        //点击enemy使enemy消失，score加1，bullet不减
        if(theGameState === "RUNING"){
            for (var i = 0;i<enmeyArr.length;i++){
                if(_this.mouseClickX>=enmeyArr[i].enmeyX && _this.mouseClickX<=enmeyArr[i].enmeyX+enmeyArr[i].enmeyWidth
                    &&_this.mouseClickY>=enmeyArr[i].enmeyY && _this.mouseClickY<=enmeyArr[i].enmeyY+enmeyArr[i].enmeyHeight){
                    enmeyArr[i].enmeyDath = false;
                    enmeyArr.splice(i,1);
                    _this.scoreNum++;
                    _this.bulletNum++;
                }
            }
            //点击锦鲤时，bullet加，只能点击一次
            if(_this.bulletSuppliesFlag){
                if(_this.mouseClickX>=580 && _this.mouseClickX<=580+img[46].width
                    &&_this.mouseClickY>=860 && _this.mouseClickY<=860+img[46].height){
                    _this.bulletNum = 667;
                    _this.bulletImg = 46;
                    _this.bulletSuppliesFlag = false;
                }
            }
            //点击兔子舞的时候，enemy不移动，当使用次数为0时无法触发
            if(_this.timeStopFlag){
                if(_this.mouseClickX>=40 && _this.mouseClickX<=40+img[48].width
                    &&_this.mouseClickY>=865 && _this.mouseClickY<=865+img[48].height){
                    if(_this.timeStopNum<=0){
                        _this.timeStopNum = 0;
                        _this.timeStopFlag = false;
                    }else{
                        _this.timeStopNum--;
                        _this.timeRun = false;
                    }
                    _this.bulletNum++;
                }
            }
            //点击空白，bullet减少
            _this.bulletNum--;
            if(_this.bulletNum === 0 ){
                theGameState = "ENDING";
                cvs.style.cursor = "auto"
            }
            if(_this.mouseDownX>=10 && _this.mouseDownX<=10+img[56].width
                &&_this.mouseDownY>=10 && _this.mouseDownY<=10+img[56].height){
                _this.bulletNum++;
            }
        }
    };
    //鼠标按下事件，仅"STARTING"下触发，大小位置改变
    this.onmousedown = function (ev) {
        ev = event||window.event;
        _this.mouseDownX = ev.pageX - cvs.offsetLeft;
        _this.mouseDownY = ev.pageY - cvs.offsetTop;
        if(theGameState === "STARTING"){
            if(_this.mouseDownX>=200 && _this.mouseDownX<=200+img[64].width
                &&_this.mouseDownY>=410 && _this.mouseDownY<=410+img[64].height){
                _this.imgStartTextWidth = img[64].width * 0.95;
                _this.imgStartTextHeight = img[64].height * 0.95;
                _this.imgStartTextX = 200+(img[64].width-img[64].width * 0.95)/2;
                _this.imgStartTextY = 410+(img[64].height-img[64].height * 0.95)/2;
            }
        }
        if(theGameState === "ENDING"){
            if(_this.mouseDownX>=599 && _this.mouseDownX<=599+img[80].width
                &&_this.mouseDownY>=900 && _this.mouseDownY<=900+img[80].height){
                _this.shareImgX = 599+(img[80].width-img[80].width*0.95)/2;
                _this.shareImgY = 900+(img[80].height-img[80].height*0.95)/2;
                _this.shareImgWidth = img[80].width*0.95;
                _this.shareImgHeight = img[80].height*0.95;
            }
            if(_this.mouseDownX>=305 && _this.mouseDownX<=305+img[79].width*0.5
                &&_this.mouseDownY>=660 && _this.mouseDownY<=660+img[79].height*0.5){
                _this.newGameImgX = 305+(img[79].width*0.5 - img[79].width*0.5*0.95)/2;
                _this.newGameImgY = 660+(img[79].height*0.5 - img[79].height*0.5*0.95)/2;
                _this.newGameImgWidth = img[79].width*0.5*0.95;
                _this.newGameImgHeight = img[79].height*0.5*0.95;
            }
        }
        if(theGameState === "ENDING"|| theGameState === "RUNING"){
            if(_this.mouseDownX>=10 && _this.mouseDownX<=10+img[56].width
                &&_this.mouseDownY>=10 && _this.mouseDownY<=10+img[56].height){
                _this.backImgX = 10+(img[56].width - img[56].width*0.95)/2;
                _this.backImgY = 10+(img[56].height - img[56].height*0.95)/2;
                _this.backImgWidth = img[56].width*0.95;
                _this.backImgHeight = img[56].height*0.95;
            }
        }
    };
    //鼠标抬起事件，仅"STARTING"下触发，仅在范围内抬起进入运行界面，在任意范围触发大小位置恢复
    this.onmouseup = function (ev) {
        ev = event||window.event;
        _this.mouseUpX = ev.pageX - cvs.offsetLeft;
        _this.mouseUpY = ev.pageY - cvs.offsetTop;
        if(theGameState === "STARTING") {
            if(_this.mouseUpX>=200 && _this.mouseUpX<=200+img[64].width
                &&_this.mouseUpY>=410 && _this.mouseUpY<=410+img[64].height) {
                theGameState = "RUNING";
                _this.bulletNum++;
                cvs.style.cursor = "none";
            }
            _this.imgStartTextWidth = img[64].width;
            _this.imgStartTextHeight = img[64].height;
            _this.imgStartTextX = 200;
            _this.imgStartTextY = 410;
        }
        if(theGameState === "ENDING"){
            if((_this.mouseUpX>=305 && _this.mouseUpX<=305+img[79].width*0.5
                &&_this.mouseUpY>=660 && _this.mouseUpY<=660+img[79].height*0.5)
                ||(_this.mouseUpX>=10 && _this.mouseUpX<=10+img[56].width
                    &&_this.mouseUpY>=10 && _this.mouseUpY<=10+img[56].height)){
                theGameState = "STARTING";
                _this.bulletNum = 10;
                _this.scoreNum = 0;
                _this.level = false;
                _this.levelNum = 0;
                _this.timeRun = true;
                _this.timeNum = 0;
                _this.timeFlap = 0;
                _this.bulletSuppliesFlag = true;
                _this.timeStopFlag = true;
                _this.timeStopNum = 5;
                _this.bulletImg = 47;
            }
            _this.newGameImgX = 305;
            _this.newGameImgY = 660;
            _this.newGameImgWidth = img[79].width*0.5;
            _this.newGameImgHeight = img[79].height*0.5;
            _this.shareImgX = 599;
            _this.shareImgY = 900;
            _this.shareImgWidth = 101;
            _this.shareImgHeight = 100;
            _this.backImgX = 10;
            _this.backImgY = 10;
            _this.backImgWidth = img[56].width;
            _this.backImgHeight = img[56].height;
        }
        if(theGameState === "RUNING"){
            if(_this.mouseUpX>=10 && _this.mouseUpX<=10+img[56].width
                &&_this.mouseUpY>=10 && _this.mouseUpY<=10+img[56].height){
                theGameState = "ENDING";
                cvs.style.cursor = "auto"
            }
            _this.backImgX = 10;
            _this.backImgY = 10;
            _this.backImgWidth = img[56].width;
            _this.backImgHeight = img[56].height;
        }
    };
    //加载界面，时间后进入开始界面
    this.loadingBackground = function () {
        ctx.beginPath();
        ctx.drawImage(img[60],0,0,img[60].width,img[60].height);
        ctx.beginPath();
        ctx.drawImage(img[61],img[61].width/4*_this.imgLoadingFlam,0,img[61].width/4,img[61].height,
            250,850,img[61].width/4,img[61].height);
        ctx.beginPath();
        ctx.drawImage(img[81],50,350,img[81].width,img[81].height);
        ctx.beginPath();
        ctx.drawImage(img[62],img[62].width/4*_this.imgLoadingFlam,0,img[62].width/4,img[62].height,
            280,700,img[62].width/4,img[62].height);
        if(_this.loadingTime>=20){
            _this.imgLoadingFlam++;
            _this.loadingTime =0
        }else{
            _this.loadingTime++
        }
        if(_this.imgLoadingFlam>3){
            _this.imgLoadingFlam = 0
        }
        if(_this.loadingJump == 300){
            theGameState = "STARTING";
        }else{
            _this.loadingJump++
        }
    };
    //开始界面
    this.startButton = function () {
        ctx.beginPath();
        ctx.drawImage(img[63],100,350,img[63].width,img[63].height);
        ctx.beginPath();
        ctx.drawImage(img[64],_this.imgStartTextX,_this.imgStartTextY,
            _this.imgStartTextWidth,_this.imgStartTextHeight);
    };
    //结束界面背景图片
    this.background = function () {
        ctx.beginPath();
        ctx.drawImage(img[77],0,0,img[77].width,img[77].height)
    };
    //结束界面分数展示背景图片
    this.scoreShow = function () {
        ctx.beginPath();
        if(_this.scoreNum<=60){
            _this.scoreImgNum = 73
        }else if(_this.scoreNum<=100){
            _this.scoreImgNum = 74
        }else if(_this.scoreNum<=150){
            _this.scoreImgNum = 75
        }else{
            _this.scoreImgNum = 76
        }
        ctx.drawImage(img[_this.scoreImgNum],cvs.width - img[_this.scoreImgNum].width*0.5,0,
            img[_this.scoreImgNum].width*0.5,img[_this.scoreImgNum].height*0.5);
    };
    //结束界面分数展示
    this.scoreTextInput = function () {
        ctx.beginPath();
        var imgX = 500;
        var arr = [0];
        arr = _this.scoreText.split("");
        if(arr.length === 3){
            imgX = 480
        }
        if(arr.length === 2){
            imgX = 510
        }
        if(arr.length === 1){
            imgX = 540
        }
        for(var i = 0;i<arr.length;i++){
            ctx.drawImage(img[Number(arr[i])+17],imgX,43,img[18].width,img[18].height);
            imgX = imgX+60;
        }
    };
    //结束界面成就图片
    this.achievementImg = function () {
        ctx.beginPath();
        if(_this.scoreNum<=10){
            _this.achievementNum = 65;
        }else if(_this.scoreNum<=30){
            _this.achievementNum = 66;
        }else if(_this.scoreNum<=50){
            _this.achievementNum = 67;
        }else if(_this.scoreNum<=70){
            _this.achievementNum = 68;
        }else if(_this.scoreNum<=90){
            _this.achievementNum = 69;
        }else if(_this.scoreNum<=110){
            _this.achievementNum = 70;
        }else if(_this.scoreNum<=150){
            _this.achievementNum = 71;
        }else {
            _this.achievementNum = 72;
        }
        ctx.drawImage(img[_this.achievementNum],190,350,
            img[_this.achievementNum].width*1.4,img[_this.achievementNum].height*1.4);
    };
    //结束界面刷新纪录，最高纪录
    this.updateScore = function () {
        ctx.beginPath();
        var maxScoreLast = 0;
        if(maxScoreLast>=_this.scoreNum){
            _this.updateScoreImg = 83
        }else{
            _this.updateScoreImg = 82;
            maxScore = _this.scoreNum
        }
        maxScoreLast = maxScore;
        var imgX = 400;
        var arr = [0];
        var maxScoreText = maxScoreLast+"";
        arr = maxScoreText.split("");
        if(arr.length === 3){
            imgX = 240
        }
        if(arr.length === 2){
            imgX = 270
        }
        if(arr.length === 1){
            imgX = 310
        }
        for(var i = 0;i<arr.length;i++){
            ctx.drawImage(img[Number(arr[i])+17],imgX,530,img[18].width,img[18].height);
            imgX = imgX+60;
        }
        ctx.drawImage(img[_this.updateScoreImg],250,470,
            img[_this.updateScoreImg].width,img[_this.updateScoreImg].height)
    };
    //开始新游戏图片
    this.newGame = function () {
        ctx.beginPath();
        ctx.drawImage(img[79],_this.newGameImgX,_this.newGameImgY,
            _this.newGameImgWidth,_this.newGameImgHeight)
    };
    //分享图片
    this.share = function () {
        ctx.beginPath();
        ctx.drawImage(img[80],_this.shareImgX,_this.shareImgY,
            _this.shareImgWidth,_this.shareImgHeight);
    };
    //调用鼠标事件
    cvs.onclick = _this.onclick;
    cvs.onmousemove =_this.onmousemove;
    cvs.onmousedown = _this.onmousedown;
    cvs.onmouseup = _this.onmouseup;
}
//enemy的构造函数
function Enemy(){
    var _this = this;
    this.enmeyX = Math.floor(Math.random()*400+300);
    this.enmeyY = Math.floor(Math.random()*600+100);
    this.enmeyDath = true;
    this.enmeyWidth = 80;
    this.enmeyHeight = 80;
    var imgNum = Math.ceil(Math.random()*11)+5;
    //敌人移动事件
    this.move=function () {
        ctx.beginPath();
        if(_this.enmeyDath){
            ctx.drawImage(img[imgNum],0,0,img[imgNum].width,img[imgNum].height,
                _this.enmeyX,_this.enmeyY,_this.enmeyWidth,_this.enmeyHeight);
        }
    };
}

gGame = new FrontSight();
gGame.updateFrontSight();
gGame.backgroundPicture();





