var params = new URLSearchParams(window.location.search);

var type = params.get("type");
var id = params.get("id");

console.log(type);
console.log(id);

if(type==null||id==null){
    build_clear();
}else{
    build_busket();
}


function build_clear(){
    console.log("clear");

    var contaner =document.createElement("div");
    contaner.className="contaner";

    var basket_head = document.createElement("div");
    var boady = document.createElement("div");

    basket_head.className="basket_head";
    boady.className="boady";

    basket_head.innerText="Моя корзина";

    var header= document.createElement("div");
    var text= document.createElement("div");

    header.className="header";
    text.className="text";

    header.innerText="В корзине еще нет товаров";

    var span = document.createElement("span");
    var a = document.createElement("a");

    span.innerText="Выберите нужный Вам товар из каталога";
    a.innerText=" Интернет-магазина";

    a.setAttribute("href", "main_page.html");

    text.appendChild(span);
    text.appendChild(a);
    boady.appendChild(header);
    boady.appendChild(text);
    contaner.appendChild(basket_head);
    contaner.appendChild(boady);

    document.getElementsByTagName("main")[0].appendChild(contaner);
}

function build_busket(){
    console.log("basket");

    var xhttp = new XMLHttpRequest();
    var xml_doc;
    xhttp.open("GET","../resurces/xml/goods.xml",true);

    xhttp.send();

    xhttp.onreadystatechange = function(){

    if (this.readyState == 4 && this.status == 200) {
        var xml_text = xhttp.responseText;

        var parser= new DOMParser();

        xml_doc=parser.parseFromString(xml_text,"text/xml")


        var sub_category=xml_doc.getElementsByTagName("sub_category");

        for(var i = 0;i<sub_category.length;i++){
            if(sub_category[i].getAttribute("type")==type){
                sub_category = sub_category[i];
                break;
            }
        }

        var xml_elem = sub_category.getElementsByTagName("item");

        for(var i=0;i<xml_elem.length;i++){
            if(xml_elem[i].getElementsByTagName("id")[0].innerHTML==id){
                xml_elem=xml_elem[i];
                break;
            }
        }
        var goods= document.createElement("div");
        goods.className="goods";

        var basket_head = document.createElement("div");
        basket_head.className="basket_head";
        basket_head.innerText="Моя корзина";

        goods.appendChild(basket_head);
        goods.appendChild(build_elem(xml_elem))



        document.getElementsByTagName("main")[0].appendChild(goods);

        var buy_area=document.createElement("div");
        buy_area.className="buy_ara";

        var area= document.createElement("div");
        area.className="area";

        buy_area.appendChild(area);

        var head = document.createElement("div");
        head.className="head";
        head.innerHTML = "Ваш заказ";

        area.appendChild(head);

        var goods_list =document.createElement("div");
        goods_list.className="goods_list";
        area.append(goods_list);

        var list =document.createElement("table");
        list.className ="list";
        goods_list.appendChild(list);

        var tbody =document.createElement("tbody");
        list.appendChild(tbody);

        var result =document.createElement("div");
        result.className = "result";
        area.appendChild(result);

        var hr = document.createElement("hr");
        result.appendChild(hr);

        var coast =document.createElement("div");
        coast.className="coast";
        result.appendChild(coast);

        var result_new= document.createElement("div");
        var result_coast= document.createElement("div");

        result_new.className ="result";
        result_coast.className ="result_coast";

        result_new.innerHTML="Итого"

        coast.appendChild(result_new);
        coast.appendChild(result_coast);

        var button_buy = document.createElement("button");
        button_buy.className="button"
        button_buy.innerHTML ="Перейти к оформлению";

        result.appendChild(button_buy);

        document.getElementsByTagName("main")[0].appendChild(buy_area);
        

        var goodsContainers = document.querySelectorAll('.select_area');
    
        goodsContainers.forEach(function(container, index) {
            var checkbox = container.querySelector('input[type="checkbox"]');
            var div = container.querySelector('.border');

            div.addEventListener('click', function() {
                checkbox.checked = !checkbox.checked;
                rebuild_final_list()
            });
            checkbox.checked=true
        });
        rebuild_final_list()
    }
}
}

function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        
        return false;
    }
    return true;
}


