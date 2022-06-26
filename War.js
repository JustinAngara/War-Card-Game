class Cards{
    static generateCards(){
        let cards = [];
        for(let i = 0;i<4;i++){
            for (let j = 1;j<=13;j++){
                cards.push(Math.floor(Math.random()*j));
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
        // a and b reference the same exact memory to player1 and player2 obj. Therefore, if a.score gets incremented, player1.score is also incremented
    }
    runSimulation(){
        // checks if its true
        let totalIterations=0;
        if (this.a instanceof(Player) && this.b instanceof(Player)){
            while(this.a.cardsArray.length!=0 && this.b.cardsArray.length!=0){
                this.checkCard();
                totalIterations++;       
            }   
            console.log(this.a.cardsArray.length +" "+this.b.cardsArray.length+" total iterations:"+totalIterations);
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
            this.a.cardsArray.push(valueB);
            this.b.cardsArray.splice(card[1],1);
           
        } else if (valueA < valueB){
            this.b.score++;
            this.b.cardsArray.push(valueA);
            this.a.cardsArray.splice(card[0],1);
        }    
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
alert(game.runSimulation());