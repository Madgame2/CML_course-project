var params = new URLSearchParams(window.location.search);

var type = params.get("type");

console.log(type);

max_coast_const = 1000;

var global_xml;

function build_page(xml_doc){

    global_xml = xml_doc

    var elements = xml_doc.getElementsByTagName("sub_category");
    var my_element;    

    for(var i=0;i<elements.length;i++){
        if(elements[i].getAttribute("type")==type){
            my_element=elements[i];
            break;
        }
    }

    document.getElementById("type_of_catalog").innerHTML=my_element.getAttribute("name");

    var filters = my_element.getElementsByTagName("filters")[0].getElementsByTagName("filter");

    for(var i=0;i<Number(filters.length);i++){

        var filter = filters[i];
        
        var filter_type = filter.getAttribute("type");
        var filter_id = filter.getAttribute("var");
        var filter_name = filter.getAttribute("name");

        var new_filte;
        if(filter_type=="scroll"){
            new_filte = build_scrol_example(filter_id,filter_name);
            
        }
        else if(filter_type=="simple"){
            var list =[];
            var sub_points=filter.getElementsByTagName("point");


            for(var j=0;j<sub_points.length;j++){
                //console.log(sub_points[i].innerHTML);
                list.push(sub_points[j].innerHTML);
            }

            new_filte = build_simple_filter(filter_id,filter_name,list);
        }
        document.getElementById("filters").appendChild(new_filte);
    }

    var list_of_goods=my_element.getElementsByTagName("item");



    var followers = document.querySelectorAll('.moveable');

    followers.forEach(function(follower) {
        follower.addEventListener('mousedown', function(event) {
            move_buble(event, follower);
        });
    })
    chenge_block_count();

    for(var i=0;i<list_of_goods.length;i++){
        var new_element = build_goods_element(list_of_goods[i]);

        document.getElementsByClassName("goods_area")[0].getElementsByClassName("contaner")[0].appendChild(new_element);
    }

    var checkboxs= document.getElementsByClassName("brend");

    for(var i=0;i<checkboxs.length;i++){
        var element = checkboxs[i].getElementsByTagName("input")[0];

        element.addEventListener("change",function(){
            update_goods_list()
        });
    }

}

function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        // Запрещаем ввод всего кроме цифр
        return false;
    }
    return true;
}


function move_buble(event, element){
    var startX = event.clientX;
    var offsetX = element.offsetLeft;

    document.addEventListener('mousemove', moveHandler);
    document.addEventListener('mouseup', stopFollowing);

    function moveHandler(event) {
        var newX = offsetX + event.clientX - startX;

        if(element.classList.contains("min")){
            var minX = 0;
            var maxX = element.parentNode.getElementsByClassName("max")[0].offsetLeft;

        }

        if(element.classList.contains("max")){
            var minX =  element.parentNode.getElementsByClassName("min")[0].offsetLeft;
            var maxX =  element.parentNode.parentNode.getElementsByClassName("inp_range")[0].clientWidth;
        }

        newX = Math.max(minX, Math.min(maxX, newX));
        element.style.left = newX + 'px';


        var minElement = element.parentNode.getElementsByClassName("min")[0];
        var maxElement = element.parentNode.getElementsByClassName("max")[0];
        
        var minRect = minElement.getBoundingClientRect();
        var maxRect = maxElement.getBoundingClientRect();
        
        var new_width = maxRect.left - minRect.left;   
        //console.log(new_width);

        if(element.classList.contains("min")){
            element.parentNode.parentNode.getElementsByClassName("user_input")[0].style.transform = 'translate(' + newX + 'px, 0px)';
        }

        element.parentNode.parentNode.getElementsByClassName("user_input")[0].style.width=new_width+"px";

        buil_coat_count_by_bar(minElement,maxElement, element)
    }

    function stopFollowing() {
        document.removeEventListener('mousemove', moveHandler);
        document.removeEventListener('mouseup', stopFollowing);

        update_goods_list();
    }
}


