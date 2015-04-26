//*******************************************//
// Booking.com Technical Test
// 
// Author: Antonieta Rodriguez G.
// email: anto_rg24@hotmail.com
//
// April 2015
//
//*******************************************//

//Initializing functions
$(document).ready(function () {

    //rotation speed and timer
    var speed = 5000;
    var run = setInterval('rotate()', speed);    
    
    //grab the width and calculate left value
    var item_width = $('#slides li').outerWidth(); 
    var left_value =  0;

    //set the information of the first image in the bottom label
    $('#imageInformation').text($('#carousel').find('img').attr('alt'));
        
    //move the last item before first item, just in case user click "previous" button
    $('#slides li:first').before($('#slides li:last'));
    
    //set the default item to the correct position 
    $('#slides ul').css({'left' : left_value});

    //function for "previous" button
    $('#prev').click(function() {
		
        //get the right position            
        var left_indent = parseInt($('#slides ul').css('left')) + item_width;

        //slide the item            
        $('#slides ul').animate({'left' : left_indent}, 200,function(){    

            //move the last item and put it as first item                
            $('#slides li:first').before($('#slides li:last'));           

            //set the default item to correct position
            $('#slides ul').css({'left' : left_value});
        
        });

        //cancel the link behavior            
        return false;
            
    });

    //function for "next" button
    $('#next').click(function() {
        
        //get the right position
        var left_indent = parseInt($('#slides ul').css('left')) - item_width;
        
        //slide the item
        $('#slides ul').animate({'left' : left_indent}, 200, function () {
            
            //move the first item and put it as last item
            $('#slides li:last').after($('#slides li:first'));                     
            
            //set the default item to correct position
            $('#slides ul').css({'left' : left_value});
        
        });
           
        //set the information of the image in the bottom label
        $('#imageInformation').text($('#carousel').find('img').attr('alt'));

        //cancel the link behavior
        return false;
      
        
    });        
    
    //if mouse hover, pause the auto rotation, otherwise rotate it
    $('#slides').hover(
        
        function() {
			//clean timer to avoid skips in the image display
            clearInterval(run);
        }, 
        function() {
			//start animation
            run = setInterval('rotate()', speed);    
        }
    ); 
        
});


//function called by the timer, triggering the "next" click function 
function rotate() {
    $('#next').click();
}

///----------------------------------------------------------------------------------------------------------///

//click function for occupancy and price columns 
$('.room_occupancy, .room_price ').click(function () {

    //retrieve the table object 
    var table = $(this).parents('table').eq(0)

    //retrieve the valid row to sort and call the sorter function
    var rows = table.find('tr.one_room').toArray().sort(comparer($(this).index()))

    //validate the ascending/descending order for the sort case  
    this.asc = !this.asc

    if (!this.asc) {
        rows = rows.reverse()
    }
	
    for (var i = 0; i < rows.length; i++) {

        table.append(rows[i]);
    }
});

// receive two columns and compare them
function comparer(index) {

    return function (rowA, rowB) {
    
        //extracting values from row received in parameters
        var valA = getCellValue(rowA, index);
        var valB = getCellValue(rowB, index);


        //if the value to be sorted contains the euro symbol
        if (valA.indexOf('\u20ac') != -1) {
            valA = valA.replace('\u20ac', '');
            valA = Number(valA);
        }

        if (valB.indexOf('\u20ac') != -1) {               
            valB = valB.replace('\u20ac', '');
            valB = Number(valB);
        }
       
        // evaluate the parameter data and do the sorting process
        return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.localeCompare(valB);
    }
}

//Extract the value of the rows to be sorted 
function getCellValue(row, index) {

    return $(row).children('td').eq(index).html();
}