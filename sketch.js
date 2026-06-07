//
//

const version = "pre7";
const devMode = true;
const pageID = "axial_skeleton1";

const max_zoom = 10;
const min_zoom = 0.1;

let img;
let data;
let button;
let text_display;
let text_display_cooldown;
let render_scale = 0; // default 0.25
let lastDist = 0;
let pinchDelta = 0;
let touch_pos = {
  x: undefined,
  y: undefined
}

var text_display_max_cooldown = 300;

function preload() {
  data = loadJSON("data.json", () => {
    data = data[pageID];
    img = loadImage(data.image.imageSource);
  });
}

function get_rotation() {}

function align_orientation() {
  let w = windowWidth;
  let h = windowHeight;
  let ratio = w / h;

  if (w > h) {
    align_landscape(ratio);
  }
  if (h > w) {
    align_portrait();
  }
}

function align_landscape(ratio) {
  console.log("aligning landscape");
  render_scale = (windowWidth / img.width) * 0.5;
}
function align_portrait() {
  console.log("aligning portrait");
  render_scale = windowWidth / img.width;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  align_orientation();
  console.log(render_scale);
  create_points();
  setup_text_displays();
}

function draw() {
  background(220);
  zoom_run();
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
  let radius_scale = render_scale * 3;
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
    button.size(p.radius * radius_scale, p.radius * radius_scale);
    button.style("background-color", "rgb(31,106,247)");
    //   button.style("color", "rgb(253,193,84)");
    button.style("border", "2px solid #2704FF");
    button.style("padding", "0");
    button.style("font-size", "0");

    button.mousePressed(() => {
      button_clicked(p);
    });
    return button;
  }
}

function button_clicked(info) {
  text_display_max_cooldown = round(info.delay);
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

function zoom_run() {
  if (touches.length === 2) {
    const a = touches[0];
    const b = touches[1];

    const d = dist(a.x, a.y, b.x, b.y);

    if (lastDist === 0) {
      // first frame of the pinch → initialize, no jump
      pinchDelta = 0;
    } else {
      pinchDelta = d - lastDist;
    }

    lastDist = d;
  } else {
    lastDist = 0;
    pinchDelta = 0;
  }
  console.log(pinchDelta);

  render_scale += pinchDelta * 0.001;
  render_scale = constrain(render_scale, min_zoom, max_zoom);
  update_point_positions();
}

function update_point_positions() {
  let p;
  for (let i = 0; i < data.points.length; i++) {
    p = data.points[i];
    button[i].position(
      p.posX * render_scale - p.radius / 2,
      p.posY * render_scale - p.radius / 2
    );
  }
}

function render_image(rs) {
  image(img, 0, 0, img.width * rs, img.height * rs);
}

function setup_text_displays() {
  text_display = createDiv(`
  <div id="text_title" style="font-size: 56px; font-weight: bold; margin-bottom: 6px;"></div>
  <div id="text_body" style="font-size: 32px;"></div>
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

//------------DEV STUFF ---------------------------

function mousePressedDev() {
  if (devMode) {
    console.log("mouseX: " + mouseX / render_scale);
    console.log("mouseY: " + mouseY / render_scale);
    dump_data();
  }
}

function dump_data() {
  console.log({
    date: Date.now(),
    data: data,
  });
}
