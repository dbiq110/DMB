 function creatMyAvatar(option){
        this.cas=document.createElement('canvas');
        this.width=option.width;
        this.height=option.height;
        this.url=option.url;
        this.ctx=this.cas.getContext('2d');
    }
    creatMyAvatar.prototype={
        showMYAvatar:function(){
            this.cas.width=this.width;
            this.cas.height=this.height;
            var self=this;
            var img = new Image();
            img.src = this.url;
            img.onload = function () {//图片加载好开始运行
                var index=0;//初始化index
                self.ctx.drawImage( img, 0, (self.height)*(index)+1,self.width,self.height,0,5,self.width,self.height );
                //self.ctx.drawImage( img, 0, (self.height)*(index+1)+5,self.width,self.height,0,0,self.width,self.height );
                var avatarX=self.cas.offsetLeft+self.cas.width/2;
                var avatarY=self.cas.offsetTop+self.cas.height/2;
                window.onmousemove=function(e){
                    e=e||window.event;
                    index=Math.floor(self.getAngle(avatarX, avatarY, e.clientX, e.clientY)/30)-3
                    if(index==-1){
                        index=11
                    }else if(index==-2){
                        index=10
                    }else if(index==-3){
                        index=9
                    }
                    self.ctx.clearRect(0,0,self.cas.width,self.cas.height);
                    //self.ctx.drawImage( img, 0, 225*(index),300,225,0,-2,300,215 );
                    self.ctx.drawImage( img, 0, (self.height)*(index)+1,self.width,self.height,0,5,self.width,self.height );
                    //self.ctx.drawImage( img, 0, (self.height+1)*(index+1),self.width,self.height,0,0,self.width,self.height );

                }
            }
            return this.cas
        },
        getAngle:function (px,py,mx,my){//获得人物中心和鼠标坐标连线，与y轴正半轴之间的夹角
            var x = Math.abs(px-mx);
            var y = Math.abs(py-my);
            var z = Math.sqrt(Math.pow(x,2)+Math.pow(y,2));
            var cos = y/z;
            var radina = Math.acos(cos);//用反三角函数求弧度
            var angle = Math.floor(180/(Math.PI/radina));//将弧度转换成角度
            if(mx>px&&my>py){//鼠标在第四象限
                angle = 180 - angle;
            }
            if(mx==px&&my>py){//鼠标在y轴负方向上
                angle = 180;
            }
            if(mx>px&&my==py){//鼠标在x轴正方向上
                angle = 90;
            }
            if(mx<px&&my>py){//鼠标在第三象限
                angle = 180+angle;
            }
            if(mx<px&&my==py){//鼠标在x轴负方向
                angle = 270;
            }
            if(mx<px&&my<py){//鼠标在第二象限
                angle = 360 - angle;
            }
            return angle;
        }
    }
