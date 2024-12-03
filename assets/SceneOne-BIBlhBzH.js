var p=Object.defineProperty;var w=(n,e,s)=>e in n?p(n,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):n[e]=s;var t=(n,e,s)=>w(n,typeof e!="symbol"?e+"":e,s);import{C as g,O as u,A as v,S as x,P,W as _,D as f,_ as k}from"./_plugin-vue_export-helper-DaHlF_CF.js";import{G as y}from"./GLTFLoader-BCqFetf4.js";import{d as z,r as S,o as C,a as c,c as d,b as o,F as H,e as L,n as D,f as h}from"./index-BOpLQiOP.js";class R{constructor(e){t(this,"mesh");t(this,"loader");t(this,"clock",new g);t(this,"animation");t(this,"mixer",null);t(this,"width");this.loader=new y,this.mesh=new u,this.width=e}tick(e){if(this.mixer){const s=this.clock.getDelta();this.mixer.update(s)}this.moveHole(e)}async loadMesh(){const e=await this.loader.loadAsync("/spaceportfolio/models/dark/scene.gltf");this.mesh=e.scene,this.animation=e.animations,this.mesh.scale.set(3,3,3),this.mesh.position.y=1,this.width<900&&(this.mesh.scale.set(2,2,2),this.mesh.position.y=1.5),e.animations.length>0&&(this.mixer=new v(this.mesh),this.mixer.clipAction(e.animations[0]).play())}moveHole(e){const s=e/this.width*2-1;this.mesh.rotation.z=s/20}}class b{constructor(e){t(this,"scene");t(this,"renderer");t(this,"camera");t(this,"meshs");t(this,"mouseXPos");t(this,"mouseYPos");t(this,"scrollProgress");t(this,"height");t(this,"ref");t(this,"cameraSteps");t(this,"segmentProgress");t(this,"pixelRatio");this.cameraSteps=[{x:14,y:5,z:0},{x:0,y:1,z:5},{x:-15,y:1,z:10},{x:-5,y:-20,z:5}],this.scrollProgress=0,this.segmentProgress=0,this.ref=e;const{width:s,height:i}=e.getBoundingClientRect();this.height=i,this.meshs=[],this.scene=new x,this.mouseXPos=0,this.mouseYPos=0,this.camera=new P(45,s/i),this.camera.position.set(14,5,0),this.camera.lookAt(0,3,0),this.pixelRatio=s<900?Math.min(window.devicePixelRatio,1.5):window.devicePixelRatio,this.renderer=new _({antialias:s>900,powerPreference:"low-power"}),this.renderer.setClearColor(0,0),this.renderer.setPixelRatio(this.pixelRatio);const r=window.devicePixelRatio>1;this.renderer.setSize(s,i,r);const a=new f(16711680,3);a.position.set(0,1,-5).normalize(),this.scene.add(a),e.appendChild(this.renderer.domElement);const m=new CustomEvent("loading",{detail:!1}),l=new R(s);(async()=>{await l.loadMesh(),this.meshs.push(l),this.addChildren(),this.setView(),this.registerEventListeners(),window.dispatchEvent(m),this.tick()})()}tick(){this.renderer.render(this.scene,this.camera),this.tickChildren(),this.scrollHole(),requestAnimationFrame(()=>{this.tick()})}addChildren(){for(let e=0;e<this.meshs.length;e++)this.scene.add(this.meshs[e].mesh)}tickChildren(){for(let e=0;e<this.meshs.length;e++)this.meshs[e].tick(this.mouseYPos)}setView(){this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(window.innerWidth,window.innerHeight)}registerEventListeners(){window.onresize=()=>{this.setView()},window.addEventListener("mousemove",e=>{this.mouseXPos=e.clientX,this.mouseYPos=e.clientY}),window.addEventListener("scroll",()=>{const e=this.height*4-window.innerHeight;this.scrollProgress=window.scrollY/e,this.segmentProgress=this.scrollProgress*(this.cameraSteps.length-1)})}scrollHole(){const e=Math.floor(this.segmentProgress),s=this.segmentProgress-e;if(e>=this.cameraSteps.length-1)return;const i=this.cameraSteps[e],r=this.cameraSteps[e+1];this.camera.position.x=this.lerp(i.x,r.x,s),this.camera.position.y=this.lerp(i.y,r.y,s),this.camera.position.z=this.lerp(i.z,r.z,s),this.camera.lookAt(0,3,0)}lerp(e,s,i){return e+(s-e)*i}}const A={class:"Home"},E={class:"Title"},B=z({__name:"SceneOne",setup(n){const e=S();return C(()=>{new b(e.value)}),(s,i)=>(c(),d("section",A,[o("div",{ref_key:"scene",ref:e,class:"Scene"},null,512),o("div",E,[(c(),d(H,null,L(5,(r,a)=>o("h1",{key:a,style:D({opacity:`${1-a/5}`}),class:"Title__text"}," Acker'Prod ",4)),64))]),i[0]||(i[0]=o("div",{class:"Developer"},[o("h1",{class:"Developer__title"},[h(" French "),o("br"),h(" Developer ")])],-1)),i[1]||(i[1]=o("div",{class:"Developer__clone"},[o("h1",{class:"Developer__title__clone"},[h(" French "),o("br"),h(" Developer ")])],-1))]))}}),T=k(B,[["__scopeId","data-v-7b23edac"]]);export{T as default};
