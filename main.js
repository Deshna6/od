img ="";
imgStatus = false;
objects = [];

function preload(){
    img = loadImage('wallpaper.jpeg');
}

function setup(){
    canvas = createCanvas(300,300);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded(){
    console.log('Model Loaded');
    imgStatus = true;
   
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);

        objects = results;
    }
}


function draw(){
    image(img,0,0,300,300);
    
    fill("#FF0000");
    text("Cartoon", 45, 75);
    noFill();
    stroke("#FF0000");
    rect(30, 60, 450, 350);

    if(imgStatus){
        r = random(255);
        g = random(255);
        b = random(255);
                         
        objectDetector.detect(img, gotResult);
        for (i = 0 ; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects Detected are :" + objects.length;
            
            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);

            text(objects[i].label + "" + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke(r,g,b);

            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}