;(function(){
// Your message here (QUOTED STRING)
var msg = "我爱你直到永远";
// Set font's style size for calculating dimensions
// Set to number of desired pixels font size (decimal and negative numbers not allowed)
var size = 24;
// Set both to 1 for plain circle, set one of them to 2 for oval
// Other numbers & decimals can have interesting effects, keep these low (0 to 3)
var circleY = 0.75; var circleX = 2;
// The larger this divisor, the smaller the spaces between letters
// (decimals allowed, not negative numbers)
var letter_spacing = 5;
// The larger this multiplier, the bigger the circle/oval
// (decimals allowed, not negative numbers, some rounding is applied)
var diameter = 10;
// Rotation speed, set it negative if you want it to spin clockwise (decimals allowed)
var rotation = 0.4;
// This is not the rotation speed, its the reaction speed, keep low!
// Set this to 1 or a decimal less than one (decimals allowed, not negative numbers)
var speed = 0.3;
if (!window.addEventListener && !window.attachEvent || !document.createElement) return;
msg = msg.split('');
var n = msg.length - 1, a = Math.round(size * diameter * 0.208333), currStep = 20,
ymouse = a * circleY + 20, xmouse = a * circleX + 20, y = [], x = [], Y = [], X = [],
o = document.createElement('div'), oi = document.createElement('div'),
b = document.compatMode && document.compatMode != "BackCompat"? document.documentElement : document.body,
mouse = function(e){
 e = e || window.event;
 ymouse = !isNaN(e.pageY)? e.pageY : e.clientY; // y-position
 xmouse = !isNaN(e.pageX)? e.pageX : e.clientX; // x-position
},
makecircle = function(){ // rotation/positioning
 if(init.nopy){
  o.style.top = (b || document.body).scrollTop + 'px';
  o.style.left = (b || document.body).scrollLeft + 'px';
 };
 currStep -= rotation;
 for (var d, i = n; i > -1; --i){ // makes the circle
  d = document.getElementById('iemsg' + i).style;
  d.top = Math.round(y[i] + a * Math.sin((currStep + i) / letter_spacing) * circleY - 15) + 'px';
  d.left = Math.round(x[i] + a * Math.cos((currStep + i) / letter_spacing) * circleX) + 'px';
 };
},
drag = function(){ // makes the resistance
 y[0] = Y[0] += (ymouse - Y[0]) * speed;
 x[0] = X[0] += (xmouse - 20 - X[0]) * speed;
 for (var i = n; i > 0; --i){
  y[i] = Y[i] += (y[i-1] - Y[i]) * speed;
  x[i] = X[i] += (x[i-1] - X[i]) * speed;
 };
 makecircle();
},
init = function(){ // appends message divs, & sets initial values for positioning arrays
 if(!isNaN(window.pageYOffset)){
  ymouse += window.pageYOffset;
  xmouse += window.pageXOffset;
 } else init.nopy = true;
 for (var d, i = n; i > -1; --i){
  d = document.createElement('div'); d.id = 'iemsg' + i;
  d.style.height = d.style.width = a + 'px';
  d.appendChild(document.createTextNode(msg[i]));
  oi.appendChild(d); y[i] = x[i] = Y[i] = X[i] = 0;
 };
 o.appendChild(oi); document.body.appendChild(o);
 setInterval(drag, 25);
},
ascroll = function(){
 ymouse += window.pageYOffset;
 xmouse += window.pageXOffset;
 window.removeEventListener('scroll', ascroll, false);
};
o.id = 'outerCircleText'; o.style.fontSize = size + 'px';
if (window.addEventListener){
 window.addEventListener('load', init, false);
 document.addEventListener('mouseover', mouse, false);
 document.addEventListener('mousemove', mouse, false);
  if (/Apple/.test(navigator.vendor))
   window.addEventListener('scroll', ascroll, false);
}
else if (window.attachEvent){
 window.attachEvent('onload', init);
 document.attachEvent('onmousemove', mouse);
};
})();






