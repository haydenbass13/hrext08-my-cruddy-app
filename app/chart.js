
var data = [
  ['sleep', 8],
  ['eat', 3],
  ['code', 7],
  ['relax', 2],
  ['other', 4]
];

var chart = c3.generate({
	bindto: '#chart',
    data: {
      columns: data,  
    type: 'pie'
    },
    pie: {
        label: {
            format: function(value, ratio, id) {
                return value + " hours"
            }
        }
    },
    color: {
        pattern: ['#D81159', '#8F2D56', '#218380', '#FBB13C', '#726DA8']
    }
});



$('#submit').on('click',function(){
    data[0][1] = $('#sleep').val();
    data[1][1] = $('#eat').val();
    data[2][1] = $('#code').val();
    data[3][1] = $('#relax').val();
    data[4][1] = $('#other').val();
    c3.generate({
    bindto: '#chart',
    data: {
        columns: data,
    type: 'pie'
    },
    pie: {
        label: {
            format: function(value, ratio, id) {
                return value + " hours"
            }
        }
    },
    color: {
        pattern: ['#D81159', '#8F2D56', '#218380', '#FBB13C', '#726DA8']
    }
});
})