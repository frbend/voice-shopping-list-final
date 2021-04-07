const Jarvis = new Artyom();
const button = document.getElementById('main-button');
const icon = button.firstElementChild;
const diagnostic = document.querySelector('.output');





//for button
button.addEventListener('click', click);
function click(){
    if(icon.classList.contains('fa-microphone')){
        icon.classList.remove('fa-microphone');
        icon.classList.add('fa-microphone-slash');
        firstStart();
    }
    else{
        icon.classList.remove('fa-microphone-slash');
        icon.classList.add('fa-microphone');
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


//to clear the list
function clearList(){
    var l = document.getElementById("list");
    while(l.firstChild){
        l.removeChild(l.firstChild);
    }
}



const basePath = "https://spoonacular.com/cdn/ingredients_100x100/"


//all the magic happens here
var settings =  {
    continuous: false,
    onResult:function resultGo(recognizedText){
            try{
                fetch("https://api.spoonacular.com/food/ingredients/search?apiKey=2490261d526c47f2ad669812ae39c9ac&number=1&query="+recognizedText)
                    .then(function(response){
                        return response.json();
                    }).then(function(data){
                        console.log(data);
                        if(data.results[0].name == recognizedText){
                            //title
                            const p = document.createElement('p');
                            p.setAttribute("id", "result");
                            p.innerHTML = data.results[0].name;
                            //img
                            const img = document.createElement('img');
                            img.src = basePath + data.results[0].image;
                            //new div element
                            var newContainer = document.createElement("div");
                            newContainer.setAttribute("id", "co");
                            //content
                            newContainer.appendChild(p);
                            newContainer.appendChild(img);
                            // //add it to list
                            document.querySelector("#list").appendChild(newContainer);
                            UserDictation.stop();
                            console.log('Title: ', p,'Image: ', img)
                        }
                        else{
                        console.log('this does is not part of the list', recognizedText)
                        }
                    });
                    try{
                        if(recognizedText.length == 0){
                            console.warn(recognizedText + " " + "empty result");
                        }
                        else{
                            //if something doesn't match create <p> element + ID
                            var p = document.createElement("p");
                            p.setAttribute("id", "nm")
                            p.innerHTML = "Result received: " + " " + recognizedText;   
                            document.getElementById("err").appendChild(p);
                            console.warn(recognizedText);
                            //remove the p element/s after 3 seconds
                            setTimeout(function(){
                            var str = document.getElementById("err").removeChild(p);
                            }, 3000);
                            UserDictation.stop();
                       }
                       }
                    catch(e){
                        console.log("wrong", e)
                    }
        }
        catch(e){
            console.log("fetch error", e)
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



