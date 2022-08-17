import { Component, OnInit, OnDestroy, Input, HostListener } from '@angular/core';
import { GamehubService } from 'src/app/services/gamehub.service';
import { Game } from 'src/app/models/Game';
import { RestartGameMessage } from 'src/app/models/RestartGameMessage';
import { Router } from '@angular/router';
import { SwalService } from 'src/app/services/swal.service';
import { ContactsService } from 'src/app/services/contacts.service';
import { RequesthubService } from 'src/app/services/requesthub.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, OnDestroy {

  squares: any[] = [];
  isNext = true;
  winner = false;
  counter = 0;
  isDraw = false;
  showButton = false;
  showMessage = false;
  timerCounter: number = 10;
  timer: any;
  xAcceptedForNewGame: boolean = false;
  oAcceptedForNewGame: boolean = false;
  endGameBymySide: boolean = true;
  clientIds : any;
  myMove : boolean = true;
  @Input() playerX: string | undefined = '';
  @Input() playerO: string | undefined = '';
  @Input() userId: string | undefined = '';
  @Input() receiverId: string | undefined = '';

  constructor(private gamehubService: GamehubService, private router: Router
    ,private swal: SwalService,private contactService:ContactsService
    ,private requesthub:RequesthubService) { }

  ngOnInit(): void {

    this.userId = this.contactService.GetLiveContact().userId;
    let clienidString = localStorage.getItem("chatIds")??"";
    this.clientIds = JSON.parse(clienidString);
    this.showButton = this.clientIds.id == this.userId && this.clientIds.isAck;
    
    //If the place on the board is not occupied we can add our move
    this.gamehubService.createHubConnection();
    this.gamehubService.onReceiveMove.subscribe((x: Game) => {
      if (x && x.mark) {
        this.makeMove(x.position, x.mark);
        this.resetTimer();
        this.myMove = x.senderId != this.userId;
      }
    });

   //The startGame button will be shown to the sender
    this.requesthub.onChatRequestAcknowledged.subscribe((x:any)=>{
      if(x && x.isaccept){
        this.showButton = true;
      }
    })

    //Allows me to play a new game
    this.gamehubService.onStartGame.subscribe((x: Game) => {
      if (x && x.senderId && x.receiverId) {
          this.newGame();
          this.showMessage = true;
        }
    })


  this.gamehubService.onRestartGame.subscribe((x: RestartGameMessage) => {
    if (x && x.senderId && x.receiverId) {
      if (!x.accept && x.senderId == this.userId) {
        this.router.navigate(['/contact'])
        .then(()=>{
          window.location.reload();
        });
      }

    if (x.senderId == this.playerX) {
      this.xAcceptedForNewGame = true;
    }
    if (x.senderId == this.playerO) {
      this.oAcceptedForNewGame = true;
    }
    //Checks if both users want to continue playing a replay game and stay in the room
    if (x.accept && this.xAcceptedForNewGame && this.oAcceptedForNewGame) {
        this.newGame();
        this.showMessage = true;
        this.swal.messageToUser('New Game');
    }
  }
})

//Checks if one of the players has left the room then both leave the room to the contact page
this.gamehubService.onGameEnd.subscribe((x: RestartGameMessage) => {
  if (x.accept == true && x.senderId != this.userId && x.senderId != null) {
      this.swal.messageToUser("Your Patner just leave the room").then(() => {
        this.router.navigate(['/contact'])
        .then(()=>{
          window.location.reload();
        });
    })
  }
});
}

startGame() {
  let game: Game = new Game();
  game.assign(this.userId, this.receiverId);
  this.gamehubService.startGame(game);
  this.newGame();
  this.showMessage = true;
}
  //Checks if one of the players closes the browser and ends the game
  @HostListener('window:unload', [ '$event' ])
  unloadHandler() {
    let x = new RestartGameMessage;
    x.accept = true;
    x.senderId = this.userId?? "";
    if(this.endGameBymySide){
      this.gamehubService.endGame(x);
    }
  }

  //Movements of players X and O according to turns
  sendMove(position: number) {
    if (!this.squares[position]) {
      if (this.myMove) {
        let game: Game = new Game();
        game.assign(this.userId, this.receiverId, position, (this.userId == this.playerX) ? "X" : "O");
        this.gamehubService.sendMove(game);
      }
      else {
        this.swal.messageToUser('Please wait for your turn');
      }
    }
  }

  //Resets the timer when player X or O does not respond and moves to the other player's turn
  resetTimer() {
    this.stopTimer();
    this.timerCounter = 10;
    this.timer = setInterval(() => {
      if (this.timerCounter == 0) {
        this.timerCounter = 10;
        this.isNext = !this.isNext;
        this.myMove = !this.myMove;
      }
      else {
        this.timerCounter = this.timerCounter - 1;
      }
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.timer);
  }


  newGame() {
    this.squares = Array(9).fill(null);
    this.winner = false;
    this.isDraw = false;
    this.counter = 0;
    this.showButton = false;
    this.isNext = true;
    this.resetTimer();
    this.xAcceptedForNewGame = false;
    this.oAcceptedForNewGame = false;
    this.myMove = this.userId == this.playerX;
    }

  //Makes a restart game when both of the sides accept it
  restartGame(accept: boolean) {
    let restart: RestartGameMessage = new RestartGameMessage();
    restart.assign(this.userId, this.receiverId, this.playerX, this.playerO, accept);
    this.gamehubService.restartGame(restart);
  }

  //Move the player in his turn until the game ends in a win or a draw
  makeMove(position: number, mark: string) {
    if (!this.squares[position]) {
      this.squares.splice(position, 1, mark);
      this.isNext = !this.isNext;
      this.myMove = !this.myMove;
      this.counter++;
    }
    this.winner = this.calculaterWinner();

    if (this.winner) {
      this.stopTimer();
    }
    if (!this.winner && this.counter == 9) {
      this.isDraw = true;
      this.stopTimer();
    }
  }

  get Player() {
      return this.isNext ? 'X' : 'O';
  }

  //Logic of calculating the winner
  calculaterWinner() {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (this.squares[a] && this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]) {
        return this.squares[a];
      }
    }
    return null;
  }

  ngOnDestroy(): void {
    this.stopTimer();
    let x = new RestartGameMessage;
    x.accept = true;
    x.senderId = this.userId?? "";
    if(this.endGameBymySide){
      this.gamehubService.endGame(x);
    }
  }
}