'use strict';

const { createCanvas } = require('canvas')

module.exports = (options, app) => {
    const url = options.url || "/captcha";

    return async (ctx, next) => {
        if (ctx.path === url) {
            const { width = 100, height = 30 } = options;

            const canvas = createCanvas(width, height);
            const context = canvas.getContext('2d');

            canvas.width = width;
            canvas.height = height;

            var str =  [];
            var sCode = "a,b,c,d,e,f,g,h,i,j,k,m,n,p,q,r,s,t,u,v,w,x,y,z,A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0";
            var aCode = sCode.split(",");
            var aLength = aCode.length;

            //得到随机的颜色值
            function randomColor() {
                var r = Math.floor(Math.random() * 256);
                var g = Math.floor(Math.random() * 256);
                var b = Math.floor(Math.random() * 256);
                return "rgb(" + r + "," + g + "," + b + ")";
            }

            for (var i = 0; i < 4; i++) {
                var j = Math.floor(Math.random() * aLength);
                var deg = Math.random() - 0.5;
                var x = 10 + i * 20;
                var y = 20 + Math.random() * 8;

                context.font = "bold 23px noto-cjk";

                context.translate(x, y);
                context.rotate(deg);

                context.fillStyle = randomColor();
                context.fillText( aCode[j], 0, 0);

                context.rotate(-deg);
                context.translate(-x, -y);

                str[i] =  aCode[j].toLowerCase();
            }

            for (var i = 0; i <= 5; i++) {
                context.strokeStyle = randomColor();
                context.beginPath();
                context.moveTo(Math.random() * width, Math.random() * height);
                context.lineTo(Math.random() * width, Math.random() * height);
                context.stroke();
            }

            for (var i = 0; i <= 30; i++) { //验证码上显示小点
                context.strokeStyle = randomColor();
                context.beginPath();
                var x = Math.random() * width;
                var y = Math.random() * height;
                context.moveTo(x, y);
                context.lineTo(x + 1, y + 1);
                context.stroke();
            }

            ctx.session.captcha = str.join('');
            ctx.type = "png";
            ctx.status = 200;
            ctx.body = canvas.toBuffer('image/png');
        } else {
            await next();
        }
    }
}