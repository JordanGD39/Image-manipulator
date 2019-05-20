let imgOrig = document.getElementById('imgOrig');
const input = document.getElementById('input');
let fileList;
input.addEventListener("change", LoadFiles, false);
function draw(img)
{
  let canvas = document.getElementById('canvas');
  let context = canvas.getContext('2d');
  canvas.width = img.width;
  canvas.height = img.height;
  context.drawImage(img,0,0);
  let imgData = context.getImageData(0,0, canvas.width, canvas.height);
  let data = imgData.data;
  let invertFunction = function()
  {
    for (var i = 0; i < data.length; i += 4) {
      data[i] = 255 - data[i];
      data[i + 1] = 255 - data[i + 1];
      data[i + 2] = 255 - data[i + 2];
    }
    context.putImageData(imgData, 0,0);
  }
  let grayscaleFunction = function()
  {
    for (var i = 0; i < data.length; i += 4) {
      let avg = (data[i] + data[i+1] + data[i+2])/3;
      data[i] = avg;
      data[i + 1] = avg;
      data[i + 2] = avg;
    }
    context.putImageData(imgData, 0,0);
  }
  let noRedFunction = function()
  {
    for (var i = 0; i < data.length; i += 4) {
      data[i] = 0;
    }
    context.putImageData(imgData, 0,0);
  }
  let resetFunction = function()
  {
    let url = window.URL || window.webkitURL;
    let file = fileList[0];
    let imgSrc =  url.createObjectURL(file);
    LoadImage(imgSrc);
  }

  let invert = document.getElementById('invert');
  let grayscale = document.getElementById('grayscale');
  let reset = document.getElementById('reset');
  let noRed = document.getElementById('noRed');

  invert.addEventListener('click', invertFunction);
  grayscale.addEventListener('click', grayscaleFunction);
  reset.addEventListener('click', resetFunction);
  noRed.addEventListener('click', noRedFunction);
}

function LoadFiles()
{
  fileList = this.files;
  let file = fileList[0];
  let url = window.URL || window.webkitURL;
  let imgSrc =  url.createObjectURL(file);
  LoadImage(imgSrc);
}

function LoadImage(imgSrc)
{
  imgOrig.src = imgSrc;
  let img = new Image();
  img.src = imgSrc;
  img.onload = function() {
    draw(this);
  }
}
