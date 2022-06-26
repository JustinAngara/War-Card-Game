class Cards{
    static generateCards(){
        let cards = [];
        for(let i = 0;i<2;i++){
            for (let j = 1;j<=13;j++){
                cards.push(j);
            }
        }
        return cards;
    }
}

class Player{
    constructor(cardsArray,name,score){
        this.cardsArray = cardsArray;
        this.name=name;
        this.score=score;
    }
}

class Game{
    constructor(a,b){
        this.a=a;
        this.b=b;
        // a and b reference the same exact memory to player1 and player2 obj. Therefore, if a.score gets incremented, player1.score is also incremented
    }
    runSimulation(){
        // checks if its true
        if (this.a instanceof(Player) && this.b instanceof(Player)){
            for(let i = 0;i<26;i++){
                this.checkCard();
                // console.log('A:'+this.a.score+' B:'+this.b.score);
            }   
            return this.compareTo();        
        } 
        return 'Enter valid object';

    }
    getRandomIndex(){
        let randomIndex = [];
        // Math.floor(Math.random()*(a+1) + b) generates a number from b to a+b 
        randomIndex.push(Math.floor(Math.random()*this.a.cardsArray.length)); // returns a random index  from 'a' in an array[0]
        randomIndex.push(Math.floor(Math.random()*this.b.cardsArray.length));// returns a random index from 'b' in an array[1]
        return randomIndex;
    }
    checkCard(){
        let card = this.getRandomIndex();
        if(card[0]>card[1]){
            this.a.score++;
        } else if (card[0]<card[1]){
            this.b.score++;
        }
        // removes card from array
        this.a.cardsArray.splice(card[0],1);
        this.b.cardsArray.splice(card[1],1);
    }
    compareTo(){
        if(this.a.score>this.b.score){
            return this.a.name+' won!';
        } else if (this.a.score<this.b.score){
            return this.b.name+' won!';
        } 
        return 'Tied!';   
    }
}
let player1 = new Player(Cards.generateCards(), "Justin",0);
let player2 = new Player(Cards.generateCards(),"Tyler",0);
let game = new Game(player1,player2);
alert(game.runSimulation());