function buil_coat_count_by_bar(min,max, active){


    var min_bar=max.parentNode.parentNode.parentNode.getElementsByClassName("input_area")[0].getElementsByClassName("min")[0];
    var max_bar=max.parentNode.parentNode.parentNode.getElementsByClassName("input_area")[0].getElementsByClassName("max")[0];

    //console.log(max_bar);

    var widht = max.parentNode.parentNode.getElementsByClassName("inp_range")[0].clientWidth;
    var max_off_set =max.offsetLeft;
    var min_off_set =min.offsetLeft;
    var coast_pre_px=(max_coast_const/widht).toFixed(2);

    if(active==max){
        max_bar.value=(coast_pre_px * max_off_set).toFixed(2);
    }
    if(active==min){
        min_bar.value=(coast_pre_px * min_off_set).toFixed(2);
    }
}

function chenge_block_count(){
    var blocks = document.getElementsByClassName("block");

    for(var i =0;i<blocks.length;i++){
       blocks[i].getElementsByTagName("input")[0].addEventListener("blur",function(){
            var new_value = this.value;

            
            var element=this.parentNode.parentNode.parentNode.getElementsByClassName("inp_range")[0];
            var min=this.parentNode.parentNode.parentNode.getElementsByClassName("bubles")[0].getElementsByClassName("min")[0];
            var max=this.parentNode.parentNode.parentNode.getElementsByClassName("bubles")[0].getElementsByClassName("max")[0];

            var px_pre_coast = element.clientWidth/max_coast_const;

            if(this.classList.contains("max")){
            if(Number(new_value)>Number(max_coast_const)){
                this.value=max_coast_const
            }

            max.style.left =px_pre_coast*this.value+"px";


        }
        if(this.classList.contains("min")){

            var max_val=this.parentNode.parentNode.getElementsByClassName("max")[0].value;
            console.log(new_value);
            console.log(max_val);

            console.log(Number(new_value)>Number(max_val));
            if(Number(new_value)>Number(max_val)){
                console.log("it is me")
                this.value=max_val;
                this.setAttribute("value",max_coast_const);
            }

            min.style.left =px_pre_coast*this.value+"px";
            element.parentNode.parentNode.getElementsByClassName("user_input")[0].style.transform = 'translate(' + px_pre_coast*this.value + 'px, 0px)';
        }

        var minElement = element.parentNode.getElementsByClassName("min")[0];
        var maxElement = element.parentNode.getElementsByClassName("max")[0];
        
        var minRect = minElement.getBoundingClientRect();
        var maxRect = maxElement.getBoundingClientRect();
        
        var new_width = maxRect.left - minRect.left; 
        element.parentNode.parentNode.getElementsByClassName("user_input")[0].style.width=new_width+"px";

        update_goods_list();
       }
    );


    blocks[i].getElementsByTagName("input")[0].addEventListener("keydown",function(){


        var keyCode = event.keyCode || event.which;

        if (keyCode === 13) {

        //this.disabled =true;

        var new_value = this.value;
        var element=this.parentNode.parentNode.parentNode.getElementsByClassName("inp_range")[0];
        var min=this.parentNode.parentNode.parentNode.getElementsByClassName("bubles")[0].getElementsByClassName("min")[0];
        var max=this.parentNode.parentNode.parentNode.getElementsByClassName("bubles")[0].getElementsByClassName("max")[0];

        var px_pre_coast = element.clientWidth/max_coast_const;

        if(this.classList.contains("max")){
        if(Number(new_value)>Number(max_coast_const)){
            this.value=max_coast_const
        }

        max.style.left =px_pre_coast*this.value+"px";


    }
    if(this.classList.contains("min")){

        var max_val=this.parentNode.parentNode.getElementsByClassName("max")[0].value;
        //console.log(new_value);
        //console.log(max_val);

        console.log(Number(new_value)>Number(max_val));
        if(Number(new_value)>Number(max_val)){
            console.log("it is me")
            this.value=max_val;
            this.setAttribute("value",max_coast_const);
        }

        min.style.left =px_pre_coast*this.value+"px";
        element.parentNode.parentNode.getElementsByClassName("user_input")[0].style.transform = 'translate(' + px_pre_coast*this.value + 'px, 0px)';
    }

    var minElement = element.parentNode.getElementsByClassName("min")[0];
    var maxElement = element.parentNode.getElementsByClassName("max")[0];
    
    var minRect = minElement.getBoundingClientRect();
    var maxRect = maxElement.getBoundingClientRect();
    
    var new_width = maxRect.left - minRect.left; 
    element.parentNode.parentNode.getElementsByClassName("user_input")[0].style.width=new_width+"px";
        }
        update_goods_list();
        });
    }
}

