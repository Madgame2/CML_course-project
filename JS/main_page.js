function hover_audio(element){
    //console.log(element);
    var elements = document.querySelectorAll(".audio_js");
    //console.log(elements);

    for(var i=0; i<elements.length;i++){
        if(elements[i].querySelector('img')==element.querySelector('img')){
            elements[i].querySelector('img').style.transform = 'scale(1.5)';
            elements[i].querySelector('span').style.transform = 'translate(0, 30%)';
        }else{
            elements[i].querySelector('img').style.transform = 'scale(0.7)';
            elements[i].querySelector('span').style.transform = 'translate(0, -30%)';
        }
    }
}

function back_to_normal(){
    var elements = document.querySelectorAll(".audio_js");

    for(var i=0; i<elements.length;i++){
        elements[i].querySelector('img').style.transform = 'scale(1)';
        elements[i].querySelector('span').style.transform = 'translate(0, 0)';
    }
}

function hover_video(element){
    //console.log(element);
    var elements = document.querySelectorAll(".video_js");
    //console.log(elements);

    for(var i=0; i<elements.length;i++){
        if(elements[i].querySelector('img')==element.querySelector('img')){
            elements[i].querySelector('img').style.transform = 'scale(1.5)';
            elements[i].querySelector('span').style.transform = 'translate(0, 30%)';
        }else{
            elements[i].querySelector('img').style.transform = 'scale(0.7)';
            elements[i].querySelector('span').style.transform = 'translate(0, -30%)';
        }
    }
}

function back_to_normal_video(){
    var elements = document.querySelectorAll(".video_js");

    for(var i=0; i<elements.length;i++){
        elements[i].querySelector('img').style.transform = 'scale(1)';
        elements[i].querySelector('span').style.transform = 'translate(0, 0)';
    }
}