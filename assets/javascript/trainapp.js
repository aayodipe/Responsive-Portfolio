$(document).ready(function () {
     //Initialize Firebase
     var config = {
          apiKey: "AIzaSyAY5gwnrVbokOMDTLedvL1YCnA_RKdtwkA",
          authDomain: "fr-demo-app-2.firebaseapp.com",
          databaseURL: "https://fr-demo-app-2.firebaseio.com",
          projectId: "fr-demo-app-2",
          storageBucket: "fr-demo-app-2.appspot.com",
          messagingSenderId: "1029611183819"
     };
     // Initialize Firebase
     firebase.initializeApp(config);

     // Create a variable to reference the database
     let database = firebase.database()

     // Button for adding New Train
     $(".submit").on("click", function (event) {
          //Prevent default behaviour of submit event
          event.preventDefault()
         
           // Get form value
          let trainName = $("#train-name").val().trim()
          let destination = $("#destination").val().trim()
          let trainFirstTime = $("#train-time").val().trim()
          let frequency = $("#frequency").val().trim()
          
         //Validate Form
          if(trainName ===""|| destination ===""|| trainFirstTime ===""|| frequency ===""){
               updateTrain("Please provide train details", "train-not-added")
          }else{
                    let trainData = {
                         Train_Name: trainName,
                         Destination: destination,
                         Frequency: frequency,
                         TrainFirstTime:trainFirstTime    
                    }
                    // Push data to firebase database
                    database.ref().push(trainData)

                    //clear the input field                  
                    $("#train-name").val("")
                    $("#destination").val("")
                    $("#train-time").val("")
                    $("#frequency").val("")
 
                    //Add more train successful
                     updateTrain("New Train Added Successful","train-added")
               }
               //Set timeOut 
               setTimeout(function() {
                    document.querySelector("#train-update-div").remove()},3000)
          
               })

     database.ref().on("child_added", function (snapshot) {
        //set the snapshot to sv
               var sv= snapshot.val();
         
            //Assign Friquency to sv.frequency
               tFrequency = sv.Frequency
            
               firstTrain = sv.TrainFirstTime
                        
               var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
               var currentTime = moment();
              
            
               var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
               console.log(diffTime);
            
               var tRemainder = diffTime % tFrequency;
               console.log(tRemainder);
            
               var tMinutesTillTrain = tFrequency - tRemainder;
               var nextTrain = moment().add(tMinutesTillTrain, "minutes");
              
               var nextArrival = moment(nextTrain).format("LT");

               //Populae to HTML
               let tr = $("<tr>").addClass("table-tr")
                                 .append(
                    $("<td>").text(sv.Train_Name),
                    $("<td>").text(sv.Destination),
                    $("<td>").text(sv.Frequency),                    
                    $("<td>").text(nextArrival),
                    $("<td>").text(tMinutesTillTrain),
                    $("<button>").text("x").addClass("delete-button mt-2 mr-3")
                   )
                    tr.appendTo("tbody")
                     // Handle the errors
               }, function(errorObject) {
                    console.log("Errors handled: " + errorObject.code);
     })    
     //Add more train
     function updateTrain(msg, color){
          let newTrainAdded = $("<div>")
                               .attr("id", "train-update-div")
                               .addClass(color)
                               .text(msg)
                               .appendTo(".train-update")
          } 
          
         $(".delete-button").on("click",function(e){
                  e.preventDefault()
                  let removeTrain = e.target.parentNode.remove()
       
          
         })
})