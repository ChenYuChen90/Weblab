var canvas;
var ctx;

var for_DrawingPos;
var Using_pen = false;
var Using_circle = false;
var Using_rect = false;
var Using_tri = false;

var brush_type;
var f_selector;
var text_size;
var text_family;
var tool_now;

var ImageLoader;
var hasInput;

var canvas_history = [];
var step = -1;

// run 
window.onload = () => {
    init();
    runListener();
    push();
}
// init
function init(){
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    ImageLoader = document.getElementById('ImageLoader')
    ctx.lineWidth = 10;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    brush_type = 'default';
    hasInput = false;
    text_size = 12;
    f_selector = document.getElementById('font_family');
    f_selector.style = 'font-family: Cursive';
    text_family = 'Cursive';
}
/////////////////////////////////////////////////////////////////////////////////////////////////
// function 
function brush_size(x){ 
  document.getElementById("slider_value").innerHTML = x + "px";
  ctx.lineWidth = x;
}
function pen_color(x){
  ctx.strokeStyle = x;
}

function change_tsize(x){
  text_size = x;
}
function change_tfamily(x){
  text_family = x;
  
  f_selector.style = 'font-family: ' +  x;
}

function refresh(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

const change_pen = () => {ctx.globalCompositeOperation = 'source-over'; tool_now = 'pen'; change_icon();}
const change_erase = () => {ctx.globalCompositeOperation = 'destination-out'; tool_now = 'eraser'; change_icon();}
const change_text = () => {ctx.globalCompositeOperation = 'source-over';tool_now = 'text'; change_icon();}
const change_cir = () => {ctx.globalCompositeOperation = 'source-over';tool_now = 'circle'; change_icon();}
const change_rect = () => {ctx.globalCompositeOperation = 'source-over';tool_now = 'rectangle'; change_icon();}
const change_tri = () => {ctx.globalCompositeOperation = 'source-over';tool_now = 'triangle'; change_icon();}
const do_undo = () => {ctx.globalCompositeOperation = 'source-over'; tool_now = 'undo'; undo();change_icon();}
const do_redo = () => {ctx.globalCompositeOperation = 'source-over'; tool_now = 'redo'; redo();change_icon();}
const change_upload = () => {tool_now = 'upload';change_icon();}
const change_download = () => {tool_now = 'download'; change_icon();}

const change_icon = () => {
  if(tool_now === 'pen') canvas.style.cursor = "url(./icon/pen.png), auto";
  else if (tool_now === 'eraser') canvas.style.cursor = "url(./icon/eraser.png), auto";
  else if (tool_now === 'text') canvas.style.cursor = "url(./icon/text.png), auto";
  else if (tool_now === 'circle') canvas.style.cursor = "url(./icon/circle.png), auto";
  else if (tool_now === 'triangle') canvas.style.cursor = "url(./icon/triangle.png), auto";
  else if (tool_now === 'rectangle') canvas.style.cursor = "url(./icon/rectangle.png), auto";
  else if (tool_now === 'undo') canvas.style.cursor = "url(./icon/undo.png), auto";
  else if (tool_now === 'redo') canvas.style.cursor = "url(./icon/redo.png), auto";
  else if (tool_now === 'upload') canvas.style.cursor = "url(./icon/upload.png), auto";
  else if (tool_now === 'download') canvas.style.cursor = "url(./icon/download.png), auto";
} 

const change_brush_type = () => {brush_type = document.getElementById('brush').value;}
///////////////////////////////////////////////////////////////////////////////////////////////
// for mouse active
function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
  };
}
function Drawing_pen(evt) {
  var mousePos = getMousePos(canvas, evt);
  ctx.lineTo(mousePos.x, mousePos.y);
  ctx.stroke();
}

var lastPoint;
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function Drawing_pen_mul(e){
  var mousePos = getMousePos(canvas, e);
  var w = ctx.lineWidth;
  ctx.moveTo(lastPoint.x - getRandomInt(0, 2*w), lastPoint.y - getRandomInt(0, 2*w));
  ctx.lineTo(mousePos.x - getRandomInt(0, 2*w), mousePos.y - getRandomInt(0, 2*w));
  ctx.stroke();
  
  ctx.moveTo(lastPoint.x, lastPoint.y);
  ctx.lineTo(mousePos.x, mousePos.y);
  ctx.stroke();
  
  ctx.moveTo(lastPoint.x + getRandomInt(0, 2*w), lastPoint.y + getRandomInt(0, 2*w));
  ctx.lineTo(mousePos.x + getRandomInt(0, 2*w), mousePos.y + getRandomInt(0, 2*w));
  ctx.stroke();
  
  lastPoint = getMousePos(canvas, e);
}

