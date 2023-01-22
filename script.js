// Author name: Jenson Gao and Fanchen Xing
// Description: the javascript code for implementing video, effects
//              and panel
const video = document.getElementById('video')
var landmarks, resizedDetections;
var trial1 = false;
var trial2 = false;
var trial3 = false;
var trial4 = false;
var trial5 = false;



Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('./models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
  faceapi.nets.faceExpressionNet.loadFromUri('./models')
]).then(startVideo)

function startVideo() {
  navigator.mediaDevices.getUserMedia({ video: true })
  .then((stream) => {
    video.srcObject = stream;
    video.onloadmetadata = () => {
        video.play()
    };
  })
  .catch((err) => {
    console.error(`${err.name}: ${err.message}`);
  });
}


video.addEventListener('play', () => {
  // match canvas to video
  const canvas = document.getElementById("myCanvas")
  const displaySize = { width: video.width, height: video.height }
  faceapi.matchDimensions(canvas, displaySize)
  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
    resizedDetections = faceapi.resizeResults(detections, displaySize)
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    landmarks = resizedDetections[0]['landmarks']._positions;

    // use ctx to draw effects
    var ctx = canvas.getContext("2d");
    draw(ctx)
  }, 100)
})

window.onload = function() {
  // create panel
  let temp = document.getElementById('control')
  let controlPanel = new ControlPanel()
  temp.appendChild(controlPanel.getPanel())
}

function draw(ctx) {
  // 0-16: chin 17-21: left eyebrow(from my computer)
  // 22-26: right eyebrow 27-35: nose (30 nose center)
  // 36-41: left eye (39 center right of eye)
  // 42-47: right eye (45 center left of eye)
  // 48-67 : mouth ( 48 mouth left,51 mouth center, 54 mouth right)

  // Cat face
  var img1 = new Image()
  img1.onload = function(){
    if (trial1) {
      let x_pos = landmarks[30]._x;
      let y_pos = landmarks[30]._y;
      let chin1_x = landmarks[1]._x
      let chin2_x = landmarks[15]._x
      let width = (chin2_x - chin1_x) * 2;
      let nose_y = landmarks[30]._y;
      let chin_under = landmarks[8]._y;
      let height = (chin_under - nose_y) * 3;
      ctx.drawImage(this, x_pos - (width)/2, y_pos- (height)/2, width, height)
    }
    
  }
  img1.src = "cat_mouth.png"

  var img4 = new Image()
  img4.onload = function() {
    if (trial1) {
      let eye_left_x = landmarks[39]._x
      let eye_left_y = landmarks[39]._y
      let eye_right_x = landmarks[45]._x
      let brow_left_x = landmarks[17]._x
      let brow_left_y = landmarks[17]._y
      let brow_right_x = landmarks[26]._x
      let brow_midleft_y = landmarks[21]._y

      let eye_gap = eye_right_x - eye_left_x;
      let brow_eye_gap = eye_left_y - brow_midleft_y;
      let x_pos = brow_left_x - eye_gap / 2;
      let y_pos = brow_left_y - 5 * brow_eye_gap
      let height = 6 * brow_eye_gap
      let width = (brow_right_x - brow_left_x) * 1.5;

      ctx.drawImage(this, x_pos, y_pos, width, height)
    }
  }
  img4.src = "cat_ears.png"


  // glasses
  var img2 = new Image()
    img2.onload = function() {
      if (trial2) {
        let eye_left_x = landmarks[39]._x
        let eye_left_y = landmarks[39]._y
        let eye_right_x = landmarks[45]._x
        let brow_left_x = landmarks[17]._x
        let brow_right_x = landmarks[26]._x
        let brow_midleft_y = landmarks[21]._y
        let nose2_y = landmarks[28]._y
      
        let height =  (nose2_y - brow_midleft_y) * 4
        let width = brow_right_x - brow_left_x
        let middle_x = (eye_left_x + eye_right_x) / 2
        let middle_y = eye_left_y

        ctx.drawImage(this, middle_x - (width+25)/2, middle_y - height/2, width + 5, height)
      }

    }
    img2.src = "glass.png"

    // Flowers
    var img3 = new Image()
    img3.onload = function() {
      if (trial3) {
        let x_pos = landmarks[30]._x;
        let y_pos = landmarks[30]._y;
        let chin1_x = landmarks[1]._x
        let chin2_x = landmarks[15]._x
        let width = chin2_x - chin1_x;
        let nose_y = landmarks[30]._y;
        let chin_under = landmarks[8]._y;
        let height = (chin_under - nose_y) * 2;
        ctx.drawImage(this, x_pos - (width)/2, y_pos- (height)/2, width, height)
      }
    }
    img3.src = "flowers.png"
    
    // Bunny
    var img5 = new Image()
    img5.onload = function() {
      if (trial4) {
        let x_pos = landmarks[51]._x;
        let y_pos = landmarks[51]._y;
        let chin1_x = landmarks[1]._x
        let chin2_x = landmarks[15]._x
        let width = chin2_x - chin1_x;
        let nose_y = landmarks[30]._y;
        let chin_under = landmarks[8]._y;
        let height = chin_under - nose_y;
        ctx.drawImage(this, x_pos - (20 + width)/2, y_pos- (80+height)/2, width + 20, height + 40)
      }
    }
    img5.src = "bunny_mouth.png"

    var img6 = new Image()
    img6.onload = function() {
      if (trial4) {
        let eye_left_x = landmarks[39]._x
        let eye_left_y = landmarks[39]._y
        let eye_right_x = landmarks[45]._x
        let brow_left_x = landmarks[17]._x
        let brow_left_y = landmarks[17]._y
        let brow_right_x = landmarks[26]._x
        let brow_midleft_y = landmarks[21]._y

        let eye_gap = eye_right_x - eye_left_x;
        let brow_eye_gap = eye_left_y - brow_midleft_y;
        let x_pos = brow_left_x - eye_gap / 2;
        let y_pos = brow_left_y - 9 * brow_eye_gap
        let height = 10 * brow_eye_gap
        let width = (brow_right_x - brow_left_x) * 1.5;

      ctx.drawImage(this, x_pos, y_pos, width, height)
      }
    }
    img6.src = "bunny_ears.png"

    // api default line connecting
    var canvas = document.getElementById("myCanvas")
    if (trial5) {
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
    }
    
}

