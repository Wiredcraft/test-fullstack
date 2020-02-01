
class Talks {
  paint(ctx, geom, properties) {
    ctx.width = geom.width;
    ctx.fillStyle = "#dedede";    
    // ctx.scale(2, 2);
    for(let x = 0; x < geom.width / 20; x++){
      for(let y = 0; y < geom.height / 20; y++){
        ctx.save();
        ctx.beginPath();
        ctx.arc( 50 * x, 50 * y, 10, 0, 2*Math.PI);
        ctx.moveTo(50 * x - 6, 50 * y - 6);
        ctx.lineTo(50 * x , 50 * y + 10);
        ctx.lineTo(50 * x - 6, 50 * y + 30);
        ctx.lineTo(50 * x - 18, 50 * y + 30);
        ctx.lineTo(50 * x - 6, 50 * y - 6);
        ctx.fill();
        ctx.closePath();
        ctx.restore();
      }
      
    }
    
  }
}

class Talk {
  paint(ctx, geom, properties) {
    ctx.width = geom.width;
    ctx.fillStyle = "#000000";    
    ctx.save();
    ctx.beginPath();
    ctx.arc( 20, 20, 10, 0, 2*Math.PI);
    ctx.moveTo(20 - 6, 20 - 6);
    ctx.lineTo(20 , 20 + 10);
    ctx.lineTo(20 - 6, 20 + 30);
    ctx.lineTo(20 - 18, 20 + 30);
    ctx.lineTo(20 - 6, 20 - 6);
    ctx.fill();
    ctx.closePath();
    ctx.restore();
    
  }
}

registerPaint('Talks', Talks);
registerPaint('Talk', Talk);