function build_scrol_example(id,name){
    var scroll_area = document.createElement("div");

    scroll_area.className ="scroll_area";
    scroll_area.classList.add("filter");
    scroll_area.id = id;

    var head = document.createElement("div");

    head.className="head";
    head.textContent=name;

    scroll_area.appendChild(head);

    var input_area = document.createElement("div");

    input_area.className = "input_area";

    var block_min = document.createElement("div");
    var block_max = document.createElement("div");

    block_min.className = "block";
    block_max.className = "block";

    block_min.id = "min_"+id;
    block_max.id = "max_"+id;

    var input_min = document.createElement("input");
    var input_max = document.createElement("input");

    input_min.className="min";
    input_max.className="max";

    input_min.type="text";
    input_max.type="text";

    input_min.value="0";
    if(id=="coast") input_max.value=max_coast_const;

    input_min.onkeypress="return isNumberKey(event)";
    input_max.onkeypress="return isNumberKey(event)";

    block_min.appendChild(input_min);
    block_max.appendChild(input_max);

    input_area.appendChild(block_min);
    input_area.appendChild(block_max);

    scroll_area.appendChild(input_area);

    var scroll =document.createElement("div");
    scroll.className="scroll";

    var inp_range=document.createElement("div");
    inp_range.className="inp_range";

    var bg = document.createElement("div")
    bg.className="bg";

    var user_input = document.createElement("div");
    user_input.className="user_input";

    bg.appendChild(user_input);
    inp_range.appendChild(bg);
    scroll.appendChild(inp_range);

    var bubles =document.createElement("div");
    bubles.className ="bubles"

    var min_moveable = document.createElement("div");
    var max_moveable = document.createElement("div");

    min_moveable.classList.add("min");
    min_moveable.classList.add("moveable")
    max_moveable.classList.add("max");
    max_moveable.classList.add("moveable")

    min_moveable.id = "min_scroll_"+id;
    max_moveable.id = "max_scroll_"+id;

    bubles.appendChild(min_moveable);
    bubles.appendChild(max_moveable);

    scroll.appendChild(bubles);

    scroll_area.appendChild(scroll);

    return scroll_area;
}

function build_simple_filter(id,name, list){
    var simple_filter =document.createElement("div");

    simple_filter.className="simple_filter";
    simple_filter.classList.add("filte");
    simple_filter.id=id;

    var head= document.createElement("div");

    head.className="head";
    head.innerText=name;

    simple_filter.appendChild(head);

    var contaner = document.createElement("div");

    contaner.className="contaner";

    for(var i=0;i<list.length;i++){
        var brend = document.createElement("label");

        brend.className ="brend";
        brend.for=list[i];

        var input = document.createElement("input");

        input.type="checkbox";
        input.id=list[i];

        brend.appendChild(input);

        var border=document.createElement("div");
        border.className="border";

        var contant = document.createElement("div");
        contant.className="contant";

        var svg = document.createElementNS("http://www.w3.org/2000/svg","svg");
        svg.setAttribute("widht","17");
        svg.setAttribute("height","17");
        svg.setAttribute("xmlns","http://www.w3.org/2000/svg");

        svg.style.width=17;
        svg.style.height=17;

        var path = document.createElementNS("http://www.w3.org/2000/svg","path");
        path.setAttribute("stroke", "#FFF");
        path.setAttribute("stroke-width","2");
        path.setAttribute("d","m1 12 4 4L16 1");
        path.setAttribute("fill","none");
        path.setAttribute("fill-rule","evenodd");
        path.setAttribute("stroke-linecap","round");
        path.setAttribute("stroke-linejoin","round");

        svg.appendChild(path);
        contant.appendChild(svg);
        border.appendChild(contant);

        var div  =document.createElement("div");

        div.innerText=list[i];

        brend.appendChild(border);
        brend.appendChild(div);

        contaner.appendChild(brend);
    }

    simple_filter.appendChild(contaner);

    return simple_filter;
}


