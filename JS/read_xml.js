function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; // Максимум и минимум включаются
  }

function intemediate_audio_page(){

var xhttp = new XMLHttpRequest();

xhttp.open("GET","../resurces/xml/audio_microphones_and_headphones.xml",true);


xhttp.onreadystatechange = function(){

    if (this.readyState == 4 && this.status == 200) {
        var xml_text = xhttp.responseText;

        var parser= new DOMParser();

        var xml_doc=parser.parseFromString(xml_text,"text/xml")

        var xml_items = xml_doc.getElementsByTagName("item");
        
        var products=[];
        for(var i=0;i<xml_items.length;i++){
            var product={};
            product.name = xml_items[i].getElementsByTagName("name")[0].childNodes[0].nodeValue;
            product.id = xml_items[i].getElementsByTagName("id")[0].childNodes[0].nodeValue;
            product.rubles = xml_items[i].getElementsByTagName("coast")[0].getElementsByTagName("rubles")[0].childNodes[0].nodeValue;
            product.kopecks = xml_items[i].getElementsByTagName("coast")[0].getElementsByTagName("kopecks")[0].childNodes[0].nodeValue;
            product.main_img = xml_items[i].getElementsByTagName("main_img")[0].childNodes[0].nodeValue;

            //console.log(xml_items[i].getElementsByTagName("main_img")[0].childNodes[0].nodeValue);

            products.push(product);
        }

        build_examples_bar(products);
    }
}

xhttp.send();

}

function build_examples_bar(products=[]){
    var examples = document.getElementsByClassName("goods");

    var used_id = [];
    for(var i =0;i<16;i++){
        var goods_id = getRandomInt(0,products.length-1);

        var is_new_id=true;
        for(var j=0;j<used_id.length;){
            if(used_id[j]==goods_id){
                var goods_id = getRandomInt(0,products.length-1);
                j=0;
            }else{
                j++
            }
            console.log("j: "+j+" random: "+goods_id);
        }

        if(is_new_id){
            used_id.push(goods_id)

            examples[i].getElementsByClassName("contaner")[0].getElementsByClassName("name_area")[0].getElementsByClassName("name")[0].innerText='"'+products[goods_id].name+'"';
            examples[i].getElementsByClassName("contaner")[0].getElementsByClassName("coast_contaner")[0].getElementsByClassName("rubels")[0].innerText=products[goods_id].rubles;
            examples[i].getElementsByClassName("contaner")[0].getElementsByClassName("coast_contaner")[0].getElementsByClassName("kopecks")[0].innerText='.'+products[goods_id].kopecks;
            examples[i].getElementsByClassName("contaner")[0].getElementsByTagName("a")[0].getElementsByTagName("img")[0].src=products[goods_id].main_img;
        }
        //console.log("used id-"+used_id);
    }

}