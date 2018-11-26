  var config = {
    apiKey: "AIzaSyAtw_So1WhyVzk8IpVDRCUUDUmf8qefpos",
    authDomain: "train-scheduler-14a85.firebaseapp.com",
    databaseURL: "https://train-scheduler-14a85.firebaseio.com",
    projectId: "train-scheduler-14a85",
    storageBucket: "train-scheduler-14a85.appspot.com",
    messagingSenderId: "429017183607"
  };
  firebase.initializeApp(config);

  var trainDatabase = firebase.database();

  $("#train-submit").on("click", function(event){
      event.preventDefault();
  
  var train = $("#train-name").val().trim();
  var trainDest = $("#train-destination").val().trim();
  var trainTime = $("#train-time").val().trim();
  var trainFreq = $("#frequency-time").val().trim();

  var newTrain = {
      name: train,
      destination: trainDest,
      startTime: trainTime,
      frequency: trainFreq
  };

  trainDatabase.ref().push(newTrain)

    $("#train-name").val("");
	$("#train-destination").val("");
	$("#train-time").val("");
	$("#frequency-time").val("");

});

trainDatabase.ref().on("child_added", function(childSnapshot, prevChildKey) {
  			console.log(childSnapshot.val());

  		
			var train = childSnapshot.val().name; 
			var trainDest = childSnapshot.val().destination; 
			var trainTime = childSnapshot.val().startTime; 
            var trainFreq = childSnapshot.val().frequency; 
			console.log(trainTime);

var startTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");

			var newTime = moment().diff(moment(startTimeConverted), "minutes");

		
			var tRemainder = newTime % trainFreq;

		
			var minAway = trainFreq - tRemainder;

			
        	var nextArrival = moment().add(minAway, "minutes").format("hh:mm A");

             var newRow = $("<tr>").append(
                $("<td>").text(train),
                $("<td>").text(trainDest),
                $("<td>").text(trainFreq),
                $("<td>").text(trainTime),
                $("<td>").text(minAway)
  );

  
  $("#schedule > tbody").append(newRow);
});

	function currentTime() {
		var sec = 1;	
		time = moment().format('HH:mm:ss');
		searchTime = moment().format('HH:mm');
			$('#clock').html(time);

			t = setTimeout(function() {
				currentTime();
			}, sec * 1000);	
	}
	currentTime(); 

	

       