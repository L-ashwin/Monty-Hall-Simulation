var options = [
    document.getElementById('00'),
    document.getElementById('01'),
    document.getElementById('02')
]

class MontyHall{
    constrctor(){
        this.states = new Array(3).fill(0)
        states[Math.floor(Math.random()*3)] = 1
        
        this.choices = [0,1,2]
        this.firstChoice  = -1
        this.secondChoice = -1
    }

    processChoice(container){
        // only if door is not open selection is allowed
        if (container.querySelector('.door').classList.contains('hide')){return 0}

        
        if (this.firstChoice == -1){
            // if current choice is first choice i.e. firstchoice is not made

            this.firstChoice = parseInt(container.id) //assign first choice
            container.querySelector('.check').classList.remove('hide') // maek first choise on screen
            this.choices.splice(this.choices.indexOf(this.firstChoice), 1) // remove the choice from choices avaiable to Monty

            //------------------Monty's move--------------

            if (this.states[this.firstChoice] == 1){ 
                // If participant has choosen the only door with a car -> monty will pick one of remaining two 

            } else { 
                // if participant has choosen eiher of the door with a sheep -> monty will pick remaining door with a sheep

            }
        } else {
            // if current choise is second choice i.e. wether to stay put or switch 

        }
    }
}



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
});

document.getElementById('reset').addEventListener('click', reset)

var op1 = document.getElementById('Out1')
var op2 = document.getElementById('Out2')
var op3 = document.getElementById('Out3')

op1.innerHTML = stayPut;
op2.innerHTML = switchOp;
op3.innerHTML = String(count_stayPut)+' \\ '+ String(count_switchOp);



// -------------------------- For discription -------------------------------
var readmeText = document.getElementById('readme-text')
var readme = document.getElementById('readme')
var footer = document.getElementById('footer')

readme.addEventListener('click', toggle)
readmeText.addEventListener('click',toggle, false)
function toggle(params) {
    if (readmeText.classList.contains('hide')){
        readmeText.classList.remove('hide')
        readme.classList.add('hide')
        footer.classList.add('hide')
    }else{
        readmeText.classList.add('hide')
        readme.classList.remove('hide')
        footer.classList.remove('hide')
    }
}