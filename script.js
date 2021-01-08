var options = [
    document.getElementById('01'),
    document.getElementById('02'),
    document.getElementById('03')
]

options.forEach(option => {
    option.addEventListener('click', select)
});


var state = [1,1,2]

function select(auto) {
    var container = auto.path[1]
    //select = parseInt(container.id)
    
    if (!container.querySelector('.door').classList.contains('hide')){
        
        options.forEach(option => {
            if(!option.querySelector('.check').classList.contains('hide')){
                option.querySelector('.check').classList.add('hide')
            }
        });
        
        container.querySelector('.check').classList.remove('hide')
    }
}

function getElements(container) {
    var pos   = container.querySelector('.pos');
    var neg   = container.querySelector('.neg');
    var check = container.querySelector('.check');
    var door  = container.querySelector('.door');
    return [pos, neg, check, door]
}