let poseNet;
let poses = [];
let poses2 = [];
let video;
let video2;
var videoIsPlaying; 

function setup() {
  videoIsPlaying = false; 
  createCanvas(640, 640);
  video = createVideo('data/vid3.mp4', vidLoad);
  video.size(width, height);
//   video.hide()
//   createCanvas(640, 640);
  video2 = createVideo('data/vid4.mp4', vidLoad); //0.31523674333364265
  // video2 = createVideo('data/revvid.mp4', vidLoad); //0.36494506158098433
  video2.size(width, height);
//   video2.hide();
//   Video1
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on('pose', function(results) {
    poses = results;
    // console.log("Video1",poses[0])
  });
// Video2

    poseNet2 = ml5.poseNet(video2, modelReady);
  poseNet2.on('pose', function(results2) {
    poses2 = results2;
    // console.log("Video2",poses2[0])
  });
}

function modelReady() {
  select('#status').html('Model Loaded');
}

function mousePressed(){
  vidLoad();
}

function draw() {
  image(video, 0, 0, width, height);

  drawKeypoints();
  drawSkeleton();

  image(video2, 0, 0, width, height);
  drawKeypoints2();
  drawSkeleton2();
cosineCompute();
}

function cosineCompute(){
    // console.log(poses)
    let p1 = poses;
    let p2 = poses2;
    let p1_array = [];
    let p2_array = [];
    if ((p1.length >0) && (p2.length >0)){
        // console.log(p1[0].pose.keypoints);
        let temp = p1[0].pose.keypoints;
        let temp2 = p2[0].pose.keypoints;
        let x = [];
        let y = [];
        for (let i = 0; i < temp.length; i++) {
          // console.log(temp[i])
            x.push(temp[i].position.x); y.push(temp[i].position.y);
            x.push(temp2[i].position.x); y.push(temp2[i].position.y);
    }
    let cosine_similarity = similarity(x,y);
    console.log(Math.sqrt( 2* (1-cosine_similarity) ));
    // console.log(x.length,y.length);
    // console.log(x,y);
    // console.log();
    
}
    
}

// var hasOwnProperty = Object.prototype.hasOwnProperty

// function dot (a, b) {
//   var sum = 0
//   for (var key in a) {
//     if (hasOwnProperty.call(a, key) && hasOwnProperty.call(b, key)) {
//       sum += a[key] * b[key]
//     }
//   }
//   return sum
// }

// function similarity (a, b) {
//   var magA = Math.sqrt(dot(a, a))
//   var magB = Math.sqrt(dot(b, b))
//   // console.log(dot(a,b))
//   return dot(a, b) / (magA * magB)
// }


function similarity(A,B){
  var dotproduct=0;
  var mA=0;
  var mB=0;
  for(i = 0; i < A.length; i++){ // here you missed the i++
      dotproduct += (A[i] * B[i]);
      mA += (A[i]*A[i]);
      mB += (B[i]*B[i]);
  }
  mA = Math.sqrt(mA);
  mB = Math.sqrt(mB);
  var similarity = (dotproduct)/((mA)*(mB)) // here you needed extra brackets
  return similarity;
}

function drawKeypoints()  {
    // console.log(poses2)
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i].pose;
    for (let j = 0; j < pose.keypoints.length; j++) {
      let keypoint = pose.keypoints[j];
      if (keypoint.score > 0.2) {
      	noStroke();
        fill(255, 0, 0);
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      }
    }
  }

}

function drawKeypoints2(){

    for (let i = 0; i < poses2.length; i++) {
        let pose2 = poses2[i].pose;
        for (let j = 0; j < pose2.keypoints.length; j++) {
          let keypoint2 = pose2.keypoints[j];
          if (keypoint2.score > 0.2) {
              noStroke();
            fill(255, 0, 0);
            ellipse(keypoint2.position.x, keypoint2.position.y, 10, 10);
          }
        }
      }
    
    
}

// A function to draw the skeletons
function drawSkeleton() {
  // Loop through all the skeletons detected
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
    // For every skeleton, loop through all body connections
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      stroke(255, 0, 0);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}

function drawSkeleton2() {
  // Loop through all the skeletons detected
  for (let i = 0; i < poses2.length; i++) {
    let skeleton = poses2[i].skeleton;
    // For every skeleton, loop through all body connections
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      stroke(255, 0, 0);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}


// This function is called when the video loads
function vidLoad() {
  video.stop();
  video.loop();
  videoIsPlaying = true;
  video2.stop();
  video2.loop();
  videoIsPlaying = true;
}

function keyPressed(){
  if (videoIsPlaying) {
    video.pause();
    videoIsPlaying = false;
    video2.pause();
    videoIsPlaying = false;
  } else {
    video.loop();
    video2.loop();
    videoIsPlaying = true;
  }
}