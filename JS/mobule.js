var is_active_burger = false;
function on_burger_click(){
    is_active_burger=!is_active_burger;

    if(is_active_burger){
       var obj= document.getElementsByClassName("hover_widnow")[0];
       obj.style.display = "flex";
    }else{
        document.getElementsByClassName("hover_widnow")[0].style.display = "none";
    }
}