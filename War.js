class Cards{
    static generateCards(){
        let cards = [];
        for(let i = 0;i<4;i++){
            for (let j = 1;j<=13;j++){
                cards.push(j);
            }
        }
        return this.splitArray(this.shuffleArray(cards));
    }
    static shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    static splitArray(array){
        let half = Math.ceil(array.length / 2);    
        let firstHalf = array.slice(0, half);
        let secondHalf = array.slice(-half);

        return [firstHalf, secondHalf];
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
        // a and b reference the same exact memory to player1 and player2 obj
    }
    runSimulation(){
        // checks if its true
        let totalIterations=0;
        if (this.a instanceof(Player) && this.b instanceof(Player)){
            // Since both lengths are the same, we can use a for loop
            for(let i = 0;i<this.a.cardsArray.length;i++){
                this.checkCard();
            }
            return this.compareTo();        
        } 
        return 'Enter valid object';
    }
    getRandomIndex(){
        let randomIndex = [];
        randomIndex.push(Math.floor(Math.random()*this.a.cardsArray.length)); // returns a random index  from 'a' in an array[0]
        randomIndex.push(Math.floor(Math.random()*this.b.cardsArray.length));// returns a random index from 'b' in an array[1]
        return randomIndex;
    }
    checkCard(){
        let card = this.getRandomIndex();
        // gets value of the random index
        let valueA = this.a.cardsArray[card[0]];
        let valueB = this.b.cardsArray[card[1]];
        
        if(valueA > valueB){    
            this.a.score++;
            this.removeCards(card);
        } else if (valueA < valueB){
            this.b.score++;
            this.removeCards(card);
        } else{
            this.checkCard();
        }
        
    }

    removeCards(card){
        this.a.cardsArray.splice(card[0],1);
        this.b.cardsArray.splice(card[1],1);  
    }
    compareTo(){
        if(this.a.score>this.b.score){
            return this.a.name+' won!';
        } else if (this.a.score<this.b.score){
            return this.b.name+' won!';
        } 
    }
}
let player1 = new Player(Cards.generateCards()[0], "Justin",0);
let player2 = new Player(Cards.generateCards()[1],"Tyler",0);
let game = new Game(player1,player2);
console.log(game.runSimulation());