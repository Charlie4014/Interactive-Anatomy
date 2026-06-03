//
//

const version = "pre5";
const devMode = false;
const pageID = "axial_skeleton1";

let img;
let data;
let button;
let text_display;
let text_display_cooldown;
let render_scale = 0.25;
var text_display_max_cooldown = 300;

function preload() {
  data = loadJSON("data.json", () => {
    data = data[pageID];
    img = loadImage(data.image.imageSource);
  });
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  render_scale = windowWidth / img.width;
  create_points();
  setup_text_displays();
}

function draw() {
  background(220);
  render_image(render_scale);

  
  // hide text display when cool down reaches 0
  text_display_cooldown -= 1;    
  if (text_display_cooldown == 0) {
    text_display.hide();
    text_display.visible = false;
  }

  textSize(25);
  text("version: " + version, 5, height - 30);
}

function create_points() {
  button = [];
  let p;
  for (let i = 0; i < data.points.length; i++) {
    p = data.points[i];
    button.push(new_point(p));
  }

  function new_point(p) {
    let button = createButton("");
    button.position(
      p.posX * render_scale - p.radius / 2,
      p.posY * render_scale - p.radius / 2
    );
    button.style("border-radius", "50%");
    button.size(p.radius, p.radius);
    button.style("background-color", "rgb(31,106,247)");
    //   button.style("color", "rgb(253,193,84)");
    button.style("border", "2px solid #2704FF");

    button.mousePressed(() => {
      button_clicked(p);
    });
    return button;
  }
}

function button_clicked(info) {
  text_display_max_cooldown = round(info. delay)
  text_display_cooldown = text_display_max_cooldown;
  select("#text_title").html(info.title);
  select("#text_body").html(info.description);
  text_display.show();
  text_display.visible = true;
}

function mousePressed() {
  if (text_display_cooldown < text_display_max_cooldown) {
    
    text_display.hide();
    text_display.visible = false;
    text_display_cooldown = 1;
  }
}

function render_image(rs) {
  image(img, 0, 0, img.width * rs, img.height * rs);
}

function setup_text_displays() {
  text_display = createDiv(`
  <div id="text_title" style="font-size: 56px; font-weight: bold; margin-bottom: 6px;"></div>
  <div id="text_body" style="font-size: 30px;"></div>
`);

  text_display.hide();

  text_display.style("width", width * 0.95 + "px");
  text_display.position(width * 0.015, 0);
  text_display.style("padding", "14px 0");

  text_display.style(
    "background",
    "linear-gradient(rgba(25,180,25,0.7), rgba(15,120,15,0.7))"
  );
  text_display.style("backdrop-filter", "blur(2px)");
  text_display.style("-webkit-backdrop-filter", "blur(2px)");

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

function mousePressed() {
  if (devMode) {
    console. log("mouseX: "+(mouseX/render_scale))
    console. log("mouseY: "+(mouseY/render_scale))
  }
}
