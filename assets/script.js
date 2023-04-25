  var local = {};
  dayjs.locale(local);
 
  $(function () {

    var hour = dayjs().format('H');
 
    function blockColor() {
      $('.time-block').each(function() {
        var sectionTime = parseInt(this.id);
        $(this).toggleClass('past', sectionTime < hour);
        $(this).toggleClass('present', sectionTime === hour);
        $(this).toggleClass('future', sectionTime > hour);
      });
    }

    function setColor() {
      $('.time-block').each(function() {
        var sectionTime = parseInt(this.id);
        if (sectionTime == hour) {
          $(this).removeClass('past future').addClass('present');
        } else if (sectionTime < hour) {
          $(this).removeClass('future present').addClass('past');
        } else {
          $(this).removeClass('past present').addClass('future');
        }
      });
    }

    function updateTime() {
      var date = $('#date');
      var currentDate = dayjs().format('dddd, MMMM D, YYYY');
      date.text(currentDate);
    }

    function enterText() {
      $('.saveBtn').on('click', function() {
        var key = $(this).parent().attr('id');
        var value = $(this).siblings('.description').val();
        localStorage.setItem(key, value);
      });
    }

    $('.time-block').each(function() {
      var key = $(this).attr('id');
      var value = localStorage.getItem(key);
      $(this).children('.description').val(value);
    });
  
    blockColor();
    setColor();
    enterText();                
  
    setInterval(updateTime, 1000);
  });
