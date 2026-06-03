//
//
const version = "pre3"

let img;
let data;
let button;
let text_display;
let text_display_cooldown;
let render_scale = 0.25;
const text_display_max_cooldown = 300;

function preload() {
  img = loadImage("https://raw.githubusercontent.com/Charlie4014/Interactive-Anatomy/main/IMG_20260601_203749.png");

  data = loadJSON("data.json");
}

function setup() {
  data = Object.values(data);

  createCanvas(img.width * render_scale, img.height * render_scale);
  console.log(img);
  console.log(data);
  create_points();

  setup_text_displays();
}

function draw() {
  background(220);
  render_image(render_scale);

  text_display_cooldown -= 1;
  if (text_display_cooldown == 0) {
    text_display.hide();
    text_display.visible = false;
  }
}

function create_points() {
  button = [];
  for (let i = 0; i < data.length; i++) {
    let temp = createButton("");
    temp.position(
      data[i].posX * render_scale - data[i].radius / 2,
      data[i].posY * render_scale - data[i].radius / 2
    );
    temp.style("border-radius", "50%");
    temp.size(data[i].radius, data[i].radius);
    temp.style("background-color", "blue");
    temp.style("color", "orange");
    temp.mousePressed(() => {
      button_clicked(data[i]);
    });
    button.push(temp);
  }
}

function button_clicked(info) {
  text_display_cooldown = text_display_max_cooldown;
  select("#text_title").html(info.title);
  select("#text_body").html(info.description);

  text_display.show();
  text_display.visible = true;
}

function mousePressed() {}

function mousePressed() {
  console.log(
    "X " + mouseX / render_scale + " --- " + "Y " + mouseY / render_scale
  );

  // /\/\/\---broken
  if (text_display_cooldown <= 2) {
    text_display.hide();
    text_display.visible = false;
    text_display_cooldown = 1;
  }
  // \/\/\/---
}

function text_display_hidden() {}

function render_image(rs) {
  image(img, 0, 0, img.width * rs, img.height * rs);
}

function setup_text_displays() {
  // Create the box with two inner elements
  text_display = createDiv(`
  <div id="text_title" style="font-size: 28px; font-weight: bold; margin-bottom: 6px;"></div>
  <div id="text_body" style="font-size: 18px;"></div>
`);

  text_display.hide();
  text_display.style("width", width * 0.95 + "px");
  text_display.position(width * 0.015, 0);
  text_display.style("padding", "14px 0");
  text_display.style("background", "linear-gradient(#6df56d, #2f8f2f)");
  text_display.style("color", "white");
  text_display.style("text-align", "center");
  text_display.style("border-radius", "18px");
  text_display.style("border", "4px solid #1f6d1f");
  text_display.style(
    "box-shadow",
    "inset 0px 4px 8px rgba(255,255,255,0.35), 0px 8px 16px rgba(0,0,0,0.45)"
  );
  text_display.style("text-shadow", "0px 2px 3px rgba(0,0,0,0.6)");
}

