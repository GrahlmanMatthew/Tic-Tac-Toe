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
        } else if (!sel) {
            process.exit(1);
        } else {
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
        if(!comp){
            placement = get_selection(placement_prompt, -1, 8);
        }
        else{
            placement = Math.floor(Math.random() * 9);
        }
        if(placement == -1){
            console.log(`\nExample Board:\n---------------\n${board.print_example()}\n`);
            placement = -2;
        }
        else {
            if(board.valid_piece_placement(placement)){
                board.place_piece(piece, placement);
                board.print();
            }
            else{
                console.log("\nInvalid selection! That space is filled.");
                placement = -2;
            }
        }
    }
}


/* Generates a random move for the computer player
    board: the board instance
    piece: piece type, X or O
*/
// function get_random_move_placement(board, piece){
//     var index = -1;
//     while(index == -1){
//         index = Math.floor(Math.random() * 9);
//         if(board.valid_piece_placement(index)){
//             board.place_piece(piece, index);
//             board.print();
//         }
//         else{
//             index = -1;
//         }
//     }
// }

/* Advances the game one turn
    turn_num: current turn #
    gamemode: 1 is pvp, 2 is pvc
    board: the board instance
    placement_prompt: prompt for user
*/
function play_turn(turn_num, gamemode, board, placement_prompt){
    let turn_string = `Turn #${turn_num}\n-------------------------`
    if(turn_num % 2 == 1){
        console.log(`\nPlayer #1's Turn - ${turn_string}`);
        get_move_placement(placement_prompt, board, 'X', false);        
    }
    else {
        if (gamemode == 1){
            console.log(`\nPlayer #2's Turn - ${turn_string}`);
            get_move_placement(placement_prompt, board, 'O', false);
        }
        else if(gamemode == 2){
            console.log(`\nComputer's Turn - ${turn_string}`);
            get_random_move_placement(board, 'O', true);
        }
    }
}

console.log("Welcome to Tic-Tac-Toe!\n--------------------");
var gamemode_prompt = "Please select a gamemode type; (1) Player vs. Player, (2) Player vs. Computer: "
var gamemode = get_selection(gamemode_prompt, 1, 2);

let b = new Board();
console.log(`\nExample Board:\n---------------`)
b.print_example();

for(var turn_num = 1; turn_num < 100; turn_num++){
    var placement_prompt = "Select a place on the board: 1 (TL), 2 (TM), 3 (TR), 4 (ML), 5 (MM), 6 (MR), 7 (BL), 8 (BM), 9 (BR), -1 (HELP: SHOW EXAMPLE): ";
    play_turn(turn_num, gamemode, b, placement_prompt);
}