/*Important Function to blend the tabs in and out*/
function blendoff(idname) {document.getElementById(idname).style.display = 'none';}
function blendon(idname) {document.getElementById(idname).style.display = 'block';}



 
/*Function for our Tabmenu with 4 Tabs*/
function swichtabs(wert) {
if (wert=='1'){
document.getElementById('tablink1').className='tab1 tabactive';
document.getElementById('tablink2').className='tab2';
document.getElementById('tablink3').className='tab3';
document.getElementById('tablink4').className='tab4';
}else if (wert=='2'){
document.getElementById('tablink1').className='tab1';
document.getElementById('tablink2').className='tab2 tabactive';
document.getElementById('tablink3').className='tab3';
document.getElementById('tablink4').className='tab4';
}else if (wert=='3'){
document.getElementById('tablink1').className='tab1';
document.getElementById('tablink2').className='tab2';
document.getElementById('tablink3').className='tab3 tabactive';
document.getElementById('tablink4').className='tab4';
} else if (wert=='4'){
document.getElementById('tablink1').className='tab1';
document.getElementById('tablink2').className='tab2';
document.getElementById('tablink3').className='tab3';
document.getElementById('tablink4').className='tab4 tabactive';
}
}







var rows=1; // must be an odd number
var speed=10; // lower is faster
var reveal=2; // between 0 and 2 only. The higher, the faster the word appears
var effectalign="default" //enter "center" to center it.
var w3c=document.getElementById && !window.opera;;
var ie45=document.all && !window.opera;
var ma_tab, matemp, ma_bod, ma_row, x, y, columns, ma_txt, ma_cho;
var m_coch=new Array();
var m_copo=new Array();
function matrix() {
if (!w3c && !ie45) return
var matrix=(w3c)?document.getElementById("matrix"):document.all["matrix"];
ma_txt=(w3c)?matrix.firstChild.nodeValue:matrix.innerHTML;
ma_txt=" "+ma_txt+" ";
columns=ma_txt.length;
if (w3c) {
while (matrix.childNodes.length) matrix.removeChild(matrix.childNodes[0]);
ma_tab=document.createElement("table");
ma_tab.setAttribute("border", 0);
ma_tab.setAttribute("align", effectalign);
ma_tab.style.backgroundColor="#000000";
ma_bod=document.createElement("tbody");
for (x=0; x<rows; x++) {
ma_row=document.createElement("tr");
for (y=0; y<columns; y++) {
matemp=document.createElement("td");
matemp.setAttribute("id", "Mx"+x+"y"+y);
matemp.className="matrix";
matemp.appendChild(document.createTextNode(String.fronCharCode(160)));
ma_row.appendChild(matemp);
}
ma_bod.appendChild(ma_row);
}
ma_tab.appendChild(ma_bod);
matrix.appendChild(ma_tab);
} else {
ma_tab='<ta'+'ble align="'+effectalign+'" border="0" style="background-color:#000000">';
for (var x=0; x<rows; x++) {
ma_tab+='<t'+'r>';
for (var y=0; y<columns; y++) {
ma_tab+='<t'+'d class="matrix" id="Mx'+x+'y'+y+'">&nbsp;</'+'td>';
}
ma_tab+='</'+'tr>';
}
ma_tab+='</'+'table>';
matrix.innerHTML=ma_tab;
}
ma_cho=ma_txt;
for (x=0; x<columns; x++) {
ma_cho+=String.fronCharCode(32+Math.floor(Math.random()*94));
m_copo[x]=0;
}
ma_bod=setInterval("mytricks()", speed);
}
 
