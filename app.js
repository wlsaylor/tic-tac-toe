// Initialize modal
const myModal = new bootstrap.Modal($('#winModal'));

// Use player classes to pesist scores through multiple games
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

    // X always goes first, then alternates every other turn
    $('.game-button').on('click', function(){
        if (turn % 2 === 0) {
            player = playerX;
        } else {
            player = playerO;
        }

        // Get id of clicked element
        let id = $(this).attr('id');

        // Check if clicked element is a valid selection
        if ($(`#${id}`).html() == '') {
            // Mark element with player's name (X or O)
            $(`#${id}`).html(player.name);
        
            // Put all possible win conditions in a grid to iterate over
            let gridArray = [
                [$('#tl').html(), $('#tm').html(), $('#tr').html()], 
                [$('#ml').html(), $('#mm').html(), $('#mr').html()], 
                [$('#bl').html(), $('#bm').html(), $('#br').html()],
                [$('#tl').html(), $('#ml').html(), $('#bl').html()], 
                [$('#tm').html(), $('#mm').html(), $('#bm').html()], 
                [$('#tr').html(), $('#mr').html(), $('#br').html()],
                [$('#tl').html(), $('#mm').html(), $('#br').html()], 
                [$('#tr').html(), $('#mm').html(), $('#bl').html()]
            ];

            checkForWin(gridArray, player);
            updateAlert(player);
            turn++;

            // If no winner, end game
            if(turn === 9) {
                $('#winner').html("It's a draw!");
                myModal.toggle();
            }
        }
    });

    // Reset the game while persisting scores
    $('.reset').on('click', () => { 
        turn = 0;
        $('.game-button').html('');
        $('#turn-header').html("It's X's turn!");
        $('.alert').removeClass('alert-warning');
        $('.alert').addClass('alert-primary');
    });
}

// Iterate over the array of possible win conditions
function checkForWin(gridArray, player) {
    for (const grid of gridArray) {
        // Check to see if every element in a child array is equivalent
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

// Update the alert element with who's turn it is
function updateAlert(player) {
    if (player.name === 'X') {
        $('#turn-header').html("It's O's turn!");
        $('.alert').removeClass('alert-primary');
        $('.alert').addClass('alert-warning');
    } else {
        $('#turn-header').html("It's X's turn!");
        $('.alert').removeClass('alert-warning');
        $('.alert').addClass('alert-primary');
    }
}

playGame();
