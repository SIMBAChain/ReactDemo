import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SecureLS from 'secure-ls';
//import ethers from 'ethers';
import { ethers } from 'ethers';
const axios = require('axios');
var games;
var loadedGame = false;


function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}



class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
        <div>
       
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
         
        </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true
    };
  }

  handleClick(i) {
    
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
       
      return;
    }
       loadedGame = false;
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

    
    
    //We call the generate wallet function through here so the UI will update
    
    genWallet(seed)
    {
        //Runs the generate wallet seed and updates the UI
        generateWallet(seed);
        this.forceUpdate();
    }
    revealKey()
    {
        //Reveals the Private key and seed
        document.getElementById("privKey").innerHTML = ("Private Key: " + myWallet.privateKey);
        document.getElementById("seed").innerHTML = ("Seed: " + myWallet.mnemonic);
         this.forceUpdate();
    }
    
    loadSeed()
    {
        //Loads the seed stored in browser
        this.gameList()
     
         try{
         let ls = new SecureLS()
        return ls.get('walletSeed').data;
      
         
         }
        catch(err){
            alert(err);
        } 
    }
    switchWallet(){
        //erases currently stored wallet
        myWallet = null;
        let ls = new SecureLS()
        ls.remove('walletSeed')
        this.forceUpdate();
    }
    
   gameList(){
       //gets and displays the last 5 games saved
       const t = this
       axios.get('https://api.simbachain.com/v1/react_tictactoe/turns/',{
        headers: {
                'APIKEY' : '8fbfe71045403b1a0c36d73c4160f778dda31bbd2249d20cf98e3485f5743933'
            }})
            .then(function (response) {
          if (response.data.count >= 5) {
            games = <table>
            <tr>
            <th>#</th>
            <th>Name</th>
    
            </tr>
            <tr>
            <td>1</td>
            <td>{response.data.results[0].payload.inputs.name}</td>
            <td><button class = "animatedbutton greenbutton" onClick={i => t.loadGame(0)}>Select</button></td>
            </tr>
              
            <tr>
            <td>2</td>
            <td>{response.data.results[1].payload.inputs.name}</td>
            <td><button class = "animatedbutton greenbutton" onClick={i => t.loadGame(1)}>Select</button></td>
            </tr>
              
            <tr>
            <td>3</td>
            <td>{response.data.results[2].payload.inputs.name}</td>
            <td><button class = "animatedbutton greenbutton" onClick={i => t.loadGame(2)}>Select</button></td>
            </tr>
              
            <tr>
            <td>4</td>
            <td>{response.data.results[3].payload.inputs.name}</td>
            <td><button class = "animatedbutton greenbutton" onClick={i => t.loadGame(3)}>Select</button></td>
            </tr>
              
            <tr>
            <td>5</td>
            <td>{response.data.results[4].payload.inputs.name}</td>
            <td><button class = "animatedbutton greenbutton" onClick={i => t.loadGame(4)}>Select</button></td>
            </tr>
 
            </table>
             t.forceUpdate();
          }
    })
        
                  }
  

