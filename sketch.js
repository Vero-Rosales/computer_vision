// Classifier Variable
let classifier;
// Model URL
let imageModelURL = "https://teachablemachine.withgoogle.com/models/Q9hsxV7KY/";

// Video
let video;
let flippedVideo;
// To store the classification
let label = "";
let confianza = 0;

// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + "model.json");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Create the video
  video = createCapture(VIDEO);
  video.size(windowWidth, windowHeight);
  video.hide();

  // flippedVideo = ml5.flipImage(video);
  // Start classifying
  classifyVideo();
}

function draw() {
  background(0);
  // Draw the video
  image(video, 0, 0);
  // Draw the label
  //fill(255);
  //textSize(16);
  //textAlign(CENTER);
  //text(label, width / 2, height - 4);
  //textSize(8);
  //textAlign(LEFT);
  //text(confianza, 10, height - 4);

  if (label == "lentes") {
    filter(INVERT);
    fill(255);
    textSize(80);
    textAlign(CENTER);
    text("Harry Potter", width / 2, height / 2);
  }

  if (label == "audífonos") {
    background(255, 0, 255);
    fill(255);
    textSize(80);
    textAlign(CENTER);
    text("DJ", width / 2, height / 2);
  }
}

// Get a prediction for the current video frame
function classifyVideo() {
  classifier.classify(video, gotResult);
}

// When we get a result
function gotResult(results, error) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  label = results[0].label;
  confianza = results[0].confidence;
  // Classifiy again!
  classifyVideo();
}