var timeout;
var density = 150;
var sprayX, sprayY;
function getRandomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

var points = [ ];
function Drawing_pen_nei(e){
  ctx.beginPath();
  ctx.moveTo(points[points.length - 2].x, points[points.length - 2].y);
  ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
  ctx.stroke();
  
  for (var i = 0, len = points.length; i < len; i++) {
    dx = points[i].x - points[points.length-1].x;
    dy = points[i].y - points[points.length-1].y;
    d = dx * dx + dy * dy;

    if (d < 1000) {
      ctx.beginPath();
      ctx.moveTo( points[points.length-1].x + (dx * 0.2), points[points.length-1].y + (dy * 0.2));
      ctx.lineTo( points[i].x - (dx * 0.2), points[i].y - (dy * 0.2));
      ctx.stroke();
    }
  }
}
/////////////////////////////////////////////////////////////////////////
function Drawing_circle(mousePos) {
  const diameter = Math.sqrt((mousePos.x - for_DrawingPos.x)*(mousePos.x - for_DrawingPos.x) + (mousePos.y - for_DrawingPos.y)*(mousePos.y - for_DrawingPos.y));
  var canvasPic = new Image();
  canvasPic.src = canvas_history[step];
  canvasPic.onload = ()=>{
    refresh();
    ctx.drawImage(canvasPic, 0, 0);
    ctx.beginPath();
    ctx.arc((for_DrawingPos.x + mousePos.x) / 2, (for_DrawingPos.y + mousePos.y) / 2, diameter / 2, 0, 2 * Math.PI);
    ctx.stroke();
  }
}
function Drawing_rectangle(mousePos){
  var x = for_DrawingPos.x;
  var y = for_DrawingPos.y;
  var w = mousePos.x - for_DrawingPos.x;
  var h = mousePos.y - for_DrawingPos.y;
  var canvasPic = new Image();
  canvasPic.src = canvas_history[step];
  canvasPic.onload = ()=>{
    refresh();
    ctx.drawImage(canvasPic, 0, 0);
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.stroke();
  }
}
function Drawing_triangle(mousePos){
  var canvasPic = new Image();
  canvasPic.src = canvas_history[step];
  canvasPic.onload = ()=>{
    refresh();
    ctx.drawImage(canvasPic, 0, 0);
    ctx.beginPath();
    ctx.moveTo(mousePos.x, mousePos.y);
    ctx.lineTo(for_DrawingPos.x, mousePos.y);
    ctx.lineTo((for_DrawingPos.x + mousePos.x) / 2, for_DrawingPos.y);
    ctx.lineTo(mousePos.x, mousePos.y);
    ctx.stroke();
  }
}
///////////////////////////////////////////////////////////////////////////////////
//Function to dynamically add an input box: 
function Textbox(x, y, e) {
  var input = document.createElement('input');
  input.type = 'text';
  input.style.position = 'fixed';
  input.style.left = (e.clientX - 4) + 'px';
  input.style.top = (e.clientY - 4) + 'px';

  input.onkeydown = handleEnter;
  document.body.appendChild(input);
  input.focus();
  hasInput = true;
}
//Key handler for input box:
function handleEnter(e) {
  var keyCode = e.keyCode;
  if (keyCode === 13) {
      drawText(this.value, parseInt(for_DrawingPos.x + 'px', 10), parseInt(for_DrawingPos.y + 'px', 10));
      document.body.removeChild(this);
      hasInput = false;
  }
}
//Draw the text onto canvas:
function drawText(txt, x, y) {
  ctx.textBaseline = 'top';
  ctx.textAlign = 'left';
  ctx.font = text_size + 'px ' + text_family;
  ctx.fillText(txt, x - 4, y - 4);
  push()
}
/////////////////////////////////////////////////////////
// upload image
function handleImage(e){
  change_upload();
  var reader = new FileReader();
  reader.onload = function(event){
    var img = new Image();
    img.onload = function(){
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img,0,0);
      push();
      ctx.lineWidth = document.getElementById('hi').value;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      brush_type = 'default';
    }
    img.src = event.target.result;
  }
  reader.readAsDataURL(e.target.files[0]);
}
// download image
function download_image(){
  change_download();
  var canvas = document.getElementById("canvas");
  image = canvas.toDataURL("image/png");
  var link = document.createElement('a');
  link.download = "image.png";
  link.href = image;
  link.click();
}
//////////////////////////////////////////////////////////////
// Un/Re-do
function push(){
  step++;
  if(step < canvas_history.length) canvas_history.length = step;
  canvas_history.push(canvas.toDataURL());
}