loadGame(gameNum){
    //loads and displays a selected game
        document.body.style.cursor='wait';
        loadedGame = true;
        const t = this;
         
        var turns = [];
        
        
       
       axios.get('https://api.simbachain.com/v1/react_tictactoe/turns/',{
            headers: {
                'APIKEY' : '8fbfe71045403b1a0c36d73c4160f778dda31bbd2249d20cf98e3485f5743933'
            }})
        .then(function (response) {
           //since the data is stored in a string and not an array the data needs to be parsed from a string into an array
            const turn0 = response.data.results[gameNum].payload.inputs.turn0.split(";");
            const turn1 = response.data.results[gameNum].payload.inputs.turn1.split(";");
            const turn2 = response.data.results[gameNum].payload.inputs.turn2.split(";");
            const turn3 = response.data.results[gameNum].payload.inputs.turn3.split(";");
            const turn4 = response.data.results[gameNum].payload.inputs.turn4.split(";");
            const turn5 = response.data.results[gameNum].payload.inputs.turn5.split(";");
            const turn6 = response.data.results[gameNum].payload.inputs.turn6.split(";");
            const turn7 = response.data.results[gameNum].payload.inputs.turn7.split(";");
            const turn8 = response.data.results[gameNum].payload.inputs.turn8.split(";");
            const turn9 = response.data.results[gameNum].payload.inputs.turn9.split(";");
           
           //converts the string "null" to the type/value of null
           var cell;
            for (cell = 0;  cell < turn0.length; cell++) {
             if (turn0[cell] == "null") {
                 turn0[cell] = null
                 }   
            }
           
           for (cell = 0;  cell < turn1.length; cell++) {
             if (turn1[cell] == "null") {
                 turn1[cell] = null
                 }   
            }
           
           for (cell = 0;  cell < turn2.length; cell++) {
             if (turn2[cell] == "null") {
                 turn2[cell] = null
                 }   
            }
           
           for (cell = 0;  cell < turn3.length; cell++) {
             if (turn3[cell] == "null") {
                 turn3[cell] = null
                 }   
            }
           
           
            for (cell = 0;  cell < turn4.length; cell++) {
             if (turn4[cell] == "null") {
                 turn4[cell] = null
                 }   
            }
           
            for (cell = 0;  cell < turn4.length; cell++) {
             if (turn5[cell] == "null") {
                 turn5[cell] = null
                 }   
            }
           
            for (cell = 0;  cell < turn6.length; cell++) {
             if (turn6[cell] == "null") {
                 turn6[cell] = null
                 }   
            }
           
            for (cell = 0;  cell < turn7.length; cell++) {
             if (turn7[cell] == "null") {
                 turn7[cell] = null
                 }   
            }
           
            for (cell = 0;  cell < turn8.length; cell++) {
             if (turn8[cell] == "null") {
                 turn8[cell] = null
                 }   
            }
           
            for (cell = 0;  cell < turn9.length; cell++) {
             if (turn9[cell] == "null") {
                 turn9[cell] = null
                 }   
            }
           
           
           
           
           
           
           
           
           
           
           
            //puts all the different turn arrays into a single array of turns
            turns = [turn0,turn1,turn2,turn3,turn4,turn5,turn6,turn7,turn8,turn9];
      
           // this.displayData(turns);
           
           
           
            var limit;
           for (var i = 0; i < turns.length; i++) { 
               if (turns[i] == " ")
               {
                   turns[i] = turns[i -1];
                   
                }
               
           }
          
           //defines the variables needed for editing match data and erases any moves present
            const history = t.state.history.slice(0, t.state.stepNumber + 1);
            const current = history[history.length - 1];
            const squares = current.squares.slice();
            history.length = 0;
           
           
          
           
             //applies the loaded game data 
            t.setState({
            history: history.concat
                ([
                    {
                        squares: turns[0]
                    },
                    {
                        squares: turns[1]
                    },
                    {
                        squares: turns[2]
                    },
                    {
                        squares: turns[3]
                    },
                    {
                        squares: turns[4]
                    },
                    {
                        squares: turns[5]
                    },
                    {
                        squares: turns[6]
                    },
                    {
                        squares: turns[7]
                    },
                    {
                        squares: turns[8]
                    },
                    {
                        squares: turns[9]
                    }
                ]),
            stepNumber: 9,
            xIsNext: !t.state.xIsNext
            }); 
           
         document.body.style.cursor='auto';  
            
        })
    }
   
    
    saveGame(){
       //saves a matches data to the blockchain
         document.body.style.cursor='wait';
        const t = this;
        if (document.getElementById("nameInput").value == "")
            {
                 document.body.style.cursor='auto';
                alert("Please name your game.");
                return
            }
        
        if (document.getElementById("nameInput").value.length > 50)
            {
                 document.body.style.cursor='auto';
                alert("Character limit exceeded\nName must be 50 characters or less");
                return
            }
        
        
        
        var apiKey = "8fbfe71045403b1a0c36d73c4160f778dda31bbd2249d20cf98e3485f5743933";
       
        var moves = [];
        for (var i = 0; i < this.state.history.length; i++)
            {
           //since storing arrays on simba is currently not really an option the arrays are put into strings with each index seperated by ';'
                var parsed = this.state.history[i].squares[0];
                 for (var p = 1; p < this.state.history[i].squares.length; p++)
                    {
                        parsed += ";" + this.state.history[i].squares[p];
                    }
                
                moves[i] = parsed;
            }
        var move0 = " ";
        var move1 = " ";
        var move2 = " ";
        var move3 = " ";
        var move4 = " ";
        var move5 = " ";
        var move6 = " ";
        var move7 = " ";
        var move8 = " ";
        var move9 = " ";
       //assign moves to their variables 
         for (var i = 0; i < moves.length; i++)
             {
                 
                 
                 if (i == 0)
                 {move0 = moves[i];}
                 if (i == 1)
                 {move1 = moves[i];}
                 if (i == 2)
                 {move2 = moves[i];}
                 if (i == 3)
                 {move3 = moves[i];}
                 if (i == 4)
                 {move4 = moves[i];}
                 if (i == 5)
                 {move5 = moves[i];}
                 if (i == 6)
                 {move6 = moves[i];}
                 if (i == 7)
                 {move7 = moves[i];}
                 if (i == 8)
                 {move8 = moves[i];}
                 if (i == 9)
                 {move9 = moves[i];}
                 
             }
        
      //setup the form data needed for posting
        var myBody = new FormData;
        myBody.append("from",myWallet.address);
        myBody.append("name",document.getElementById("nameInput").value);
        myBody.append("turn0",move0);
        myBody.append("turn1",move1);
        myBody.append("turn2",move2);
        myBody.append("turn3",move3);
        myBody.append("turn4",move4);
        myBody.append("turn5",move5);
        myBody.append("turn6",move6);
        myBody.append("turn7",move7);
        myBody.append("turn8",move8);
        myBody.append("turn9",move9);
        myBody.append("assetId","0x0")
        
        
       
        

        //the post command itself
        axios.post('https://api.simbachain.com/v1/react_tictactoe/turns/', myBody, {
            headers: {
                'APIKEY' : '8fbfe71045403b1a0c36d73c4160f778dda31bbd2249d20cf98e3485f5743933'
            }})
  .then(function (response) {
            //Sign the transaction and update the game list
            
            //This is where signing takes place
    if (myWallet)
        {
//we grab the text value from 'signInput' and run the tryParseJson function found below
    let transaction = response.data.payload.raw;
    let txnID = response.data.id;
            //that json is then signed here
   
            try {
            delete transaction["gas"];
            delete transaction["from"];
            }
            catch(err)
                {
                    
                }
    let signPromise = myWallet.sign(transaction);
           
            
    signPromise.then((signedTransaction)=>{
       
       
        
       //after the transaction is signed the signed transaction needs to be submitted
        let payload = {
        'payload': signedTransaction
      }
        axios.post('https://api.simbachain.com/v1/react_tictactoe/transaction/' + txnID + "/", payload, {
            headers: {
                'APIKEY' : '8fbfe71045403b1a0c36d73c4160f778dda31bbd2249d20cf98e3485f5743933'
            }})
        .then(function (response) {
            alert("Transaction Signed and Submitted");
        });
        });
        }
    else {
        //if no wallet is found this alert runs
        alert("Generate wallet before signing");
    }
            
             t.gameList()
             document.body.style.cursor='auto';
            
  })
  .catch(function (error) {
  
  });
        
    //after the game is saved the board is reset        
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
            const current = history[history.length - 1];
            const squares = current.squares.slice();
            history.length = 0;
         t.setState({
            history: history.concat
                ([
                    {
                        squares: [null,null,null,null,null,null,null,null,null]
                    },
                   
                ]),
            stepNumber: 0,
            xIsNext: !t.state.xIsNext
            }); 
             this.forceUpdate();
    }
    
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    
    
   
      
    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <div>
          <button class="button animatedbutton" onClick={() => this.jumpTo(move)}>{desc}</button>
            
           </div>
        </li>
      );
    });

    //if the game is over display the save to simba button otherwise leave it as the div
    var simbaButton = <div></div>
    if ((winner || moves.length >= 10) && loadedGame == false)
        {
     simbaButton = <div><form>Game Name: <input id="nameInput" type="text" /> </form> <button onClick={i => this.saveGame()} class="bigbutton animatedbutton">Save to SIMBA</button></div>
        }
    
    
    var wallet = <div><form>Wallet Seed: <input id="seedInput" type="text" /> </form><button class="bigbutton animatedbutton" onClick={i => this.genWallet()}>Generate Wallet</button></div>
     
        var priv = <p></p>

    var localWallet = getWallet()
    try {  wallet = <div><button class="bigbutton animatedbutton" onClick={i => this.revealKey()}>Reveal Key</button><button class="bigbutton animatedbutton" onClick={i => this.switchWallet()}>Switch Wallet</button><div class = "walletinfo"><p>Public Key: {localWallet.address}</p><p id="privKey">Private Key:</p><p id="seed">Seed:</p></div></div> }
    catch(err)
       {
           
         var seed = this.loadSeed(); 
         if (seed)
             {
                 this.genWallet(seed)
             }
       }
         
         
      
   


    let status;
     if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
          
           return (
        
      <div className="game">
                 
              
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        <br/>
        <br/>
        <div>{games}</div>
        <div>{wallet}</div>
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
            <div>{simbaButton}</div>
        </div>
      </div>
      
    );  
        
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

