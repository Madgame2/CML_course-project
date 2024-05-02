function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; // Максимум и минимум включаются
  }



var audio_products=[];
var name_of_audo_cateforis=[]
function build_audio_products(xml_doc){
    

    var category =xml_doc.getElementsByTagName("category");

    
    for(var i= 0;i< category.length;i++){
        if(category[i].getAttribute("type")=="audio"){

            var sub_categoris=category[i].getElementsByTagName("sub_category");
            var syb_categoris_arr={}
            
            for(var j=0;j<sub_categoris.length;j++){
                var syb_categoris_arr_goods=[]

                var syb_categoris_items=sub_categoris[j].getElementsByTagName("item");
                for(var k=0;k<syb_categoris_items.length;k++){
                    var product={};
                    product.name = syb_categoris_items[k].getElementsByTagName("name")[0].childNodes[0].nodeValue;
                    product.id = syb_categoris_items[k].getElementsByTagName("id")[0].childNodes[0].nodeValue;
                    product.rubles = syb_categoris_items[k].getElementsByTagName("coast")[0].getElementsByTagName("rubles")[0].childNodes[0].nodeValue;
                    product.kopecks = syb_categoris_items[k].getElementsByTagName("coast")[0].getElementsByTagName("kopecks")[0].childNodes[0].nodeValue;
                    product.main_img = syb_categoris_items[k].getElementsByTagName("main_img")[0].childNodes[0].nodeValue;

                    syb_categoris_arr_goods.push(product)

                    //console.log(syb_categoris_arr_goods);
                }

                name_of_category =sub_categoris[j].getAttribute("type");
                name_of_audo_cateforis.push(name_of_category);

                syb_categoris_arr[name_of_category]=syb_categoris_arr_goods;
            }

            audio_products.push(syb_categoris_arr);
        }
    }
    console.log(audio_products);
}


var name_of_video_cateforis=[]
var video_products=[];
function build_video_products(xml_doc){

    var category =xml_doc.getElementsByTagName("category");

    for(var i= 0;i< category.length;i++){
        if(category[i].getAttribute("type")=="video"){

            var sub_categoris=category[i].getElementsByTagName("sub_category");
            var syb_categoris_arr={}
            
            for(var j=0;j<sub_categoris.length;j++){
                var syb_categoris_arr_goods=[]

                var syb_categoris_items=sub_categoris[j].getElementsByTagName("item");
                for(var k=0;k<syb_categoris_items.length;k++){
                    var product={};
                    product.name = syb_categoris_items[k].getElementsByTagName("name")[0].childNodes[0].nodeValue;
                    product.id = syb_categoris_items[k].getElementsByTagName("id")[0].childNodes[0].nodeValue;
                    product.rubles = syb_categoris_items[k].getElementsByTagName("coast")[0].getElementsByTagName("rubles")[0].childNodes[0].nodeValue;
                    product.kopecks = syb_categoris_items[k].getElementsByTagName("coast")[0].getElementsByTagName("kopecks")[0].childNodes[0].nodeValue;
                    product.main_img = syb_categoris_items[k].getElementsByTagName("main_img")[0].childNodes[0].nodeValue;

                    syb_categoris_arr_goods.push(product)

                    //console.log(syb_categoris_arr_goods);
                }

                name_of_category =sub_categoris[j].getAttribute("type");
                name_of_video_cateforis.push(name_of_category);

                syb_categoris_arr[name_of_category]=syb_categoris_arr_goods;
            }

            video_products.push(syb_categoris_arr);
        }
    }
    
}