function mytricks() {
x=0;
for (y=0; y<columns; y++) {
x=x+(m_copo[y]==100);
ma_row=m_copo[y]%100;
if (ma_row && m_copo[y]<100) {
if (ma_row<rows+1) {
if (w3c) {
matemp=document.getElementById("Mx"+(ma_row-1)+"y"+y);
matemp.firstChild.nodeValue=m_coch[y];
}
else {
matemp=document.all["Mx"+(ma_row-1)+"y"+y];
matemp.innerHTML=m_coch[y];
}
matemp.style.color="#FF0000";
matemp.style.fontWeight="bold";
}
if (ma_row>1 && ma_row<rows+2) {
matemp=(w3c)?document.getElementById("Mx"+(ma_row-2)+"y"+y):document.all["Mx"+(ma_row-2)+"y"+y];
matemp.style.fontWeight="normal";
matemp.style.color="#FF0000";
}
if (ma_row>2) {
matemp=(w3c)?document.getElementById("Mx"+(ma_row-3)+"y"+y):document.all["Mx"+(ma_row-3)+"y"+y];
matemp.style.color="#FF0000";
}
if (ma_row<Math.floor(rows/2)+1) m_copo[y]++;
else if (ma_row==Math.floor(rows/2)+1 && m_coch[y]==ma_txt.charAt(y)) zoomer(y);
else if (ma_row<rows+2) m_copo[y]++;
else if (m_copo[y]<100) m_copo[y]=0;
}
else if (Math.random()>0.9 && m_copo[y]<100) {
m_coch[y]=ma_cho.charAt(Math.floor(Math.random()*ma_cho.length));
m_copo[y]++;
}
}
if (x==columns) clearInterval(ma_bod);
}
function zoomer(ycol) {
var mtmp, mtem, ytmp;
if (m_copo[ycol]==Math.floor(rows/2)+1) {
for (ytmp=0; ytmp<rows; ytmp++) {
if (w3c) {
mtmp=document.getElementById("Mx"+ytmp+"y"+ycol);
mtmp.firstChild.nodeValue=m_coch[ycol];
}
else {
mtmp=document.all["Mx"+ytmp+"y"+ycol];
mtmp.innerHTML=m_coch[ycol];
}
mtmp.style.color="#FF0000";
mtmp.style.fontWeight="bold";
}
if (Math.random()<reveal) {
mtmp=ma_cho.indexOf(ma_txt.charAt(ycol));
ma_cho=ma_cho.substring(0, mtmp)+ma_cho.substring(mtmp+1, ma_cho.length);
}
if (Math.random()<reveal-1) ma_cho=ma_cho.substring(0, ma_cho.length-1);
m_copo[ycol]+=199;
setTimeout("zoomer("+ycol+")", speed);
}
else if (m_copo[ycol]>200) {
if (w3c) {
mtmp=document.getElementById("Mx"+(m_copo[ycol]-201)+"y"+ycol);
mtem=document.getElementById("Mx"+(200+rows-m_copo[ycol]--)+"y"+ycol);
}
else {
mtmp=document.all["Mx"+(m_copo[ycol]-201)+"y"+ycol];
mtem=document.all["Mx"+(200+rows-m_copo[ycol]--)+"y"+ycol];
}
mtmp.style.fontWeight="normal";
mtem.style.fontWeight="normal";
setTimeout("zoomer("+ycol+")", speed);
}
else if (m_copo[ycol]==200) m_copo[ycol]=100+Math.floor(rows/2);
if (m_copo[ycol]>100 && m_copo[ycol]<200) {
if (w3c) {
mtmp=document.getElementById("Mx"+(m_copo[ycol]-101)+"y"+ycol);
mtmp.firstChild.nodeValue=String.fronCharCode(160);
mtem=document.getElementById("Mx"+(100+rows-m_copo[ycol]--)+"y"+ycol);
mtem.firstChild.nodeValue=String.fronCharCode(160);
}
else {
mtmp=document.all["Mx"+(m_copo[ycol]-101)+"y"+ycol];
mtmp.innerHTML=String.fronCharCode(160);
mtem=document.all["Mx"+(100+rows-m_copo[ycol]--)+"y"+ycol];
mtem.innerHTML=String.fronCharCode(160);
}
setTimeout("zoomer("+ycol+")", speed);
}
}
// --> 
setTimeout('matrix()', 1);
col=0;
function fadein()
{
document.getElementById("fade1").style.color="rgb(" + col + ",0,0)";
document.getElementById("fade2").style.color="rgb(" + col + ",0,0)";
document.getElementById("fade3").style.color="rgb(" + col + ",0,0)";
document.getElementById("fade4").style.color="rgb(" + col + ",0,0)";
document.getElementById("fade5").style.color="rgb(" + col + ",0,0)";
document.getElementById("fade6").style.color="rgb(" + col + ",0,0)";
col+=5;
if(col<255) setTimeout('fadein()', 1);
if(col==255) setTimeout('fadeout()', 1);
}
function fadeout()
{
document.getElementById("fade1").style.color="rgb(" + col + ",0,0)";
document.getElementById("fade2").style.color="rgb(" + col + ",0,0)";
document.getElementById("fade3").style.color="rgb(" + col + ",0,0)";
document.getElementById("fade4").style.color="rgb(" + col + ",0,0)";
document.getElementById("fade5").style.color="rgb(" + col + ",0,0)";
document.getElementById("fade6").style.color="rgb(" + col + ",0,0)";
col-=5;
if(col>0) setTimeout('fadeout()', 1);
if(col==0) setTimeout('fadein()', 1);
}
setTimeout('fadein()', 1);



function disableselect(e){
return false
}
function reEnable(){
return true
}
document.onselectstart=new Function ("return false")
if (window.sidebar){
document.onmousedown=disableselect
document.onclick=reEnable
}