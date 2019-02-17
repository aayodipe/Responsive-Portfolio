$('.nav-toggle').click(function (e) {

     e.preventDefault();
     $("html").toggleClass("openNav");
     $(".nav-toggle").toggleClass("active");

});

 $(document).ready(function () {

      const setTypeWriter = () => {
        $("#example1").typewriter({
          text: "Hi there!, My name is Adeyemi Ayodipe",
          waitingTime: 500,
          delay: 100,
          hide: 1,
          cursor: true,
        });

      }
      setTypeWriter()
    });

    $(document).ready(function () {
    
     let greeting = 'Hi there! My name is'
     name = 'Adeyemi Ayodipe'
         title = `A web & Application Full Stack Developer, and Critical Thinking Problem
         Solver.`
         grad = 'A Coding BootCamp Graduate.'


     setTypeWriter('.greeting',greeting, 0, 100, false)
      setTypeWriter('.name',name,2500, 150, false)
      setTypeWriter('.disc',title,5000, 100, false)
      setTypeWriter('.grad',grad,10000, 100, false)


     function setTypeWriter(id, text, waitingTime,delay,hide,  cursor){
          $(id).typewriter({
            text:text,
            waitingTime: waitingTime,
            delay: delay,
            hide: hide,
            cursor: cursor,
          });
   
        }
     
   });



   (function ($) {

     $.fn.typewriter = function (options) {
       var settings = $.extend({
         text: $(this).attr("tw-text"),
         delay: 10,
         waitingTime: 1000,
         cursor: false,
         hide: 0,
       }, options);


       var item = $(this); //Our element
       var i = 0; //Current char index
       //Function for adding char
       function startType() {
         //If cursor is enabled, we're adding our class.
         if (i == 0 && settings.cursor == true) {
           item.addClass("tw-cursor");
         }
         //This is where the magic happens
         if (i < settings.text.length) {
           item.append(settings.text.charAt(i));
           i++;
           //Call function again
           setTimeout(startType, settings.delay);
         }
         //If the whole text appears, we're removing our class.
         else {
           item.removeClass("tw-cursor");
           //Hide element if it necessary.
           if (settings.hide > 0) {
             setTimeout(function () {
               item.fadeOut();
             }, settings.hide);
           }
         }
       }
       //Call our function for the first time.
       setTimeout(startType, settings.waitingTime);
     };
   }(jQuery));