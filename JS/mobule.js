var is_active_burger = false;
var is_active_filters = false;
function on_burger_click(){
    is_active_burger=!is_active_burger;

    if(is_active_burger){
       var obj= document.getElementsByClassName("hover_widnow")[0];
       obj.style.display = "flex";
    }else{
        document.getElementsByClassName("hover_widnow")[0].style.display = "none";
    }
}

function on_mobyle_filter_button_click(){
    is_active_filters=!is_active_filters;

    if(is_active_filters){
        document.getElementsByClassName("intermaediate_area")[0].style.display = "block";
        document.getElementsByClassName("goods_area")[0].style.display = "none";
        document.getElementsByTagName("footer")[0].style.display="none"

        document.getElementsByClassName("mobyle_extra_erea")[0].style.background="#000000"
        }else{
        document.getElementsByClassName("intermaediate_area")[0].style.display = "none";
        document.getElementsByClassName("goods_area")[0].style.display = "flex";
        document.getElementsByTagName("footer")[0].style.display="block"

        document.getElementsByClassName("mobyle_extra_erea")[0].style.background="#1f1f1f"
    }
}