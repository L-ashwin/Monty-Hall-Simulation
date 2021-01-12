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
            option.removeEventListener('touchstart', select)
            
            if (!option.querySelector('.door').classList.contains('hide')){
                option.querySelector('.door').classList.add('hide')
                option.querySelector('.'+ code[state[parseInt(option.id)]]).classList.remove('hide')
            }
        });

        var secondChoice = parseInt(container.id)
        options[choosen].querySelector('.check').classList.add('hide')
        container.querySelector('.check').classList.remove('hide')

        var win = state[secondChoice] == 1
        if (choosen == secondChoice){
            count_stayPut += 1
            stayPut += win
        } else{
            count_switchOp += 1
            switchOp += win
        }

        op1.innerHTML = String(stayPut)+' \\ '+ String(count_stayPut);
        op2.innerHTML = String(switchOp)+' \\ '+ String(count_switchOp);
        op3.innerHTML = String(count_stayPut)+' \\ '+ String(count_switchOp);

    }

}

function reset() {
    state  = new Array(3).fill(0)
    state[Math.floor(Math.random()*3)] = 1
    choosen = -1

    options.forEach(option => {

        option.addEventListener('click', select)
        option.addEventListener('touchstart', select, true)
        
        for (let index = 0; index < option.children.length; index++) {
            const child = option.children[index];
            if(!child.classList.contains('hide')){
                child.classList.add('hide')
            }
        }
        
        option.querySelector('.door').classList.remove('hide')        

    });
}

var code = ['neg', 'pos']
var stayPut  = 0
var switchOp = 0
var count_stayPut  = 0
var count_switchOp = 0

var state  = new Array(3).fill(0)
state[Math.floor(Math.random()*3)] = 1
//console.log(state)
var choosen = -1

options.forEach(option => {
    option.addEventListener('click', select)
    option.addEventListener('touchstart', select, true)
});

document.getElementById('reset').addEventListener('click', reset)
document.getElementById('reset').addEventListener('touchstart', reset, true)

var op1 = document.getElementById('Out1')
var op2 = document.getElementById('Out2')
var op3 = document.getElementById('Out3')

op1.innerHTML = stayPut;
op2.innerHTML = switchOp;
op3.innerHTML = String(count_stayPut)+' \\ '+ String(count_switchOp);

