const {Board} = require("./board.js");
const prompt = require('prompt-sync')();

/* Prompts the user to make a selection
    msg: the promt for the user
    lb: the lower bound for the # of possible selections
    ub: the upper bound for the # of possible selections
*/
function get_selection(msg, lb, ub){
    var sel = 0;
    while(!sel){
        sel = prompt(msg);
        if(sel >= lb && sel <= ub){
            break;
        } 
        else if (sel == null) {
            process.exit(1);
        } 
        else {
            console.log("\nInvalid Selection!")
            sel = 0;
        }
    }
    return sel;
}


/* Prompts the user for a move placement
    placement_prompt: the prompt for the user
    board: the board instance
    piece: piece type, X or O
    comp: whether the player is the computer
*/
function get_move_placement(placement_prompt, board, piece, comp){
    placement = -2;
    while(placement == -2){
        placement = (!comp ? get_selection(placement_prompt, -1, 8) : Math.floor(Math.random() * 9))
        if(placement == -1){
            console.log(`\nExample Board:\n---------------\n${board.print_example()}\n`);
            placement = -2;
        }
        else if(placement == null){
            process.exit(1);
        }
        else {
            if(board.valid_piece_placement(placement)){
                board.place_piece(piece, placement);
                board.print();

                // has won?
            }
            else{
                if(!comp){
                    console.log("\nInvalid selection! That space is filled.");
                }
                placement = -2;
            }
        }
    }
}


/* Advances the game one turn
    turn_num: current turn #
    gamemode: 1 is pvp, 2 is pvc
    board: the board instance
    placement_prompt: prompt for user
*/
function play_turn(turn_num, gamemode, board, placement_prompt){
    let turn_string = `Turn #${turn_num}\n-------------------------`
    let player_turn = null;
    if(turn_num % 2 == 1){
        player_turn = 1;
        console.log(`\nPlayer #1's Turn - ${turn_string}`);
        get_move_placement(placement_prompt, board, 'X', false);        
    }
    else {
        player_turn = 2;
        if (gamemode == 1){
            console.log(`\nPlayer #2's Turn - ${turn_string}`);
            get_move_placement(placement_prompt, board, 'O', false);
        }
        else if(gamemode == 2){
            console.log(`\nComputer's Turn - ${turn_string}`);
            get_move_placement(placement_prompt, board, 'O', true);
        }
    }
}

/* Prints the output for the winner of the game
    player_turn: current turn # to determine winning player
    gamemode: 1 is pvp, 2 is pvc, to determine if player or computer won
    board: the board instance
*/
function print_winner_output(player_turn, gamemode, board){
    player_num = null;
    if(player_turn % 2 == 1){
        player_num = 1;
    }
    else {
        player_num = 2;
    }

    if(gamemode == 1){
        console.log(`\nCongratulations Player #${player_num}, you won!`);
    }
    else if(gamemode == 2){
        if(player_num == 1){
            console.log(`\nCongratulations Player #${player_num}, you won!`);
        }
        else if(player_num == 2){
            console.log("\nThe Computer won! Better luck next time...");
        }
    }
}

// Prompts the user to see whether they'd like to play another game
function play_again_prompt(){
    var pa_prompt = "\nWould you like to play again? 1 (Yes), 2 (No): "
    var pa = get_selection(pa_prompt, 1, 2);

    if(pa == 1){
        return true;
    }
    return false;
}

// Main game loop
let play = true;
while (play) {
    console.log("\nWelcome to Tic-Tac-Toe!\n-------------------------");
    var gamemode_prompt = "Please select a gamemode type; (1) Player vs. Player, (2) Player vs. Computer: "
    var gamemode = get_selection(gamemode_prompt, 1, 2);
    
    let b = new Board();
    console.log(`\nExample Board:\n---------------`)
    b.print_example();

    for(var turn_num = 1; turn_num < b.get_board_len(); turn_num++){
        var placement_prompt = "Select a place on the board: 1 (TL), 2 (TM), 3 (TR), 4 (ML), 5 (MM), 6 (MR), 7 (BL), 8 (BM), 9 (BR), -1 (HELP: SHOW EXAMPLE): ";
        play_turn(turn_num, gamemode, b, placement_prompt);
        if(b.check_win()){
            print_winner_output(turn_num, gamemode, b);
            play = play_again_prompt();
            break;
        }
        if(turn_num == 9){
            console.log("\nLadies and gentlemen, we have a draw...");
            play = play_again_prompt();
            break;
        }
    }
}