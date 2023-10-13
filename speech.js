var messages = {
  start: {
    msg: "Click on the microphone icon and begin speaking.",
    class: "alert-success",
  },
  speak_now: {
    msg: "Speak now.",
    class: "alert-success",
  },
  no_speech: {
    msg: 'No speech was detected. You may need to adjust your <a href="//support.google.com/chrome/answer/2693767" target="_blank">microphone settings</a>.',
    class: "alert-danger",
  },
  no_microphone: {
    msg: 'No microphone was found. Ensure that a microphone is installed and that <a href="//support.google.com/chrome/answer/2693767" target="_blank">microphone settings</a> are configured correctly.',
    class: "alert-danger",
  },
  allow: {
    msg: 'Click the "Allow" button above to enable your microphone.',
    class: "alert-warning",
  },
  denied: {
    msg: "Permission to use microphone was denied.",
    class: "alert-danger",
  },
  blocked: {
    msg: "Permission to use microphone is blocked. To change, go to chrome://settings/content/microphone",
    class: "alert-danger",
  },
  upgrade: {
    msg: 'Web Speech API is not supported by this browser. It is only supported by <a href="//www.google.com/chrome">Chrome</a> version 25 or later on desktop and Android mobile.',
    class: "alert-danger",
  },
  stop: {
    msg: "Stop listening, click on the microphone icon to restart",
    class: "alert-success",
  },
  copy: {
    msg: "Content copy to clipboard successfully.",
    class: "alert-success",
  },
  problem: {
    msg: "There is some problem with your microphone",
    class: "alert-danger",
  },
};



  let final_transcript=``;
  let recognizing= false;
  let onend_error;
  let start_timestamp;
  let recognition
  let select_language= document.querySelector
  ("#select_language");
  console.log(select_language);

  let TheSpekingText

  let select_dialect= document.querySelector("#select_dialect");
  let final_span = document.getElementById("final_span");
  let interim_span = document.getElementById("interim_span");



  document.addEventListener("DOMContentLoaded" , function(){


   for(let i =0 ; i< langs.length;i++){
    select_language.options[i]= new Option(langs[i][0], i);
    
   }
   select_language.selectedIndex=10;
   updateCountry();
   select_dialect.selectedIndex=2;


  if(!("webkitSpeechRecognition" in window)){// to see  the api is working on the current browser or not
    showInfo("upgrade");
  }
  else{

    showInfo("start")
    recognition= new webkitSpeechRecognition();
    // console.log(recognition);
    recognition.continuous = true;
    recognition.interimResults= true;
// to start the recognizing or recording 

    recognition.onstart = function(){

      recognizing= true;
      showInfo("speak_now");
      start_img.src=`images/mic-animation.gif`;

}

    recognition.onerror=function(event){
     console.log(event)
         if(event.error == "not-allowed"){
  showInfo("blocked")
           }
           onend_error= true;
}

    recognition.onend = function(){

      recognizing = false;
      if(onend_error){
        return;
      }
      start_img.src=`images/mic.gif`;

      if(!(final_transcript)){
        showInfo("start");
        return ;
      }
      showInfo("stop");
}



    recognition.onresult=function(event){

      console.log(event);
      let interim_trasnscript="";
      // console.log(345)


      
      for( let i = event.resultIndex ; i< event.results.length;i++){
          // console.log(event.results[i][0].transcript);
        if(event.results[i].isFinal){
          final_transcript+=event.results[i][0].transcript;
          // console.log(final_transcript)
          
        }
        else{
          interim_trasnscript+=event.results[i][0].transcript;
          // console.log(interim_trasnscript)

        }
      }
      final_span.innerHTML= final_transcript
      TheSpekingText= final_transcript;
      interim_span.innerHTML = interim_trasnscript;


   }  
}
  })

  //  to update the list of  the dialect present in  new language thas is selected 

  function updateCountry(){
    
    // console.log(select_dialect.options.length)

    for(let i = select_dialect.options.length;i>=0;i--){
          
      select_dialect.remove(i);
  
     }

     let list = langs[select_language.selectedIndex];

    //  console.log(list);

     for(let i = 1 ;i< list.length;i++){

      select_dialect.options.add( new Option(list[i][1],list[i][0]))

     }
   


     select_dialect.style.visibility= list[1].length==1?"hidden":"visible";

  }


  select_language.addEventListener("change" , function(){
    updateCountry()
  })

  document.getElementById("start_button").addEventListener("click" ,function(e){
       if(recognizing==true){
        // console.log(34)
        recognition.stop();
        return;
       }
      //  console.log("MUU")
      showInfo22("start2")
       final_transcript=""
       recognition.lang=select_dialect.value
       recognition.start();
       final_span.innerHTML="";
       interim_span.innerHTML="";

  })


