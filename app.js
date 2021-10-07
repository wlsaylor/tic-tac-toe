const myModal = new bootstrap.Modal($('#winModal'), {
    keyboard: true
});

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
            $('#turn-header').html("It's O's turn!");
            $('.alert').removeClass('alert-primary');
            $('.alert').addClass('alert-warning');
        } else {
            player = playerO;
            $('#turn-header').html("It's X's turn!");
            $('.alert').removeClass('alert-warning');
            $('.alert').addClass('alert-primary');
        }

        let id = $(this).attr('id');

        if ($(`#${id}`).html() == '') {

            $(`#${id}`).html(player.name);
        
            let gridArray = [[$('#tl').html(), $('#tm').html(), $('#tr').html()], 
                [$('#ml').html(), $('#mm').html(), $('#mr').html()], 
                [$('#bl').html(), $('#bm').html(), $('#br').html()],
                [$('#tl').html(), $('#ml').html(), $('#bl').html()], 
                [$('#tm').html(), $('#mm').html(), $('#bm').html()], 
                [$('#tr').html(), $('#mr').html(), $('#br').html()],
                [$('#tl').html(), $('#mm').html(), $('#br').html()], 
                [$('#tr').html(), $('#mm').html(), $('#bl').html()]];

            checkForWin(gridArray, player);
            turn++;

            if(turn === 9) {
                $('#winner').html("It's a draw!");
                myModal.toggle();
            }

        }
    });

    $('#reset').on('click', () => { 
        turn = 0;
        $('.game-button').html('');
        $('#turn-header').html("It's X's turn!");
    });
}

function checkForWin(gridArray, player) {
    for (grid of gridArray) {
        if (grid.every((v, i, a) => 
            v === a[0] && v !== ''
        )) {
            $('#winner').html(player.name + " Wins!");
            myModal.toggle();
            player.wins++;
            $(`#${player.name}-score`).html(`${player.wins} Wins`);
        }
    }
}

playGame();
