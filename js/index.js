window.onload=function(){

    (function(){

//        初始化页面特效与fullpage
        var threeIsOn=false;
        fullpage.init('#sectionContent',{
            threshold: 130,              // 触发滚动事件的阈值，越小越灵敏
            pageSpeed: 500,             // 滚屏速度，单位为毫秒 ms
            autoScroll: 0,              // 自动播放时间间隔，如果为 0 则不自动播放，单位 ms
            loopSection: false,          // Section循环滚动
//        loopSlide: true,            // Slide循环滑动
            afterLoad: function(afterIndex){
                $('.nav li').eq(afterIndex-1).siblings().removeClass('active');
                $('.nav li').eq(afterIndex-1).addClass('active');
                $('.myLeaf').css("background-image","url('./images/leaf"+afterIndex+".png')");
                if(afterIndex==3&&!threeIsOn){
                    threeIsOn=true;
                    afterLoadInThree();
                }
            },            // 页面载入事件，具体查看下面的 afterLoad 函数
            beforeLeave: null,           // 页面离开事件，具体查看下面的 beforeLeave 函数
            afterSlideLoad: null,       // slide 载入事件
            beforeSlideLeave: null,      // slide 离开事件
        });
        var totalHight=document.body.offsetHeight
        //console.log(totalHight);
//        $('.fp-section').each(function(i,v){
//           $(this).css('height',$('#sectionContent').height());
//        })
        window.onresize=function(){
            var totalHight=document.body.offsetHeight
            console.log(totalHight);
            $('.fp-section').eq(0).css('height',totalHight)
            $('.fp-section').eq(1).css('height',totalHight)
            $('.fp-section').eq(2).css('height',totalHight)
            $('.fp-section').eq(3).css('height',totalHight)
            $('.fp-section').eq(4).css('height',totalHight)
        }

        var navs=$('.nav li');
        navs.each(function(i,v){
            $(v).on('click',function(){
                fullpage.moveTo(i+1,function(){
                });
            })
        })
        var leafContainer = document.querySelector('body'),
            leaves = new LeafScene(leafContainer);
        leaves.init();
        leaves.render();
    })()
    //个人信息按钮js代码
    $("#myInfo_1").on("click",function(){
        console.log(123);
        layer.open({
            title:"我的个人信息",
            type: 1,
            area: ['600px', '360px'],
            shadeClose: true, //点击遮罩关闭
            content:'\<\div style="margin: 0 auto;width:40%">'
                    +'\<\div style="padding:30px 0 0 20px">姓名:罗宇灏\<\/div>'
                    +'\<\div style="padding:10px 0 0 20px;">年龄:22岁\<\/div>'
                    +'\<\div style="padding:10px 0 0 20px;">职业:前端工程师\<\/div>'
                    +'\<\div style="padding:10px 0 0 20px;">工作年限:1年\<\/div>'
                    +'\<\div style="padding:10px 0 0 20px;">毕业院校:广东财经大学华商学院\<\/div>'
                    +'\<\div style="padding:10px 0 0 20px;">专业:信息管理与信息系统\<\/div>'
                    +'\<\div style="padding:10px 0 0 20px;">联系电话:18813759355\<\/div>'
                    +'\<\div style="padding:10px 0 0 20px;">邮箱:a735614908@gmail.com\<\/div>'
                    +'\<\/div>'
        });
    })
    //右键模态框
//    document.oncontextmenu= function(e){
//        var e = e || window.event;
//        if(e.button == "2"){ //判断是否是右键
//            //……你的代码……
//            $('.modal').modal('toggle')
////            alert("右击事件");
//            return false;
//        }
//        return true;
//    }
    //
    //摇头
    //第四页摇头js代码
    var avatar=new creatMyAvatar({
        url:'images/myAvatar3.png',
        width:240,
        height:180
    })
    $('#avatar').html(avatar.showMYAvatar());
    //$('.navbar-toggle').on('click',function(){
    //    console.log(123);
    //})
    //要使用touch事件
    $('.navbar-toggle').on('touchend',function(){
        $('.xs_nva').slideToggle();
    })
    //$('#sectionContent .myName').on('click',function(){
    //    alert(123);
    //})
//        个人经历
    var myChart2 = echarts.init(document.getElementById('mychart2'));
//获取目标对象数组里每个对象某个属性的值,并返回数组
    function getObjValue(arr,sel){
        var res=arr.map(function(v){
            return v[sel];
        })
        return res;
    }
//获取目标数组
    function getAvgArr(arr){
        var res=arr.map(function(v){
            var sum=0;
            for(var i=0;i< v.length;i++){
                sum+=v[i]
            }
            var avg=Math.round(sum/ v.length);
            return avg;
        })
        return res;
    }
    function afterLoadInThree(){
        $.ajax({
            type:'get',
            url:'./json/mySkills.json',
            success: function (data) {
                data.reverse();
                var jsDataName=getObjValue(data,'name')
                var jsDataVals=getObjValue(data,'value')
                var jsDataDecs=getObjValue(data,'decs')
                var jsDataTitle=getObjValue(data,'title')
                var jsDataVal=getAvgArr(jsDataVals);

//             使用刚指定的配置项和数据显示图表。
                var decs=document.querySelector(".skillDecs")
                if(window.innerWidth<=768){
                    option2={
                        _init:function(option){

                        },
                        title : {
                            text: "个人技能",
//                subtext: ""
                            show:false
                        },
//                提示框
                        tooltip : {
                            trigger: 'item'
                        },
                        legend: {
                            x : 'center',
                        },
                        series : [
                            {
                                name:'技能',
                                type:'bar',
                                data:jsDataVal,
                                barMaxWidth : 44,//柱图宽度
                                itemStyle: {
                                    normal: {
                                        label: {
                                            show: true,
                                            position:'right',
                                            textStyle: {
                                                color: '#ff9'//
                                            }
                                        },
                                        barBorderRadius:5,
                                        color:'rgba(10, 10, 0, 0.5)'//柱状图的颜色
                                    }
                                }
                            }
                        ],
                        //柱形图的样式
                        grid: {
                            x:'24%',
                            y:'0%',
                            width:'70%',
                            height:'100%',
                            backgroundColor:'rbga(255,255,255,0)'
                        },
                        xAxis : [
                            {
                                type : 'value',
                                show:false,
                            }
                        ],
                        yAxis : [
                            {
                                type : 'category',
                                data :jsDataName,
                                axisTick:{
                                    show:false
                                },
                                axisLine:{
                                    show:false
                                },
                                axisLabel:{
                                    textStyle:{
                                        color:"#28c7ff",//条形图标签颜色
                                        fontWeight:'400',
                                        fontSize:'12'
                                    }
                                }
                            }
                        ],
                    }
                    myChart2.setOption(option2);
                }else if(window.innerWidth>768){
                    var option2 = {
                        _init:function(option){

                        },
                        title : {
                            text: "个人技能",
//                  subtext: ""
                            show:false
                        },
//                  提示框
                        tooltip : {
                            trigger: 'item'
                        },
                        legend: {
                            x : 'center',
                        },
//                  雷达图
                        polar : [
                            {
                                name:{
                                    textStyle: {
                                        //设置颜色
                                        color:'#000000'//修改雷达图的颜色
                                    }
                                },
                                indicator : [
                                    { text : '使用' ,max:110},
                                    { text : '用法' ,max:110},
                                    { text : '原理' ,max:110},
                                ],
//                  位置
                                center : ['77%', '74%'],
                                radius : '30%',
                                splitLine:{
                                    show:true
                                },

                            }
                        ],

                        series : [
                            {
                                name: "radar",
                                type: 'radar',
//                        itemStyle: {normal: {areaStyle: {type: 'default'}}},
                                data: [123],
                                itemStyle:{
                                    normal:{
//                                label:{show:true}
//                                    areaStyle:{color:'#28c7ff',},
                                        areaStyle:{color:'#ff9'},
                                        lineWidth:0
                                    },
                                    emphasis:{label:{show:true}}
                                },
                                areaStyle: {
//                        color: ['#A7D282', '#FFF57F', '#FFF57F', '#EF856F','#A7D282']
                                },
                                symbolSize:0,
                            },
                            {
                                name:'技能',
                                type:'bar',
                                data:jsDataVal,
                                barMaxWidth : '40',//柱图宽度
                                itemStyle: {
                                    normal: {
                                        label: {
                                            show: true,
                                            position:'right',
                                            textStyle: {
                                                color: '#ff9'//
                                            }
                                        },
                                        barBorderRadius:5,
                                        color:'rgba(10, 10, 0, 0.6)'//柱状图的颜色
                                    }
                                }
                            }
                        ],
                        //柱形图的样式
                        grid: {
                            x:'15%',
                            y:'0%',
                            width:'50%',
                            height:'100%',
                            backgroundColor:'rbga(255,255,255,0)'
                        },
                        xAxis : [
                            {
                                type : 'value',
                                show:false,
                            }
                        ],
                        yAxis : [
                            {
                                type : 'category',
                                data :jsDataName,
                                axisTick:{
                                    show:false
                                },
                                axisLine:{
                                    show:false
                                },
                                axisLabel:{
                                    textStyle:{
                                        //color:"#ff9",//条形图标签颜色
                                        color:"#fff",//条形图标签颜色
                                        fontWeight:'400',
                                        fontSize:'20'
                                    }
                                }
                            }
                        ],
                    }
                    myChart2.setOption(option2);
                    myChart2.on("MOUSEOVER", showRader);
                }


                function showRader(param){
                    if(param.seriesType=="radar") return false;
                    option2.series[0].data=[jsDataVals[param.dataIndex]]
                    option2.series[0].name=[jsDataName[param.dataIndex]]
                    decs.children[1].innerHTML=[jsDataDecs[param.dataIndex]]
                    decs.children[0].innerHTML=[jsDataTitle[param.dataIndex]]
//                console.log(param);
                    myChart2.setOption(option2);
//                console.log(param.dataIndex);
                }
            }

        })
    }

}
