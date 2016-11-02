$(window).on("load resize", function(){
$(".thumbpropio").css("height",$(".thumbpropio").innerWidth())
for(var i=0; i<$(".thumbpropio>img").length; i++){
  if($($(".thumbpropio>img")[i]).innerWidth()<$($(".thumbpropio>img")[i]).innerHeight()){
    $($(".thumbpropio>img")[i]).css({
      height: "100%",
      width: "auto"
    })
  }
}
})

$("#commentFeed").on("mouseenter mouseleave", ".comment", function(){
  $(this).children("form").children(".btn-danger").toggleClass("hidden")
  $(this).children(".edit").toggleClass("hidden")
})

$("#commentFeed").on("click", ".edit", function(){
  $(this).parent().children(".editForm, .c_body").toggleClass("hidden")
})

$("#commentFeed").on("click",".cancelEdit",function(){
  $(this).parent().parent().children(".editForm, .c_body").toggleClass("hidden")
})

$(".editUser").click(function(){
  $(this).prevUntil("strong").toggleClass("hidden")
})

$("#"+$("#sex").text().toLowerCase()).attr("checked", "checked")