function build_audio_examples_bar(xml_doc){


    build_audio_products(xml_doc);

    var examples = document.getElementsByClassName("goods");

    var used_id=[]
    for(var i=0; i<audio_products.length;i++){
        used_id[i] =[]
    }
    for(var i =0;i<examples.length;i++){
        var sub_category_id = getRandomInt(0,audio_products.length-1);
        var goods_id = getRandomInt(0,audio_products[sub_category_id][name_of_audo_cateforis[sub_category_id]].length-1);
    
        var is_new_id=true;
        for(var j=0;j<used_id[sub_category_id].length;){
            if(used_id[sub_category_id][j]==goods_id){
                var goods_id = getRandomInt(0,audio_products[sub_category_id][name_of_audo_cateforis[sub_category_id]].length-1);
                j=0;
            }else{
                j++
            }
        }

        if(is_new_id){
            used_id[sub_category_id].push(goods_id)

            examples[i].getElementsByClassName("contaner")[0].getElementsByClassName("name_area")[0].getElementsByClassName("name")[0].innerText=audio_products[sub_category_id][name_of_audo_cateforis[sub_category_id]][goods_id].name;
            examples[i].getElementsByClassName("contaner")[0].getElementsByClassName("coast_contaner")[0].getElementsByClassName("rubels")[0].innerText=audio_products[sub_category_id][name_of_audo_cateforis[sub_category_id]][goods_id].rubles;
            examples[i].getElementsByClassName("contaner")[0].getElementsByClassName("coast_contaner")[0].getElementsByClassName("kopecks")[0].innerText='.'+audio_products[sub_category_id][name_of_audo_cateforis[sub_category_id]][goods_id].kopecks;
            examples[i].getElementsByClassName("contaner")[0].getElementsByTagName("a")[0].getElementsByTagName("img")[0].src=audio_products[sub_category_id][name_of_audo_cateforis[sub_category_id]][goods_id].main_img;
            examples[i].getElementsByClassName("contaner")[0].getElementsByTagName("a")[0].setAttribute("href","product_window.html?type="+name_of_audo_cateforis[sub_category_id]+"&id="+Number(goods_id+1));
            examples[i].getElementsByClassName("contaner")[0].getElementsByClassName("button")[0].setAttribute("href","basket.html?type="+name_of_audo_cateforis[sub_category_id]+'&id='+Number(goods_id+1));
            console.log(name_of_audo_cateforis[sub_category_id]);
        }
    }

}

function build_video_examples_bar(xml_doc){

    //while(xml_doc==undefined);

    build_video_products(xml_doc);

    var examples = document.getElementsByClassName("goods");

    var used_id=[]
    for(var i=0; i<video_products.length;i++){
        used_id[i] =[]
    }
    for(var i =0;i<examples.length;i++){
        var sub_category_id = getRandomInt(0,video_products.length-1);
        var goods_id = getRandomInt(0,video_products[sub_category_id][name_of_video_cateforis[sub_category_id]].length-1);
    
        var is_new_id=true;
        for(var j=0;j<used_id[sub_category_id].length;){
            //if(used_id[sub_category_id][j]==goods_id){
                var goods_id = getRandomInt(0,video_products[sub_category_id][name_of_video_cateforis[sub_category_id]].length-1);
                //j=0;
           // }else{
                j++
            //}
        }

        if(is_new_id){
            used_id[sub_category_id].push(goods_id)

            examples[i].getElementsByClassName("contaner")[0].getElementsByClassName("name_area")[0].getElementsByClassName("name")[0].innerText=video_products[sub_category_id][name_of_video_cateforis[sub_category_id]][goods_id].name;
            examples[i].getElementsByClassName("contaner")[0].getElementsByClassName("coast_contaner")[0].getElementsByClassName("rubels")[0].innerText=video_products[sub_category_id][name_of_video_cateforis[sub_category_id]][goods_id].rubles;
            examples[i].getElementsByClassName("contaner")[0].getElementsByClassName("coast_contaner")[0].getElementsByClassName("kopecks")[0].innerText='.'+video_products[sub_category_id][name_of_video_cateforis[sub_category_id]][goods_id].kopecks;
            examples[i].getElementsByClassName("contaner")[0].getElementsByTagName("a")[0].getElementsByTagName("img")[0].src=video_products[sub_category_id][name_of_video_cateforis[sub_category_id]][goods_id].main_img;
        }
    }

}