class ControlPanel {
  constructor() {
      this._panel = document.createElement("div");
      this._panel.align_items = "center";
      this._panel.style = "margin-top: 4px; margin-bottom: 4px; border-style: solid; border-color: yellowgreen; border-width: 1px; position: absolute; top: 645px; left: 245px";

      this._catButton = document.createElement("input");
      this._catButton.style.background = "#5E9100";
      this._catButton.style.color = "white";
      this._catButton.setAttribute("type", "button");
      this._catButton.setAttribute("value", "Cat face");
      this._panel.appendChild(this._catButton);

      this._glassButton = document.createElement("input")
      this._glassButton.style.background = "#5E9100";
      this._glassButton.style.color = "white";
      this._glassButton.setAttribute("type", "button")
      this._glassButton.setAttribute("value", "Glasses")
      this._panel.appendChild(this._glassButton)

      this._flowerButton = document.createElement("input")
      this._flowerButton.style.background = "#5E9100";
      this._flowerButton.style.color = "white";
      this._flowerButton.setAttribute("type", "button")
      this._flowerButton.setAttribute("value", "Flowers")
      this._panel.appendChild(this._flowerButton)

      this._bunnyButton = document.createElement("input")
      this._bunnyButton.style.background = "#5E9100";
      this._bunnyButton.style.color = "white";
      this._bunnyButton.setAttribute("type", "button")
      this._bunnyButton.setAttribute("value", "Bunny")
      this._panel.appendChild(this._bunnyButton)

      this._lineButton = document.createElement("input")
      this._lineButton.style.background = "#5E9100";
      this._lineButton.style.color = "white";
      this._lineButton.setAttribute("type", "button")
      this._lineButton.setAttribute("value", "Lines")
      this._panel.appendChild(this._lineButton)

      this._photoButton = document.createElement("input")
      this._photoButton.style.background = "beige";
      this._photoButton.style.color = "#5E9100";
      this._photoButton.setAttribute("type", "button")
      this._photoButton.setAttribute("value", "Snap")
      this._panel.appendChild(this._photoButton)
      
      this._saveButton = document.createElement("input")
      this._saveButton.style.background = "beige";
      this._saveButton.style.color = "#5E9100";
      this._saveButton.setAttribute("type", "button")
      this._saveButton.setAttribute("value", "Save")
      this._panel.appendChild(this._saveButton)

      this._catButton.onclick = this._actionPerfromed.bind(this);
      this._glassButton.onclick = this._actionPerfromed.bind(this)
      this._flowerButton.onclick = this._actionPerfromed.bind(this)
      this._bunnyButton.onclick = this._actionPerfromed.bind(this)
      this._lineButton.onclick = this._actionPerfromed.bind(this)
      this._photoButton.onclick = this._actionPerfromed.bind(this)
      this._saveButton.onclick = this._actionPerfromed.bind(this)
  }
  
  _actionPerfromed(e) {
    if (e.target == this._photoButton) {
      var video = document.getElementById("video")
      var picture = document.getElementById("picture")
      var ctx = picture.getContext("2d")

      ctx.drawImage(video, 0, 0, 640, 480);
      draw(ctx)

    } else if (e.target == this._saveButton) {
      var picture = document.getElementById("picture")
      var dataURL = picture.toDataURL("image/png");
      var newTab = window.open(picture.toDataURL('image/png'));
      newTab.document.write("<img src='" + dataURL + "' alt='from canvas'/>");
    }

    if (e.target == this._catButton) {
      if (trial1) {
        trial1 = false
      } else {
        trial1 = true
      }
    } else if (e.target == this._glassButton) {
      if (trial2) {
        trial2 = false
      } else {
        trial2 = true
      }
    } else if (e.target == this._flowerButton) {
      if (trial3) {
        trial3 = false
      } else {
        trial3 = true
      }
    } else if (e.target == this._bunnyButton) {
      if (trial4) {
        trial4 = false
      } else {
        trial4 = true
      }
    } else if (e.target == this._lineButton) {
      if (trial5) {
        trial5 = false
      } else {
        trial5 = true;
      }
    }
  }

  getPanel() {
    return this._panel;
  }
}

