class Player {
    constructor(name) {
        this.name = name;
        this.wins = 0;
    }
}

function playGame() {

    const playerX = new Player('X');
    const playerO = new Player('O');
    let turn = 0;

    $('button').on('click', function(){
        if (turn % 2 === 0) {
            player = playerX;
        } else {
            player = playerO;
        }

        let id = $(this).attr('id');

        if ($(`#${id}`).html() == '') { 
            $(`#${id}`).html(player.name);
            turn++;
        }
    });

    $('#reset').on('click', reset);
}

function reset() {
    turn = 0;
    $('.game-button').html('');
}

// function checkForWin() {
    
// }

playGame();
