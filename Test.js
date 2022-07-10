var expect = chai.expect;
describe("War", function(){
    describe("#generateCards",function(){
        it("should create an array holding 52 cards in total and a size array of 2", function(){
            var x = Cards.generateCards().length;
            expect(x).to.equal(2);
        });
        it("should throw an error if the length of the array isn't 2",function(){
            expect(function(){
                Cards.genereateCards().length;
            }).to.throw(Error);
        });
    });
});
