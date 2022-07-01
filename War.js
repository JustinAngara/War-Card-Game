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
        this.keepLooping=true;
        // a and b reference the same exact memory to player1 and player2 obj
    }
    runSimulation(){

        if (this.a instanceof(Player) && this.b instanceof(Player)){
            // Since both lengths are the same, we can use a for loop
            while(this.a.cardsArray.length>0 && this.keepLooping){
                this.checkCard();
            }
            return this.compareTo();        
        } 
        return 'Enter valid object';
    }

    checkCard(){
        console.log(this.a.cardsArray + " Score: "+this.a.score 
        +"\n"+this.b.cardsArray+" Score: "+this.b.score);
        // gets value of the random index
        let valueA = this.a.cardsArray[0];
        let valueB = this.b.cardsArray[0];
        
        if(valueA > valueB){    
            this.a.score++;
            this.removeCards();
        } else if (valueA < valueB){
            this.b.score++;
            this.removeCards();
        } else{
            if(this.war()=="end"){
                this.keepLooping=false;        
            }
        }  
    }
    war(){
        let l1 =this.a.cardsArray.length;
        let l2 = this.b.cardsArray.length 
        if(l1 > 3 && l2>3){
            this.a.cardsArray.splice(0,3);
            this.b.cardsArray.splice(0,3);
            return this.checkCard();
        }
        return this.checkWarCard(l1,l2);

    }
    // war helper methods
    checkWarCard(l1,l2){
        if(l1>l2){
            this.a.score+=1;
            return this.a;
        } else if(l1<l2){
            this.b.score+=1;
            return this.b;
        }
        return this.compareScoreCard();
    }
    compareScoreCard(){
        let z = this.a.cardsArray[0] - this.b.cardsArray[0];
        if(z===0){
            return this.removeCards();
        } else if(z>0){
            return this.a;
        }
        return this.b;
    }
    // helper methods for general purpose
    removeCards(){
        this.a.cardsArray.splice(0,1);
        this.b.cardsArray.splice(0,1);  
    }
    compareTo(){
        if(this.a.score>this.b.score){
            return this.a.name+' won!';
        } else if (this.a.score<this.b.score){
            return this.b.name+' won!';
        } else{
            return "You both lost";
        }
    }
}
let cardsArr = Cards.generateCards();
let player1 = new Player(cardsArr[0], "Justin",0);
let player2 = new Player(cardsArr[1],"Tyler",0);
let game = new Game(player1,player2);
console.log(game.runSimulation()+`
PLAYER 1 SCORE ${player1.score}
PLAYER 2 SCORE ${player2.score}
`);