function build_goods_element(xml_element){
    var div = document.createElement("div");

    var goods= document.createElement("div");
    goods.className="goods";
    goods.id=xml_element.getElementsByTagName("id")[0].innerHTML;

    var img = document.createElement("div");
    img.style="grid-area: img;";
    img.className = "img";

    var a= document.createElement("a");
    a.setAttribute("href","product_window.html?type="+type+"&"+"id="+goods.id);

    var image= document.createElement("img");
    //img.src=xml_element.getElementsByTagName("main_img")[0].innerHTML;

    image.setAttribute("src",xml_element.getElementsByTagName("main_img")[0].innerHTML)
    
    a.appendChild(image);
    img.appendChild(a);
    goods.appendChild(img);

    var name  =document.createElement("div");
    name.style="grid-area: name;";
    name.className="name";

    var name_cont = document.createElement("a");
    name_cont.className="name_cont";
    name_cont.setAttribute("href","product_window.html?type="+type+"&"+"id="+goods.id);
    name_cont.textContent =xml_element.getElementsByTagName("name")[0].innerHTML;

    name.appendChild(name_cont);
    goods.appendChild(name);

    var status = document.createElement("div");

    status.style="grid-area: status;";
    status.className="status";

    var curcle=document.createElement("div");
    var status_cont = document.createElement("div");

    curcle.className="curcle";
    status_cont.className="status_cont";

    status_cont.textContent =xml_element.getElementsByTagName("status")[0].innerHTML;
    //console.log(xml_element.getElementsByTagName("status")[0].innerHTML);

    if(xml_element.getElementsByTagName("status")[0].getAttribute("mode")=="in_stock"){
        curcle.style.backgroundColor="#2FD620";
    }else if(xml_element.getElementsByTagName("status")[0].getAttribute("mode")=="from_the_showcase"){
        curcle.style.backgroundColor="#DB5C00";
    }

    status.appendChild(curcle);
    status.appendChild(status_cont);
    goods.appendChild(status);

    var extra_info = document.createElement("div");
    extra_info.className="extra";

    for(var i=0;i<3;i++){
        var extra= document.createElement("div");
        extra.className="extra_param";

        var param=document.createElement("div");
        var status=document.createElement("div");

        param.className="param";
        status.className="status";

        status.textContent = xml_element.getElementsByTagName("extra")[0].getElementsByTagName("element")[i].innerHTML
        param.textContent = xml_element.getElementsByTagName("extra")[0].getElementsByTagName("element")[i].getAttribute("name");
    
        extra.appendChild(param);
        extra.appendChild(status);

        extra_info.appendChild(extra);
    }
    goods.append(extra_info);

    var buy = document.createElement("div");

    buy.style="grid-area: buy;";
    buy.className="buy";

    var buy_contaner=document.createElement("div");
    buy_contaner.className="buy_contaner";

    var coast= document.createElement("div");
    coast.className="coast";

    var rubels = document.createElement("div");
    var kopecks = document.createElement("div");

    rubels.className="rubels";
    kopecks.className="kopecks";

    rubels.textContent=xml_element.getElementsByTagName("coast")[0].getElementsByTagName("rubles")[0].innerHTML;
    kopecks.textContent="."+xml_element.getElementsByTagName("coast")[0].getElementsByTagName("kopecks")[0].innerHTML;

    //console.log(xml_element.getElementsByTagName("coast")[0].getElementsByTagName("rubles")[0].innerHTML);

    coast.appendChild(rubels);
    coast.appendChild(kopecks);
    buy_contaner.appendChild(coast);


    var line = document.createElement("div")
    line.className="line";

    var newSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

// Устанавливаем высоту и другие атрибуты, если есть
    newSvg.setAttribute('height', '2');
    newSvg.setAttribute('fill', 'none');

// Создаем элемент path и устанавливаем его атрибуты
    newPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    newPath.setAttribute('d', 'M310.029 1L0.0292969 1');
    newPath.setAttribute('stroke', '#141A99');
    newPath.setAttribute('stroke-width', '2');
    newPath.setAttribute('stroke-dasharray', '6 6');

// Добавляем элемент path в svg
    newSvg.appendChild(newPath);
    line.appendChild(newSvg);
    buy_contaner.appendChild(line);

    var button = document.createElement("div");
    button.className= "button";

    var newSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    newSvg.setAttribute('width', '200');
    newSvg.setAttribute('height', '42');
    newSvg.setAttribute('viewBox', '0 0 200 42');
    newSvg.setAttribute('fill', 'none');    

    var newRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    newRect.setAttribute('x', '1.5');
    newRect.setAttribute('y', '1.5');
    newRect.setAttribute('width', '197');
    newRect.setAttribute('height', '31.9138');
    newRect.setAttribute('rx', '13.5');
    newRect.setAttribute('fill', '#ED3939');
    newRect.setAttribute('stroke', '#F55E67');
    newRect.setAttribute('stroke-width', '3');

    var newPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    newPath.setAttribute("d", "M48.2642 23V8.45455H54.0881C55.1581 8.45455 56.0507 8.61316 56.7656 8.9304C57.4806 9.24763 58.018 9.68797 58.3778 10.2514C58.7377 10.8101 58.9176 11.4541 58.9176 12.1832C58.9176 12.7514 58.804 13.2509 58.5767 13.6818C58.3494 14.108 58.0369 14.4583 57.6392 14.733C57.2462 15.0028 56.7964 15.1946 56.2898 15.3082V15.4503C56.8438 15.474 57.3622 15.6302 57.8452 15.919C58.3329 16.2079 58.7282 16.6127 59.0312 17.1335C59.3343 17.6496 59.4858 18.2652 59.4858 18.9801C59.4858 19.7519 59.294 20.4408 58.9105 21.0469C58.5317 21.6482 57.9706 22.1241 57.2273 22.4744C56.4839 22.8248 55.5677 23 54.4787 23H48.2642ZM51.3395 20.4858H53.8466C54.7036 20.4858 55.3286 20.3224 55.7216 19.9957C56.1146 19.6643 56.3111 19.224 56.3111 18.6747C56.3111 18.2723 56.214 17.9171 56.0199 17.6094C55.8258 17.3016 55.5488 17.0601 55.1889 16.8849C54.8338 16.7098 54.41 16.6222 53.9176 16.6222H51.3395V20.4858ZM51.3395 14.5412H53.6193C54.0407 14.5412 54.4148 14.4678 54.7415 14.321C55.0729 14.1695 55.3333 13.9564 55.5227 13.6818C55.7169 13.4072 55.8139 13.0781 55.8139 12.6946C55.8139 12.169 55.6269 11.7453 55.2528 11.4233C54.8835 11.1013 54.358 10.9403 53.6761 10.9403H51.3395V14.5412ZM66.0589 23V12.0909H69.0845V16.3239H69.9368L72.9055 12.0909H76.4567L72.6001 17.5028L76.4993 23H72.9055L70.2138 19.1293H69.0845V23H66.0589ZM82.2575 23.2131C81.1542 23.2131 80.2002 22.9787 79.3952 22.5099C78.5951 22.0365 77.9772 21.3783 77.5415 20.5355C77.1059 19.688 76.8881 18.7055 76.8881 17.5881C76.8881 16.4612 77.1059 15.4763 77.5415 14.6335C77.9772 13.786 78.5951 13.1278 79.3952 12.6591C80.2002 12.1856 81.1542 11.9489 82.2575 11.9489C83.3607 11.9489 84.3124 12.1856 85.1126 12.6591C85.9175 13.1278 86.5378 13.786 86.9734 14.6335C87.409 15.4763 87.6268 16.4612 87.6268 17.5881C87.6268 18.7055 87.409 19.688 86.9734 20.5355C86.5378 21.3783 85.9175 22.0365 85.1126 22.5099C84.3124 22.9787 83.3607 23.2131 82.2575 23.2131ZM82.2717 20.8693C82.7736 20.8693 83.1926 20.7273 83.5288 20.4432C83.8649 20.1544 84.1183 19.7614 84.2887 19.2642C84.4639 18.767 84.5515 18.2012 84.5515 17.5668C84.5515 16.9323 84.4639 16.3665 84.2887 15.8693C84.1183 15.3722 83.8649 14.9792 83.5288 14.6903C83.1926 14.4015 82.7736 14.2571 82.2717 14.2571C81.765 14.2571 81.3389 14.4015 80.9933 14.6903C80.6523 14.9792 80.3943 15.3722 80.2191 15.8693C80.0487 16.3665 79.9634 16.9323 79.9634 17.5668C79.9634 18.2012 80.0487 18.767 80.2191 19.2642C80.3943 19.7614 80.6523 20.1544 80.9933 20.4432C81.3389 20.7273 81.765 20.8693 82.2717 20.8693ZM89.5941 27.0909V12.0909H92.5771V13.9233H92.712C92.8446 13.6297 93.0363 13.3314 93.2873 13.0284C93.543 12.7206 93.8744 12.465 94.2816 12.2614C94.6935 12.053 95.2049 11.9489 95.8157 11.9489C96.6112 11.9489 97.3451 12.1572 98.0174 12.5739C98.6897 12.9858 99.2272 13.6084 99.6296 14.4418C100.032 15.2704 100.233 16.3097 100.233 17.5597C100.233 18.7765 100.037 19.804 99.6438 20.642C99.2556 21.4754 98.7253 22.1075 98.0529 22.5384C97.3853 22.9645 96.6372 23.1776 95.8086 23.1776C95.2215 23.1776 94.7219 23.0805 94.31 22.8864C93.9028 22.6922 93.569 22.4484 93.3086 22.1548C93.0482 21.8565 92.8493 21.5559 92.712 21.2528H92.6197V27.0909H89.5941ZM92.5558 17.5455C92.5558 18.1941 92.6457 18.7599 92.8256 19.2429C93.0056 19.7259 93.266 20.1023 93.6069 20.3722C93.9478 20.6373 94.3621 20.7699 94.8498 20.7699C95.3422 20.7699 95.7589 20.6349 96.0998 20.3651C96.4407 20.0904 96.6987 19.7116 96.8739 19.2287C97.0539 18.741 97.1438 18.1799 97.1438 17.5455C97.1438 16.9157 97.0562 16.3617 96.881 15.8835C96.7058 15.4053 96.4478 15.0312 96.1069 14.7614C95.766 14.4915 95.3469 14.3565 94.8498 14.3565C94.3574 14.3565 93.9407 14.4867 93.5998 14.7472C93.2636 15.0076 93.0056 15.3769 92.8256 15.8551C92.6457 16.3333 92.5558 16.8968 92.5558 17.5455ZM101.689 19.9105H104.623C104.637 20.2704 104.798 20.5545 105.105 20.7628C105.413 20.9711 105.811 21.0753 106.299 21.0753C106.791 21.0753 107.205 20.9616 107.542 20.7344C107.878 20.5024 108.046 20.1709 108.046 19.7401C108.046 19.4749 107.98 19.2453 107.847 19.0511C107.714 18.8523 107.53 18.696 107.293 18.5824C107.056 18.4687 106.782 18.4119 106.469 18.4119H104.9V16.4304H106.469C106.938 16.4304 107.298 16.3215 107.549 16.1037C107.804 15.8859 107.932 15.6136 107.932 15.2869C107.932 14.9176 107.8 14.6217 107.534 14.3991C107.274 14.1719 106.921 14.0582 106.476 14.0582C106.026 14.0582 105.652 14.16 105.354 14.3636C105.06 14.5625 104.909 14.8229 104.9 15.1449H101.98C101.99 14.4915 102.186 13.9257 102.57 13.4474C102.958 12.9692 103.479 12.5999 104.132 12.3395C104.791 12.0791 105.527 11.9489 106.341 11.9489C107.231 11.9489 107.998 12.0743 108.642 12.3253C109.291 12.5715 109.788 12.9242 110.134 13.3835C110.484 13.8428 110.659 14.3897 110.659 15.0241C110.659 15.6018 110.47 16.0848 110.091 16.473C109.712 16.8613 109.182 17.1383 108.5 17.304V17.4176C108.95 17.446 109.357 17.5668 109.722 17.7798C110.087 17.9929 110.378 18.2865 110.596 18.6605C110.813 19.0298 110.922 19.4678 110.922 19.9744C110.922 20.6515 110.723 21.2315 110.326 21.7145C109.933 22.1974 109.388 22.5691 108.692 22.8295C108.001 23.0852 107.208 23.2131 106.313 23.2131C105.442 23.2131 104.66 23.0876 103.969 22.8366C103.283 22.581 102.736 22.2069 102.328 21.7145C101.926 21.2221 101.713 20.6207 101.689 19.9105ZM115.668 19.0085L119.596 12.0909H122.579V23H119.695V16.0611L115.782 23H112.778V12.0909H115.668V19.0085ZM132.597 16.3381V18.7173H126.901V16.3381H132.597ZM127.895 12.0909V23H125.004V12.0909H127.895ZM134.493 12.0909V23H131.624V12.0909H134.493ZM138.317 27.0909C137.934 27.0909 137.574 27.0601 137.238 26.9986C136.906 26.9418 136.632 26.8684 136.414 26.7784L137.096 24.5199C137.451 24.6288 137.771 24.688 138.055 24.6974C138.344 24.7069 138.592 24.6406 138.8 24.4986C139.013 24.3565 139.186 24.1151 139.319 23.7741L139.496 23.3125L135.583 12.0909H138.765L141.023 20.1023H141.137L143.417 12.0909H146.62L142.38 24.179C142.176 24.7661 141.899 25.2775 141.549 25.7131C141.203 26.1534 140.765 26.492 140.235 26.7287C139.705 26.9702 139.066 27.0909 138.317 27.0909Z");
    newPath.setAttribute("fill","white");

    newSvg.appendChild(newRect);
    newSvg.appendChild(newPath);
    button.appendChild(newSvg);

    buy_contaner.appendChild(button);
    buy.appendChild(buy_contaner);
    goods.appendChild(buy);

    div.appendChild(goods);

    var hr = document.createElement("hr");
    div.appendChild(hr);
    return div
}