// for copying 

document.getElementById("copy_button").addEventListener("click", function(){


if(recognizing){
  recognizing=false;
  recognition.stop();
}
// copy to clipboard

copyToClipboard(final_span.innerText);

})

function copyToClipboard(text){

const el = document.createElement("textarea");

el.value= text;

document.body.appendChild(el);

el.select()

document.execCommand("copy");;

document.body.removeChild(el);
}

// to show the inforation at the starting div

  function showInfo(s){

    let info = document.getElementById("Info");

if(s){
  let message= messages[s];
  info.innerHTML=message.msg
  info.className="alert "+ message.class
}
else{

  info.className="d-none";


}
    
   }


// for the playing things 
var messagesto = {
  start2: {
    msg: "Click above button to Transfer the data that You have said.",
    class: "alert-success",
  },
  to_play: {
    msg: "Click The play button hear what you said",
    class: "alert-success",
  },
  no_data: {
    msg: 'No speech was detected',
    class: "alert-danger",
  },

}



let select_speed= document.querySelector("#select_speed")
let select_pitch= document.querySelector("#select_pitch")
let displycontent= document.querySelector("#result22");
let trasferButton= document.querySelector("#transfer_button")
let playButton= document.querySelector("#play_button")
let addlangs= document.querySelector("#select_splan")
let thiscnage=document.querySelector("#THsichanges")
let answertoPLay ;
let selected_speed=1;
let seleted_pitch=1
let transfering= false;
console.log(10);
console.log(addlangs)

select_speed.addEventListener("change" , function(){
  selected_speed=select_speed.value;
  console.log(selected_speed)
  })
  select_pitch.addEventListener("change" , function(){
    seleted_pitch=select_pitch.value;
    console.log(selected_speed)
    })
  


for(let i=0 ;i<sp.length;i++ ){

  // console.log(sp[i][0]);
  // console.log(sp[i][1])
  select_speed.options[i]= new Option(`${sp[i][0]}x`, sp[i][1]);

}
select_speed.selectedIndex=3
for( let i =0 ;i<pit.length;i++){
select_pitch.options[i]= new Option(`${pit[i][0]}x`, pit[i][1]);

}
showInfo22("start2");

trasferButton.addEventListener("click" ,function(){
  
if(recognizing){
  recognizing=false;
  recognition.stop();
}

answertoPLay=final_span.innerText;

if(answertoPLay==""){
  showInfo22("no_data");
  transfering= true;
}
else{
  showInfo22("to_play")
  displycontent.innerHTML= final_span.innerText
  transfering= true;
}

})

const Speehconverter=window.speechSynthesis;

playButton.addEventListener("click", function(){

  if(!transfering){
   answertoPLay="You have not Trasfered any data"
   return ;
  }
  showInfo22("start2");
  let saythis= new SpeechSynthesisUtterance(answertoPLay);
  saythis.pitch=seleted_pitch
  saythis.rate=selected_speed
  console.log(saythis);
  // answertoPLay.blur();
  Speehconverter.speak(saythis);

  
})

function showInfo22(s){

let  thischna= document.getElementById("THsichanges");
console.log(s);

if(s){
let message= messagesto[s];
console.log(message);
thischna.innerHTML=message.msg
// info.className="alert "+ message.class
}

 }















  