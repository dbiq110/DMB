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
            img.onload = function () {//ͼƬ���غÿ�ʼ����
                var index=0;//��ʼ��index
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
        getAngle:function (px,py,mx,my){//����������ĺ�����������ߣ���y��������֮��ļн�
            var x = Math.abs(px-mx);
            var y = Math.abs(py-my);
            var z = Math.sqrt(Math.pow(x,2)+Math.pow(y,2));
            var cos = y/z;
            var radina = Math.acos(cos);//�÷����Ǻ����󻡶�
            var angle = Math.floor(180/(Math.PI/radina));//������ת���ɽǶ�
            if(mx>px&&my>py){//����ڵ�������
                angle = 180 - angle;
            }
            if(mx==px&&my>py){//�����y�Ḻ������
                angle = 180;
            }
            if(mx>px&&my==py){//�����x����������
                angle = 90;
            }
            if(mx<px&&my>py){//����ڵ�������
                angle = 180+angle;
            }
            if(mx<px&&my==py){//�����x�Ḻ����
                angle = 270;
            }
            if(mx<px&&my<py){//����ڵڶ�����
                angle = 360 - angle;
            }
            return angle;
        }
    }