function plus(element){
    console.log(element)

    element.parentNode.getElementsByTagName("input")[0].value++;
    rebuild_final_list();
}

function minus(element){
    console.log(element)
    if(element.parentNode.getElementsByTagName("input")[0].value>0){
    element.parentNode.getElementsByTagName("input")[0].value--;

    rebuild_final_list();
    }
}

function delete_goods(element)
{
    var element_to_remove = element.parentNode.parentNode.parentNode.parentNode.parentNode;

    element_to_remove.parentNode.removeChild(element_to_remove);

    rebuild_final_list();
}

function rebuild_final_list(){
    var list_goods = document.getElementsByClassName("goods")[0].getElementsByClassName("elem");

    if(list_goods.length>0){
        var tbody = document.getElementsByTagName("tbody")[0];

        tbody.parentNode.removeChild(tbody);

        var tbody_new = document.createElement("tbody");

        document.getElementsByTagName("table")[0].appendChild(tbody_new);

        for(var i = 0;i<list_goods.length; i++){
            console.log(i);
            if(list_goods[i].getElementsByClassName("select_area")[0].getElementsByTagName("input")[0].checked){
                console.log("hi")
            document.getElementsByTagName("tbody")[0].appendChild(build_elem_of_final_list(list_goods[i]))
            }
        }

        document.getElementsByClassName("result_coast")[0].innerText = recalculation_final_price();
    } else
    {
        var goods = document.getElementsByClassName("goods")[0];
        var buy_ara = document.getElementsByClassName("buy_ara")[0];

        goods.parentNode.removeChild(goods);
        buy_ara.parentNode.removeChild(buy_ara);

        build_clear();
    }
}

function build_elem_of_final_list(element){

    console.log("hi");

    var elem = document.createElement('tr');
    elem.className="elem";

    var name = document.createElement("td");
    var coast = document.createElement("td");

    name.className="name";
    coast.className="coast";

    console.log()

    name.innerHTML = element.getElementsByClassName("info")[0].getElementsByClassName("name")[0].innerText +' ('+element.getElementsByClassName("intaractive")[0].getElementsByTagName("input")[0].value+')';

    var rubels = document.createElement("span");
    var kopecks = document.createElement("span");

    rubels.className="rubels"
    kopecks.className="kopecks";

    rubels.innerText = element.getElementsByClassName("coast")[0].getElementsByClassName("rubels")[0].innerHTML;
    kopecks.innerText = element.getElementsByClassName("coast")[0].getElementsByClassName("kopecks")[0].innerHTML;

    coast.appendChild(rubels);
    coast.appendChild(kopecks);
    elem.appendChild(name)
    elem.appendChild(coast);

    console.log(elem)

    return elem;;
}

function recalculation_final_price(){
    var final_price = 0;

    var list_goods = document.getElementsByClassName("goods")[0].getElementsByClassName("elem");

    for(var i = 0;i<list_goods.length; i++){
        if(list_goods[i].getElementsByClassName("select_area")[0].getElementsByTagName("input")[0].checked){
            var coast =Number(list_goods[i].getElementsByClassName("coast")[0].getElementsByClassName("rubels")[0].innerText) + Number(list_goods[i].getElementsByClassName("coast")[0].getElementsByClassName("kopecks")[0].innerText)
            coast = coast * list_goods[i].getElementsByClassName("intaractive")[0].getElementsByTagName("input")[0].value;

            final_price+=coast;
        }
    }

    return final_price.toFixed(2);
}