function update_goods_list(){
    var list_of_params=document.getElementsByClassName("params_area")[0].getElementsByTagName("input");

    var categoris = global_xml.getElementsByTagName("sub_category");

    var list_of_gooods;
    var filters;
    for(var i =0;i<categoris.length;i++){
        if(categoris[i].getAttribute("type")==type){
            list_of_gooods = categoris[i].getElementsByTagName("item");
            filters = categoris[i].getElementsByTagName("filter");
            break;
        }
    }

    var list_of_id=[];

    for(var i=0;i<list_of_gooods.length;i++){
        list_of_id.push(i+1);
    }

    for(var i =0;i<filters.length;i++){
        if(filters[i].getAttribute("type")=="scroll"){
            


            var min = Number(document.getElementsByClassName("filters_area")[0].getElementsByClassName("filter")[i].getElementsByClassName("min")[0].value);
            var max=Number(document.getElementsByClassName("filters_area")[0].getElementsByClassName("filter")[i].getElementsByClassName("max")[0].value);

            for(var j=0;j<list_of_gooods.length;j++){

                if(filters[i].getAttribute("var")=="coast"){
                    var data = Number(list_of_gooods[j].getElementsByTagName("rubles")[0].innerHTML)+Number('.'+list_of_gooods[j].getElementsByTagName("kopecks")[0].innerHTML);
                    
                    if(!(data>min&&data<max)){

                        let indexToRemove = list_of_id.indexOf(j+1);
                        if(indexToRemove !== -1){

                            list_of_id.splice(indexToRemove,1);
                        }
                    }
                    
                }else{

                    var data = list_of_gooods[j].getElementsByTagName(filters[i].getAttribute("var"));

                    if(!(data>min&&data<max)){

                        let indexToRemove = list_of_id.indexOf(j+1);
                        if(indexToRemove !== -1){

                            list_of_id.splice(indexToRemove,1);
                        }
                    }
                }
            }
            
        }
        if(filters[i].getAttribute("type")=="simple"){
            var list_of_lable = document.getElementById(filters[i].getAttribute("var")).getElementsByClassName("brend");

            var list_of_checkbox={}
            var count_of_active=0;
            for(var j=0;j<list_of_lable.length;j++){
                var input = list_of_lable[j].getElementsByTagName("input")[0];
                list_of_checkbox[input.id]=input.checked;
                if(input.checked) count_of_active++;
            }

            if(count_of_active>0){
                for(var j=0;j<list_of_gooods.length;j++){
                    var elements =  global_xml.getElementsByTagName("item")[j].getElementsByTagName("element");

                    var variatail;
                    for(var z=0;z<elements.length;z++){
                        if(elements[z].getAttribute("type")==filters[i].getAttribute("var")){
                            variatail=elements[z];
                            break;
                        }
                    }
                    if(!list_of_checkbox[variatail.innerHTML]){
                        console.log("yep")
                        let indexToRemove = list_of_id.indexOf(j+1);
                        if(indexToRemove !== -1){

                            list_of_id.splice(indexToRemove,1);
                        }
                    }
                }
            }   
        }
    }

    var html_list_of_goods = document.getElementsByClassName("goods");
    for(var i =0;i<list_of_gooods.length;i++){
        html_list_of_goods[i].parentElement.style.display="none";

        var has_id =false
        for(var j=0;j<list_of_id.length;j++){  
            if(html_list_of_goods[i].id==list_of_id[j]) has_id=true;
        }
        if(has_id){
            html_list_of_goods[i].parentElement.style.display="block";
        }
    }

}

function buffer(){

    var min_coast;
    var max_coast;

    for(var i=0;i<list_of_params.length;i++){
        if(list_of_params[i].classList.contains("min")){
            min_coast = Number( list_of_params[i].value);
        }
        if(list_of_params[i].classList.contains("max")){
            max_coast = Number( list_of_params[i].value);
        }
    }

    console.log(min_coast);
    console.log(max_coast);
    for(var i=0;i<list_of_gooods.length;i++){
        var element_coast = Number(list_of_gooods[i].getElementsByClassName("coast")[0].getElementsByClassName("rubels")[0].innerHTML)+Number(list_of_gooods[i].getElementsByClassName("coast")[0].getElementsByClassName("kopecks")[0].innerHTML);
        
        if(!(element_coast>min_coast&&element_coast<max_coast)){
            console.log(list_of_gooods[i].parentElement);
            list_of_gooods[i].parentElement.style.display="none";
        }else{
            list_of_gooods[i].parentElement.style.display="block";
        }
    }

}