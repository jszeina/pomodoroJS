$(document).ready(function () {


	var pomodoro = 25, currentTime = Date.parse(new Date()), deadline, timeInterval, breakTime = 5, i;


	var clock = document.getElementById("clock-timer");
	var minutesSpan = clock.querySelector(".minutes");
	var secondsSpan = clock.querySelector(".seconds");

	$(".pomodoro-minutes-count").html(pomodoro);
	$(".break-minutes-count").html(breakTime);
	minutesSpan.innerHTML = ("0" + pomodoro).slice(-2);
	secondsSpan.innerHTML = "00";


	$("#pomodoro-plus-btn").click(function () {
		pomodoro++;
		if (pomodoro > 60 ) {
			pomodoro = 60;
		}

		$(".pomodoro-minutes-count").html(pomodoro);
		minutesSpan.innerHTML = ("0" + pomodoro).slice(-2);
	});

	$("#pomodoro-minus-btn").click(function () {
		pomodoro--;
		if (pomodoro < 1) {
			pomodoro = 1;
		}
		$(".pomodoro-minutes-count").html(pomodoro);
		minutesSpan.innerHTML = ("0" + pomodoro).slice(-2);
	});

	//Customise break length

	$("#break-plus-btn").click(function () {
		breakTime++;
		if (breakTime > 15) {
			breakTime = 15;
		}
		$(".break-minutes-count").html(breakTime);
	});

	$("#break-minus-btn").click(function () {
		breakTime--;
		if (breakTime < 1) {
			breakTime = 1;
		}
		$(".break-minutes-count").html(breakTime);
	});

		
	function getTimeLeft (end) {
		var total = Date.parse(end) - Date.parse(new Date());
		var seconds = Math.floor((total/1000) % 60);
		var minutes = Math.floor((total/1000/60) % 60);

		return {
			"total": total,
			"minutes": minutes,
			"seconds": seconds
		};
	}


	function startClock () {
		timeInterval = setInterval(function () {
			var t = getTimeLeft(deadline);
			minutesSpan.innerHTML = ("0" + t.minutes).slice(-2);
			secondsSpan.innerHTML = ("0" + t.seconds).slice(-2);
			$("title").html(("0" + t.minutes).slice(-2) + ":" + ("0" + t.seconds).slice(-2));

			if (t.total <= 0) { //If timer reaches zero, stop the timer and reset the clock
				clearInterval(timeInterval);
				if (i === 0) {
					startBreak();
				}

				else if (i === 1) {
					startPomodoro();
				}
			}
		}, 1000);
	}


	function startPomodoro () {
		minutesSpan.innerHTML = ("0" + pomodoro).slice(-2);
		secondsSpan.innerHTML = "00";
		$(".start-pomodoro, .break, .session-length").addClass('hidden');
		$(".reset").removeClass('hidden');
		$(".btn-count").prop("disabled", true);
		$("body").css('background-color', '#2ECC71');
		deadline = new Date(Date.parse(new Date()) + (pomodoro * 60 * 1000));
		startClock();
		i = 0;
	}

	function startBreak () {
		minutesSpan.innerHTML = ("0" + breakTime).slice(-2);
		secondsSpan.innerHTML = "00";
		$(".start-pomodoro, .break, .session-length").addClass('hidden');
		$(".reset").removeClass('hidden');
		$("body").css('background-color', '#3498DB');
		$(".btn-count").prop("disabled", true);
		deadline = new Date(Date.parse(new Date()) + (breakTime * 60 * 1000)); //Set deadline
		startClock();
		i = 1;
	}

	function resetClock () {
		$(".btn-count").prop("disabled", false);
		$("body").css('background-color', '#F1C40F');
		$(".start-pomodoro, .break, .session-length").removeClass('hidden');
		$(".reset").addClass('hidden');
		$(".minutes-count").html(pomodoro);
		$("title").html("Pomodoro")
		clearInterval(timeInterval);
		minutesSpan.innerHTML = ("0" + pomodoro).slice(-2);
		secondsSpan.innerHTML = "00";
		
	}


	$(".start-pomodoro").click(function() {
		startPomodoro();
	});



	$(".break").click(function () {
		startBreak();
	});

	//Reset the clock

	$(".reset").click(function () {
		resetClock();
	});
		
});