function calculateWinner(squares) {
    
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}



var myWallet;
    function getWallet(){
        //returns the wallet for react
        return myWallet;
    }

  
    
    function generateWallet(seed) {
        
    
/*
This function generates the wallet based off of the value of the 'seedInput'
The seed should be 12 words
This seed generates the public and private key of your wallet
*/
     
//Here we get the 12 word phrase
 try{       
var mnemonic = document.getElementById("seedInput").value;
 }
catch
    {
if (seed)
    {
       mnemonic = seed 
    }
    }
   
//Here the wallet is actually generated
        
try {
let mnemonicWallet = ethers.Wallet.fromMnemonic(mnemonic);        
//Here we assign the wallet to the global variable myWallet
myWallet = mnemonicWallet;
    SaveWallet()
    
    
    
    
}
        catch(err){
            alert("Invalid Seed");
        }
    
    }

function signTransaction() {
//This is where signing takes place
    if (myWallet)
        {
//we grab the text value from 'signInput' and run the tryParseJson function found below
    let transaction = tryParseJSON(document.getElementById("signInput").value);
            //that json is then signed here
    let signPromise = myWallet.sign (transaction);
    signPromise.then((signedTransaction)=>{
    document.getElementById("signOutput").value = signedTransaction;
        });
        }
    else {
        //if no wallet is found this alert runs
        alert("Generate wallet before signing");
    }
}
    function tryParseJSON (jsonString){
        //we parse the json here
      try {
        var o = JSON.parse(jsonString);

        // Handle non-exception-throwing cases:
        // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
        // but... JSON.parse(null) returns null, and typeof null === "object",
        // so we must check for that, too. Thankfully, null is falsey, so this suffices:
        if (o && typeof o === "object") {
          return o;
        }
      }
      catch (e) { }

      return false;
    };
    
    //Save and load wallets
    
    function SaveWallet() {
        if (myWallet)
            {
        //we save the 12 word wallet seed then on load we will generate everything else
        //SecureLS is used because it does not store the 12 words in plain text
        //If you wanted to you could make it where the user had to put in a password to unlock their account
        let ls = new SecureLS();
        ls.set('walletSeed', {data:myWallet.mnemonic});
            }
        else{
            alert("No wallet present to save");
        }
    }
    function LoadWallet() {
        //the wallet is loaded and generate wallet is ran to populate the fields
        //while not the best code to get the seed to the generate wallet function we set the value of 'walletSeed' to the data we just loaded
       
        try{
         let ls = new SecureLS()
        document.getElementById("seedInput").value = ls.get('walletSeed').data;
        generateWallet()}
        catch(err){
            
        }
    }