function undo(){
  if(step > 0){
    step--;
    var canvasPic = new Image();
    canvasPic.src = canvas_history[step];
    canvasPic.onload = function() {
      refresh();
      ctx.drawImage(canvasPic, 0, 0);
    }
  }
}

function redo(){
  if(step < canvas_history.length - 1){
    step++;
    var canvasPic = new Image();
    canvasPic.src = canvas_history[step];
    canvasPic.onload = ()=>{
      refresh();
      ctx.drawImage(canvasPic, 0, 0);
    }
  }
}
/////////////////////////////////////////////////////////////////////////////////////////////////
//listener
function runListener(){
    canvas.addEventListener('click', e => {
      if(tool_now === 'text' && hasInput == false){
        var mousePos = getMousePos(canvas, e);
        for_DrawingPos = getMousePos(canvas, e);
        Textbox(mousePos.x, mousePos.y, e);
      }
    });

    canvas.addEventListener('mousedown', function(evt) {
      if(tool_now === 'pen' || tool_now === 'eraser'){
        var mousePos = getMousePos(canvas, evt);
        ctx.beginPath();
        ctx.moveTo(mousePos.x, mousePos.y);
        evt.preventDefault();
        Using_pen = true;
        if(brush_type === 'multiple_strokes') lastPoint = getMousePos(canvas, evt);
        else if (brush_type === 'spray'){
          sprayX = mousePos.x;
          sprayY = mousePos.y;
          timeout = setTimeout(function draw(){
            for (var i = density; i--; ) {
              var angle = getRandomFloat(0, Math.PI*2);
              var radius = getRandomFloat(0, 20 * ctx.lineWidth);
              ctx.fillRect(
                sprayX + radius * Math.cos(angle),
                sprayY + radius * Math.sin(angle), 
                1, 1);
            }
            if (!timeout) return;
            timeout = setTimeout(draw, 50);
          }, 50);
        }
        else if (brush_type === 'neighbor'){
          points = [ ];
          points.push({x: mousePos.x, y : mousePos.y});
        }
      } else if (tool_now === 'circle'){
        for_DrawingPos = getMousePos(canvas, evt);
        evt.preventDefault();
        Using_circle = true;
      } else if (tool_now === 'rectangle'){
        for_DrawingPos = getMousePos(canvas, evt);
        evt.preventDefault();
        Using_rect = true;
      } else if (tool_now === 'triangle'){
        for_DrawingPos = getMousePos(canvas, evt);
        evt.preventDefault();
        Using_tri = true;
      }
    });
    canvas.addEventListener('mousemove', function(evt) {
      if(Using_pen === true){
        if(brush_type === 'default') Drawing_pen(evt);
        else if (brush_type === 'multiple_strokes') Drawing_pen_mul(evt);
        else if (brush_type === 'spray'){
          var mousePos = getMousePos(canvas, evt);
          sprayX = mousePos.x;
          sprayY = mousePos.y;
        } else if (brush_type === 'neighbor'){
          var mousePos = getMousePos(canvas, evt);
          points.push({x: mousePos.x, y : mousePos.y});
          Drawing_pen_nei(evt);
        }
      } else if (Using_circle === true){
        var mousePos = getMousePos(canvas, evt);
        Drawing_circle(mousePos);
      } else if (Using_rect === true){
        var mousePos = getMousePos(canvas, evt);
        Drawing_rectangle(mousePos);
      } else if (Using_tri === true){
        var mousePos = getMousePos(canvas, evt);
        Drawing_triangle(mousePos);
      }
    }, false);
    canvas.addEventListener('mouseup', function() {
      if(tool_now === 'pen' || tool_now === 'eraser'){
        canvas.removeEventListener('mousemove', Drawing_pen, false);
        Using_pen = false;
        if(brush_type === 'spray') clearTimeout(timeout);
        else if (brush_type === 'neighbor') points.length = 0;
        push();
      } else if (tool_now === 'circle'){
        canvas.removeEventListener('mousemove', Drawing_circle, false);
        Using_circle = false;
        push();
      } else if (tool_now === 'rectangle'){
        canvas.removeEventListener('mousemove', Drawing_rectangle, false);
        Using_rect = false;
        push();
      } else if (tool_now === 'triangle'){
        canvas.removeEventListener('mousemove', Drawing_triangle, false);
        Using_tri = false;
        push();
      }
        
    }, false);
    
    document.getElementById('reset').addEventListener('click', function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        step = -1;
        canvas_history.splice(0, canvas_history.length);
        canvas.width = 700;
        canvas.height = 500;
        ctx.lineCap = ctx.lineJoin = 'round';
        change_pen();
        push();
    }, false);

    ImageLoader.addEventListener('change', handleImage, false);
}