function build_elem(xml_elem){
        var elem = document.createElement("div");
        elem.className = "elem";

        var hr = document.createElement("hr");
        elem.appendChild(hr);

        var contaner = document.createElement("div");
        contaner.className="contaner";
        elem.appendChild(contaner);

        var select_area= document.createElement("div");
        var image= document.createElement("div");
        var info= document.createElement("div");
        var intaractive= document.createElement("div");
        var coast= document.createElement("div");

        select_area.className="select_area";
        image.className = "image";
        info.className="info";
        intaractive.className="intaractive";
        coast.className="coast"

        contaner.appendChild(select_area);
        contaner.appendChild(image);
        contaner.appendChild(info);
        contaner.appendChild(intaractive);
        contaner.appendChild(coast);

        var div = document.createElement("div");
        select_area.appendChild(div);

        var checkbox = document.createElement("input");
        checkbox.setAttribute("type","checkbox");
        checkbox.id = xml_elem.getElementsByTagName("id")[0].innerHTML;

        div.appendChild(checkbox);

        var border = document.createElement("div");
        border.className ="border";
        border.setAttribute("for",xml_elem.getElementsByTagName("id")[0].innerHTML);

        div.appendChild(border)

        var contant = document.createElement("div");
        contant.className="contant";

        border.appendChild(contant);

        var svg = document.createElementNS("http://www.w3.org/2000/svg","svg");
        svg.setAttribute("widht","17");
        svg.setAttribute("height","17");
        svg.setAttribute("xmlns","http://www.w3.org/2000/svg");

        contant.appendChild(svg);

        var path = document.createElementNS("http://www.w3.org/2000/svg","path");
        path.setAttribute("stroke","#FFF");
        path.setAttribute("stroke-width","2");
        path.setAttribute("d","m1 12 4 4L16 1");
        path.setAttribute("fill","none");
        path.setAttribute("fill-rule","evenodd");
        path.setAttribute("stroke-linecap","round");
        path.setAttribute("stroke-linejoin","round");
        
        svg.appendChild(path);
        
        var img = document.createElement("img");
        img.setAttribute("src",xml_elem.getElementsByTagName("main_img")[0].innerHTML);
        image.appendChild(img);
        
        var contaner_1 = document.createElement("div");
        contaner_1.className="contaner";
        info.appendChild(contaner_1);
        
        var name = document.createElement('div');
        var status = document.createElement('div');
        
        name.className="name";
        status.className="status";
        contaner_1.appendChild(name);
        contaner_1.appendChild(status);

        name.innerHTML = xml_elem.getElementsByTagName("name")[0].innerHTML;

        var curcle = document.createElement("div");
        var text = document.createElement("div");

        curcle.className="curcle";
        text.className="text";

        status.appendChild(curcle);
        status.appendChild(text);

        if(xml_elem.getElementsByTagName("status")[0].getAttribute("mode")=="in_stock"){
            curcle.style.backgroundColor="#2FD620";
        }else if(xml_elem.getElementsByTagName("status")[0].getAttribute("mode")=="from_the_showcase"){
            curcle.style.backgroundColor="#DB5C00";
        }

        text.innerText = xml_elem.getElementsByTagName("status")[0].innerHTML;


        var contaner_2= document.createElement("div");
        contaner_2.className = "contaner";
        intaractive.appendChild(contaner_2);

        var input = document.createElement("div");
        var delete_button = document.createElement("div");

        input.className="input";
        delete_button.className="delete";

        contaner_2.append(input);
        contaner_2.appendChild(delete_button);

        var minus = document.createElement("button");
        var count = document.createElement("input");
        var plus = document.createElement("button");

        minus.className="minus";
        minus.setAttribute("onclick","minus(this)");
        plus.className="plus";
        plus.setAttribute("onclick","plus(this)");
        count.setAttribute("type","text");
        count.setAttribute("onkeypress","return isNumberKey(event)");
        count.value=1;

        input.appendChild(minus)
        input.appendChild(count)
        input.appendChild(plus)

        var plus_content = document.createElement("span");
        var minus_content = document.createElement("span");

        plus_content.innerText="+";
        minus_content.innerText="-";

        minus.appendChild(minus_content);
        plus.appendChild(plus_content);

        var a_delete= document.createElement("a");
        a_delete.setAttribute("onclick","delete_goods(this)");
        delete_button.appendChild(a_delete);

        var a_contant=document.createElement("span");
        a_contant.innerText = "Удалить";
        a_delete.appendChild(a_contant);

        var contaner_3 = document.createElement("div");
        contaner_3.className="contaner"
        coast.appendChild(contaner_3);

        var rubels =document.createElement("span");
        var kopecks =document.createElement("span");

        rubels.className="rubels";
        kopecks.className="kopecks";

        rubels.innerText=xml_elem.getElementsByTagName("rubles")[0].innerHTML;
        kopecks.innerText='.'+xml_elem.getElementsByTagName("kopecks")[0].innerHTML;

        contaner_3.appendChild(rubels)
        contaner_3.appendChild(kopecks)

        return elem;
}