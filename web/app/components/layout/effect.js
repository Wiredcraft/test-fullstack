import React from 'react';

class Effect extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.refs.effect.width = window.innerWidth;
        this.refs.effect.height = window.innerHeight;
        
        let hearts=[];
        let balls=[];
        let canvas=this.refs.effect.getContext("2d");
        
        //创建对象
        function ball(){
            this.x=null;
            this.y=null;
            this.color=null;
            this.r=null;
            this.angle=null;//小球偏移量
            this.anglex=null;
            this.angley=null;
            //初始状态的小球
            this.int=function(X,Y){
                this.x=X;
                this.y=Y;
                this.color=this.randomcolor();
                this.r=this.randomR(5,5);
                this.angle=Math.random()*(Math.PI*2);
                this.anglex=this.randomR(5,5)*Math.cos(this.angle);
                this.angley=this.randomR(5,5)*Math.sin(this.angle);
                return this;
            }
            //随机颜色
            this.randomcolor=function(){
                //return '#e53e3e';
                return "#"+parseInt(Math.random()*(16777216)).toString(16);
            }
            //随机数字 可控制半径或xy移动量
            this.randomR=function(min,max){
                return Math.random()*max+min;
            }
            //小球的运动及偏移量
            this.move=function(){
                this.x+=this.anglex;
                this.y+=this.angley;
                this.r-=0.3;
                this.anglex*=0.9;
                this.angley*=0.9;
            }
        }

        //在canvas上绘制小球
        function draw(){
            for (let b of balls) {
                b.move();
                canvas.beginPath();
                canvas.arc(b.x, b.y, b.r,0,Math.PI*2,true);
                canvas.fillStyle= b.color;
                canvas.fill();
                canvas.closePath();
            }

            for (let h of hearts) {
                h.move();
                console.log(parseInt((h.o*100)));
                canvas.font="20px Arial";
                canvas.fillStyle= h.color + h.o.toString(16);
                canvas.fillText("+1", h.x, h.y);                
            }
        }
        //移除小球
        function remove(){
            for(let i=0;i<balls.length;i++){
                if(balls[i].r<0.3){
                    balls.splice(i,1);
                    i--;
                }
            }
            for(let j=0;j<hearts.length;j++){
                if(hearts[j].o<30){
                    hearts.splice(j,1);
                    j--;
                }
            }
        }

        function heart(){
            this.x=null;
            this.y=null;
            this.color=null;
            this.o=255;
            this.int=function(X,Y){
                this.x=X-11;
                this.y=Y-5;
                this.color=this.randomcolor();
                return this;
            }
            //随机颜色
            this.randomcolor=function(){
                return '#e53e3e';
                // return "#"+parseInt(Math.random()*(16777216)).toString(16);
            }
            //运动轨迹
            this.move=function(){
                this.y-=1;
                this.o-=3;
            }
        }

        function createLike(X,Y){
            hearts.push((new heart()).int(X, Y));
        }
        //创建小球
        function createBlock(X,Y){
            let count=parseInt(Math.random()*30+30);
            for(let i=0;i<count;i++){
                balls.push((new ball()).int(X, Y));
            }
        }

        function time(){
            canvas.clearRect(0,0,window.innerWidth,window.innerHeight);
            draw();
            remove();
            window.requestAnimationFrame(time);
        }
        //计时器
        time();
        window.addEventListener('resize', e => {
            this.refs.effect.width = window.innerWidth;
            this.refs.effect.height = window.innerHeight;
        });

        window.addEventListener('like', e => {
            createLike(e.detail.clientX,e.detail.clientY);
        });
        window.addEventListener('block', e => {
            createBlock(e.detail.clientX,e.detail.clientY);
            
        });
    }

    render() {
        return (
            <canvas ref="effect" style={{ position: 'fixed', top: 0, left: 0, zIndex: 99, pointerEvents: 'none' }} />
        )
    }
}

export default Effect;