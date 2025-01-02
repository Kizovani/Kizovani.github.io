import"./main-Ch_IRwmz.js";var o={keys:[],mouse:{left:!1,right:!1,middle:!1,x:0,y:0}};for(var p=0;p<230;p++)o.keys.push(!1);document.addEventListener("keydown",function(l){o.keys[l.keyCode]=!0});document.addEventListener("keyup",function(l){o.keys[l.keyCode]=!1});document.addEventListener("mousedown",function(l){(l.button=0)&&(o.mouse.left=!0),(l.button=1)&&(o.mouse.middle=!0),(l.button=2)&&(o.mouse.right=!0)});document.addEventListener("mouseup",function(l){(l.button=0)&&(o.mouse.left=!1),(l.button=1)&&(o.mouse.middle=!1),(l.button=2)&&(o.mouse.right=!1)});document.addEventListener("mousemove",function(l){o.mouse.x=l.clientX,o.mouse.y=l.clientY});var g=document.getElementById("background-canvas");document.body.appendChild(g);g.width=window.innerWidth;g.height=window.innerHeight;var f=g.getContext("2d");class d{constructor(h,e,s,n,i){this.isSegment=!0,this.parent=h,typeof h.children=="object"&&h.children.push(this),this.children=[],this.size=e,this.relAngle=s,this.defAngle=s,this.absAngle=h.absAngle+s,this.range=n,this.stiffness=i,this.updateRelative(!1,!0)}updateRelative(h,e){if(this.relAngle=this.relAngle-2*Math.PI*Math.floor((this.relAngle-this.defAngle)/2/Math.PI+1/2),e&&(this.relAngle=Math.min(this.defAngle+this.range/2,Math.max(this.defAngle-this.range/2,(this.relAngle-this.defAngle)/this.stiffness+this.defAngle))),this.absAngle=this.parent.absAngle+this.relAngle,this.x=this.parent.x+Math.cos(this.absAngle)*this.size,this.y=this.parent.y+Math.sin(this.absAngle)*this.size,h)for(var s=0;s<this.children.length;s++)this.children[s].updateRelative(h,e)}draw(h){if(f.beginPath(),f.moveTo(this.parent.x,this.parent.y),f.lineTo(this.x,this.y),f.stroke(),h)for(var e=0;e<this.children.length;e++)this.children[e].draw(!0)}follow(h){var e=this.parent.x,s=this.parent.y,n=((this.x-e)**2+(this.y-s)**2)**.5;if(this.x=e+this.size*(this.x-e)/n,this.y=s+this.size*(this.y-s)/n,this.absAngle=Math.atan2(this.y-s,this.x-e),this.relAngle=this.absAngle-this.parent.absAngle,this.updateRelative(!1,!0),h)for(var i=0;i<this.children.length;i++)this.children[i].follow(!0)}}class m{constructor(h,e,s,n){this.end=h,this.length=Math.max(1,e),this.creature=n,this.speed=s,n.systems.push(this),this.nodes=[];for(var i=h,t=0;t<e;t++)if(this.nodes.unshift(i),i=i.parent,!i.isSegment){this.length=t+1;break}this.hip=this.nodes[0].parent}moveTo(h,e){this.nodes[0].updateRelative(!0,!0);for(var s=((h-this.end.x)**2+(e-this.end.y)**2)**.5,n=Math.max(0,s-this.speed),i=this.nodes.length-1;i>=0;i--){var t=this.nodes[i],a=Math.atan2(t.y-e,t.x-h);t.x=h+n*Math.cos(a),t.y=e+n*Math.sin(a),h=t.x,e=t.y,n=t.size}for(var i=0;i<this.nodes.length;i++){var t=this.nodes[i];t.absAngle=Math.atan2(t.y-t.parent.y,t.x-t.parent.x),t.relAngle=t.absAngle-t.parent.absAngle;for(var r=0;r<t.children.length;r++){var c=t.children[r];this.nodes.includes(c)||c.updateRelative(!0,!1)}}}update(){this.moveTo(o.mouse.x,o.mouse.y)}}class M extends m{constructor(h,e,s,n){super(h,e,s,n),this.goalX=h.x,this.goalY=h.y,this.step=0,this.forwardness=0,this.reach=.9*((this.end.x-this.hip.x)**2+(this.end.y-this.hip.y)**2)**.5;var i=this.creature.absAngle-Math.atan2(this.end.y-this.hip.y,this.end.x-this.hip.x);i-=2*Math.PI*Math.floor(i/2/Math.PI+1/2),this.swing=-i+(2*(i<0)-1)*Math.PI/2,this.swingOffset=this.creature.absAngle-this.hip.absAngle}update(h,e){if(this.moveTo(this.goalX,this.goalY),this.step==0){var s=((this.end.x-this.goalX)**2+(this.end.y-this.goalY)**2)**.5;s>1&&(this.step=1,this.goalX=this.hip.x+this.reach*Math.cos(this.swing+this.hip.absAngle+this.swingOffset)+(2*Math.random()-1)*this.reach/2,this.goalY=this.hip.y+this.reach*Math.sin(this.swing+this.hip.absAngle+this.swingOffset)+(2*Math.random()-1)*this.reach/2)}else if(this.step==1){var n=Math.atan2(this.end.y-this.hip.y,this.end.x-this.hip.x)-this.hip.absAngle,s=((this.end.x-this.hip.x)**2+(this.end.y-this.hip.y)**2)**.5,i=s*Math.cos(n),t=this.forwardness-i;this.forwardness=i,t*t<1&&(this.step=0,this.goalX=this.hip.x+(this.end.x-this.hip.x),this.goalY=this.hip.y+(this.end.y-this.hip.y))}}}class w{constructor(h,e,s,n,i,t,a,r,c,v,y){this.x=h,this.y=e,this.absAngle=s,this.fSpeed=0,this.fAccel=n,this.fFric=i,this.fRes=t,this.fThresh=a,this.rSpeed=0,this.rAccel=r,this.rFric=c,this.rRes=v,this.rThresh=y,this.children=[],this.systems=[]}follow(h,e){var s=((this.x-h)**2+(this.y-e)**2)**.5,n=Math.atan2(e-this.y,h-this.x),i=this.fAccel;if(this.systems.length>0){for(var t=0,a=0;a<this.systems.length;a++)t+=this.systems[a].step==0;i*=t/this.systems.length}this.fSpeed+=i*(s>this.fThresh),this.fSpeed*=1-this.fRes,this.speed=Math.max(0,this.fSpeed-this.fFric);var r=this.absAngle-n;r-=2*Math.PI*Math.floor(r/(2*Math.PI)+1/2),Math.abs(r)>this.rThresh&&s>this.fThresh&&(this.rSpeed-=this.rAccel*(2*(r>0)-1)),this.rSpeed*=1-this.rRes,Math.abs(this.rSpeed)>this.rFric?this.rSpeed-=this.rFric*(2*(this.rSpeed>0)-1):this.rSpeed=0,this.absAngle+=this.rSpeed,this.absAngle-=2*Math.PI*Math.floor(this.absAngle/(2*Math.PI)+1/2),this.x+=this.speed*Math.cos(this.absAngle),this.y+=this.speed*Math.sin(this.absAngle),this.absAngle+=Math.PI;for(var a=0;a<this.children.length;a++)this.children[a].follow(!0,!0);for(var a=0;a<this.systems.length;a++)this.systems[a].update(h,e);this.absAngle-=Math.PI,this.draw(!0)}draw(h){var e=4;if(f.beginPath(),f.arc(this.x,this.y,e,Math.PI/4+this.absAngle,7*Math.PI/4+this.absAngle),f.moveTo(this.x+e*Math.cos(7*Math.PI/4+this.absAngle),this.y+e*Math.sin(7*Math.PI/4+this.absAngle)),f.lineTo(this.x+e*Math.cos(this.absAngle)*2**.5,this.y+e*Math.sin(this.absAngle)*2**.5),f.lineTo(this.x+e*Math.cos(Math.PI/4+this.absAngle),this.y+e*Math.sin(Math.PI/4+this.absAngle)),f.stroke(),h)for(var s=0;s<this.children.length;s++)this.children[s].draw(!0)}}var u;function A(l,h,e){var s=l;u=new w(window.innerWidth/2,window.innerHeight/2,0,s*10,s*2,.5,16,.5,.085,.5,.3);for(var n=u,i=0;i<6;i++){n=new d(n,s*4,0,3.1415*2/3,1.1);for(var t=-1;t<=1;t+=2)for(var a=new d(n,s*3,t,.1,2),r=0;r<3;r++)a=new d(a,s*.1,-t*.1,.1,2)}for(var i=0;i<h;i++){if(i>0)for(var t=0;t<6;t++){n=new d(n,s*4,0,1.571,1.5);for(var r=-1;r<=1;r+=2)for(var a=new d(n,s*3,r*1.571,.1,1.5),c=0;c<3;c++)a=new d(a,s*3,-r*.3,.1,2)}for(var t=-1;t<=1;t+=2){var a=new d(n,s*12,t*.785,0,8);a=new d(a,s*16,-t*.785,6.28,1),a=new d(a,s*16,t*1.571,3.1415,2);for(var r=0;r<4;r++)new d(a,s*4,(r/3-.5)*1.571,.1,4);new M(a,3,s*12,u,4)}}for(var i=0;i<e;i++){n=new d(n,s*4,0,3.1415*2/3,1.1);for(var t=-1;t<=1;t+=2)for(var a=new d(n,s*3,t,.1,2),r=0;r<3;r++)a=new d(a,s*3*(e-i)/e,-t*.1,.1,2)}setInterval(function(){f.clearRect(0,0,g.width,g.height),u.follow(o.mouse.x,o.mouse.y)},33)}g.style.backgroundColor="black";f.strokeStyle="white";window.addEventListener("load",function(){var l=Math.floor(1+Math.random()*14);A(8/Math.sqrt(l),l,Math.floor(4+Math.random()*l*8))});window.addEventListener("resize",function(){g.width=window.innerWidth,g.height=window.innerHeight});
