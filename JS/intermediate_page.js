var sellected_segment = 1;
const defoult_step = 100;
var off_set=0;


window.addEventListener("resize",function(){
    resize_goods();
});

function resize_goods(){
    var visiabel_area = document.getElementsByClassName("visible_area")[0].getBoundingClientRect();

    var element_width=visiabel_area.width / 4.7;

    var elemetns =document.getElementsByClassName("goods");

    for(var i =0;i<elemetns.length;i++){
        elemetns[i].style.width = element_width+"px";
    }
}

function pluss(){
    sellected_segment++;
    off_set-=defoult_step;

    move_goods_bar()
    if(sellected_segment>4){
        sellected_segment=1;
        off_set+=defoult_step*4;
    }

    buil_gui_bar(sellected_segment);
}

function minus(){
    sellected_segment--;
    off_set+=defoult_step;
    if(sellected_segment<1){
        sellected_segment = 4;
        off_set-=defoult_step*4;
    }

    buil_gui_bar(sellected_segment);
}

function click_on_gui_bar_elem(element){
    var id=element.id;

    sellected_segment=id;

    off_set= -1*defoult_step*(id-1);

    buil_gui_bar(id);
}

function buil_gui_bar(id){
    var gui_bar = document.getElementsByClassName('gui_bar');

    var gui_bar_elem;
    for (var i = 0; i < gui_bar.length; i++) {
        gui_bar = gui_bar[i];

        gui_bar_elem= gui_bar.getElementsByTagName('span');
        
    }

    for(var i =0;i<4;i++){
        if(i+1==id){
            gui_bar_elem[i].className="active";
        }else{
            gui_bar_elem[i].className="disactive";
        }
    }

    move_goods_bar();
}

function move_goods_bar(){
    var elements = document.querySelectorAll('.moviable_block');
    console.log(elements)
    elements.forEach(function(element) {
        element.style.transform = 'translate(' + off_set + '%, 0px)';
    });
}

function goods_hover(element){
    //var test = element.parentNode;
    element.style.boxShadow = "0px 0px 15px 0px #141A99";
}

function goods_back_to_normal(element){
    element.style.boxShadow = "";
}


