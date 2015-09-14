//= require_tree .

$(function(){
  $('#toggle').click(function(){
  	$(this).toggleClass('active');
  	$('nav ul').toggleClass('active');
  });
  $('nav ul').click(function(){ 
  	$(this).toggleClass('active');
  	$('#toggle').toggleClass('active');
  });
});

