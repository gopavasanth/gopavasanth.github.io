$(document).ready(function() {
  let clock;

  // Use moment.tz for both current and target time to avoid timezone issues
  let currentDate = moment.tz("Asia/Kolkata");
  let targetDate = moment.tz("2025-07-30 17:00", "Asia/Kolkata"); // 17:00 = 5:00 PM

  // Calculate the difference in seconds
  let diff = targetDate.diff(currentDate, 'seconds');

  if (diff <= 0) {
    // If remaining countdown is 0
    clock = $(".clock").FlipClock(0, {
      clockFace: "DailyCounter",
      countdown: true,
      autostart: false
    });
    console.log("Date has already passed!")
    
  } else {
    // Run countdown timer
    clock = $(".clock").FlipClock(diff, {
      clockFace: "DailyCounter",
      countdown: true,
      callbacks: {
        stop: function() {
          console.log("Timer has ended!")
        }
      }
    });
    
    // Check when timer reaches 0, then stop at 0
    setTimeout(function() {
      checktime();
    }, 1000);
    
    function checktime() {
      t = clock.getTime();
      if (t <= 0) {
        clock.setTime(0);
      }
      setTimeout(function() {
        checktime();
      }, 1000);
    }
  }
});
