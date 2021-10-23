class Board {
    constructor(){
        this.board = ['', '', '', '', '', '', '', '', '']
        this.sample_board = ['TL', 'TM', 'TR', 'ML', 'MM', 'MR', 'BL', 'BM', 'BR']
    }

    valid_piece_placement(index){
        let valid = true;
        if(!!this.board[index]){
            valid = false;
        }
        return valid;
    }

    place_piece(piece_type, index){
        this.board[index] = (this.valid_piece_placement(index) ? piece_type : '')
    }

    generate_square_string(i, board=this.board){
        let line = "";
        let index = i + 1;
        if(!board[i]){
            line += (index % 3 == 0 ? "___" : "___ |");
        }
        else{
            line += (index % 3 == 0 ? `_${board[i]}_` : `_${board[i]}_ |`);
        }
        return line;
    }

    print(){
        for(let i = 0; i < this.board.length; i+=3){
            let sq1 = this.generate_square_string(i);
            let sq2 = this.generate_square_string(i+1);
            let sq3 = this.generate_square_string(i+2);
            console.log(`${sq1} ${sq2} ${sq3}`)
        }
    }

    print_example(){
        for(let i = 0; i < this.board.length; i+=3){
            let sq1 = this.generate_square_string(i, this.sample_board);
            let sq2 = this.generate_square_string(i+1, this.sample_board);
            let sq3 = this.generate_square_string(i+2, this.sample_board);
            console.log(`${sq1} ${sq2} ${sq3}`)
        }
    }

}

exports.Board = Board;