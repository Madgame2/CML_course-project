var params = new URLSearchParams(window.location.search);

var type = params.get("type");
var id =  params.get("id");

var xml_elem;

console.log(type);
console.log(id);

var selected_img=1;

function build_page(xml_doc){

    var intaractive = document.getElementsByClassName("intaractive")[0];

    var navigation_buttons = intaractive.querySelectorAll(".button");

    var sub_category = xml_doc.getElementsByTagName("sub_category");
    for(var i = 0;i<sub_category.length;i++){
        if(sub_category[i].getAttribute("type")==type){
            var  items=sub_category[i].getElementsByTagName("item");
            for(var j=0;j<items.length;j++){
                if(items[j].getElementsByTagName("id")[0].innerHTML==id){
                    xml_elem=items[j];
                    break;
                }
            }
            break;
        }
    }  

    navigation_buttons.forEach(function(element) {
        element.addEventListener('click', function(event) {
            // Проверяем, что была нажата левая кнопка мыши
            if (event.button === 0) { // 0 означает левую кнопку мыши
                // Добавляем класс "clicked", чтобы изменить фон
                element.classList.add('clicked');

                if(element.parentNode.className=="right"){
                    pluss()
                }
                else if(element.parentNode.className=="left"){
                    minus()
                }

                // Через 1 секунду удаляем класс "clicked", чтобы вернуть изначальный фон
                setTimeout(function() {
                    element.classList.remove('clicked');
                }, 100);
            }
        });
    });
    //NAME
    document.getElementsByClassName("name")[0].innerHTML =xml_elem.getElementsByTagName("name")[0].innerHTML;

    //MAIN_IMAGE
    var main_img = document.getElementsByClassName("main_image")[0].getElementsByClassName("image")[0];
    var xml_main_img = xml_elem.getElementsByTagName("main_img")[0].innerHTML;

    main_img.setAttribute("src",xml_main_img);

    //SMALL_IMAGES
    var small_img_list = document.getElementsByClassName("img");
    var small_img_list_xml = xml_elem.getElementsByTagName("sub_img")[0].getElementsByTagName("img");

    for(var i=0;i<small_img_list_xml.length;i++){
        small_img_list[i].getElementsByTagName("img")[0].setAttribute("src",small_img_list_xml[i].innerHTML);
    }
    
    //EXTRO_INFO
    var xml_exto = xml_elem.getElementsByTagName("extra")[0].getElementsByTagName("element");
    var info_area= document.getElementsByClassName("info_area")[0];

    info_area.innerHTML='';
    for(var i = 0;i<5;i++){
        info_area.innerHTML+=xml_exto[i].getAttribute("name")+"  ";

        var b = document.createElement("b");
        b.innerHTML=xml_exto[i].innerHTML;
        info_area.appendChild(b);

        var br = document.createElement("br");
        info_area.appendChild(br);
    }

    //STATUS
    document.getElementsByClassName("status")[0].getElementsByClassName("line")[0].innerHTML = xml_elem.getElementsByTagName("status")[0].innerHTML;
    if(xml_elem.getElementsByTagName("status")[0].getAttribute("mode")=="in_stock"){
        document.getElementsByClassName("status")[0].getElementsByClassName("curcle")[0].style.backgroundColor="#2FD620";
    }else if(xml_elem.getElementsByTagName("status")[0].getAttribute("mode")=="from_the_showcase"){
        document.getElementsByClassName("status")[0].getElementsByClassName("curcle")[0].style.backgroundColor="#DB5C00";
    }

    //COAST
    document.getElementsByClassName("rubels")[0].innerHTML=xml_elem.getElementsByTagName("coast")[0].getElementsByTagName("rubles")[0].innerHTML;
    document.getElementsByClassName("kopecks")[0].innerHTML='.'+xml_elem.getElementsByTagName("coast")[0].getElementsByTagName("kopecks")[0].innerHTML;

    var lest_of_cell= document.getElementsByTagName("table")[0].getElementsByTagName("td");

    console.log(lest_of_cell);
    for(var i=0;i<xml_exto.length;i++){

        lest_of_cell[2*i].innerHTML=xml_exto[i].getAttribute("name");
        lest_of_cell[2*i+1].innerHTML=xml_exto[i].innerHTML;
    }
}

function pluss(){
    selected_img++;
    var length = document.getElementsByClassName("elem").length
    if(selected_img>length){
        selected_img=1;
    }
    console.log(selected_img);

    set_active()
}

function minus(){
    selected_img--;
    var elements = document.getElementsByClassName("elem").length;

    if(selected_img<1){
        selected_img=length;
    }
    console.log(selected_img);

    set_active()
}

function set_active(){
    var list = document.getElementsByClassName("img");

   // console.log(document.getElementsByClassName("main_image")[0]);

    var main_img = document.getElementsByClassName("main_image")[0].getElementsByClassName("image")[0];

    for(var i=0;i<list.length;i++){
        if(i+1!=selected_img){
            list[i].getElementsByTagName("img")[0].classList.remove("active");


        }else{
            list[i].getElementsByTagName("img")[0].classList.add("active");
            var path = list[i].getElementsByTagName("img")[0].getAttribute("src");
            console.log(path);
            main_img.setAttribute("src",path);
        }
    }
}