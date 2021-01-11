var options = [
    document.getElementById('00'),
    document.getElementById('01'),
    document.getElementById('02')
]

function select(auto) {
    var container = auto.path[1] // grab the image container
    
    // only if door is not open selection is allowed
    if (container.querySelector('.door').classList.contains('hide')){return 0}
    
    // First attempt
    if (choosen == -1){
        choosen = parseInt(container.id)
        container.querySelector('.check').classList.remove('hide')

        var ele_list = [0,1,2]
        ele_list.splice(ele_list.indexOf(choosen), 1)
        
        if (state[choosen] == 1){ // when chosen is 1 show any of other two
        
            const show = ele_list[Math.round(Math.random())]
            options[show].querySelector('.door').classList.add('hide')
            options[show].querySelector('.'+code[state[show]]).classList.remove('hide')
        
        } else { // if chosen is 0, show other 0
            
            ele_list.forEach(ele => {
                if (state[ele] != 1){
                    options[ele].querySelector('.door').classList.add('hide')
                    options[ele].querySelector('.'+code[state[ele]]).classList.remove('hide')
                }
            });
        }

    // Second Attempt
    } else {
        options.forEach(option => {
            option.removeEventListener('click', select)
            
            if (!option.querySelector('.door').classList.contains('hide')){
                option.querySelector('.door').classList.add('hide')
                option.querySelector('.'+ code[state[parseInt(option.id)]]).classList.remove('hide')
            }
        });

        var secondChoice = parseInt(container.id)
        options[choosen].querySelector('.check').classList.add('hide')
        container.querySelector('.check').classList.remove('hide')

    }

}

var state  = new Array(3).fill(0)
state[Math.floor(Math.random()*3)] = 1
//console.log(state)
var code = ['neg', 'pos']
var choosen = -1

options.forEach(option => {
    option.addEventListener('click', select)
});