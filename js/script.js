const Jarvis = new Artyom();
const button = document.querySelector('button');
const icon = button.firstElementChild;
const diagnostic = document.querySelector('.output');


const list = [
{
    title: "something",
    image: buildImage("../imgs/question_m.png")
}, 
{
    title: "car",
    image: buildImage("../imgs/tesla.jpg")
},
{
    title: "banana",
    image: buildImage("../imgs/banana.png")
},
{
    title: "newspaper",
    image: buildImage("../imgs/newspaper.png")
},
{
    title: "milk",
    image: buildImage("..imgs/milk.png")
    //or just have "src: "../prototype etc..?""
}];


//for button
button.addEventListener('click', click);
function click(){
    if(icon.classList.contains('fa-microphone')){
        icon.classList.remove('fa-microphone');
        icon.classList.add('fa-microphone-slash');
        //document.getElementById("main-button").style.backgroundColor = "rgb(181, 35, 35)"
        firstStart();
    }
    else{
        icon.classList.remove('fa-microphone-slash');
        icon.classList.add('fa-microphone');
        //document.getElementById("main-button").style.backgroundColor = "#132BB1"
        dictateEnd();
    }
}

//for image
function buildImage(url) {
    var img = new Image();
    img.onerror = function() {
      console.log("could not load image on URL " + url);
    };
    img.src = url;
    return img;
  }


//commands --> can be removed later since artyom is not being used at all
Jarvis.addCommands([
    {
        indexes: ["How are you doing"],
        action: function(){
            alert("We are working")
        }
    },
    {
        indexes: ["stop recording"],
        action: function(){
            Jarvis.fatality();
        }
    },
]);


//to prevent voice recognition to start automatically
//maybe don't need it??
function openJarvis(){
    Jarvis.fatality();
    console.log("stopped him!!")
}

function startJarvis(){
    Jarvis.initialize({
        lang:"en-GB",
        continuous: true,  //listen forever
        debug:true, // Show what recognizes in the Console
        listen:true, // Start listening after this
        speed:0.9, // Talk a little bit slow
        mode:"normal" // This parameter is not required as it will be normal by default
    });
    console.log("Jarvis started")
}

function stopJarvis(){
    UserDictation.stop();
    Jarvis.fatality();
    console.log("Jarvis stopped")
}



//all the magic happens here
var settings =  {
    continuous: false,
    onResult:function resultGo(recognizedText){
        for(var i=0;i<list.length; i++){
            if(recognizedText == list[i].title){
                //new div element
                var newContainer = document.createElement("div");
                newContainer.setAttribute("id", "co");
                //clone image, structure from https://www.w3schools.com/jsref/met_node_clonenode.asp
                //if we didn't clone there would be only one image and after repeating item
                //the image would be removed from old item and added to the new one --> now we can have multiple
                var cln = list[i].image;
                var newImg = cln.cloneNode(true);
                //content
                newContainer.innerHTML = list[i].title;
                newContainer.appendChild(newImg);
                                //the .image is important and appendChild --> else [HTMLImageDOCUMENT or something]
                //add it to list
                document.querySelector("#list").appendChild(newContainer);
                // got the structure above from https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement

                //for transcript of the text --> only works when there's a match
                //if list[i].title changes to recognizedText it will dissapear right away



                //the old way to add text to the list --> now it creates new container --> maybe wrtite about this in paper
                //document.getElementById("list").innerHTML += "<li>"+ list[i].title + "</li>";
                //very important --> appends image to the list with #list!!!
                //"#list li" adds images to the first <li> element in the #list
                //document.querySelector("#list li").appendChild(z);
                console.log("final text: ", recognizedText);
                UserDictation.stop();
            }
        }
        if(recognizedText !== list[i]){
            //if something doesn't match create <p> element + ID
            var p = document.createElement("p");
            p.setAttribute("id", "nm")
            //if it's empty result return nothing
            if(recognizedText.length === 0){
                console.warn(recognizedText + " " + "empty result");
            }
            //store the result in <p> element
            //if there is multiple wrong results show the latest one?? maybe later
            else{
                p.innerHTML = "Result received: " + " " + recognizedText;   
                document.getElementById("err").appendChild(p);
                console.warn(recognizedText);
                //remove the p element/s after 3 seconds
                setTimeout(function(){
                   var str = document.getElementById("err").removeChild(p);
                }, 3000);

                UserDictation.stop();
               }
            // this returns every word the system recognized --> can't filter matches from the list :(
        }
    },
    onStart:function (){
        console.log("Dictation started by the user");
        //animation
        gsap.to("#main-button", {backgroundColor: "rgb(181, 35, 35)" ,scale: 1.5 ,duration:1});

    },
    onEnd:function(p){
        console.log("Dictation ended by the user");
        //animation
        gsap.fromTo("#main-button",{backgroundColor: "rgb(181, 35, 35)",scale: 1.5, duration: 1.5}, {backgroundColor: "#132BB1", scale: 1 ,duration:0.5});
    }
}

//initiating dictation --> important, it has to be below settings! --> check documentation
var UserDictation = Jarvis.newDictation(settings);



//starts the dictation itself with an interval
function firstStart(){
   loop = setInterval(dictateStart, 1000)
}

function dictateStart(){
        try{
            UserDictation.start();
            Jarvis.fatality();
        }
        catch(e){
            //loop through starting recognition 8x if no speech detected
            //nice patch to cover the error haha
            console.log("still listening");
        }
    }



//stops the dictation and interval    
function dictateEnd(){
    clearInterval(loop);
    stopRecording();
}

function stopRecording(){
    UserDictation.stop();
    Jarvis.fatality();
}



