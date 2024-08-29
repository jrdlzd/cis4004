
import React from 'react';
import './Bingo.css';

class Bingo extends React.Component
{     
    constructor(props)
    {
        super(props);
        
        // initialize the state object with data and card
        this.state = {
            data: this.populateData(),
            card: this.populateCard()
        };
    }
    
    populateData()
    {
        // declare array data
        var data = [];

        
        // iterate to generate the Bingo numbers 1 - 75 and push on the array data
        for(let i = 1; i <= 75; i++) {
            data.push(i);
        }

        
        // return the array data
        return data;
    }
    
    populateCard()
    {
        // initialize constant numbers to state object property data
        const numbers = this.populateData();

        
        // declare array card 
        var card = [];
        
        for(let i = 0; i < 5; i++)
        {            
            // Declare variable offset initialized to the row loop control variable multiplied by 15 is use as an offset for the array index
            var offset = i * 15;
            
            // Iterate until each column has five unique values randomly selected
            for(let j = 0; j < 5; j++)
            {
                // Declare variable idx to use as the index of the numbers array
                // Initialize idx to a random number based on the column letter 
                var idx = offset + Math.floor(Math.random() * 15);

                
                // Ensure no duplicates by checking if the card array includes the value stored in the numbers array at index idx
                // If the value is not already in the card array
                if(!card.includes(numbers[idx]))
                {
                    // push the value stored in the numbers array at index idx on to the card array
                    card.push(numbers[idx]);
                }
                else {
                    j--;
                }
            }
        }

        // return the card array
        return card;
    }
    
    getNumber(idx)
    {
        // Declare constant bingoCard initialized to the state object property card
        const bingoCard = this.state.card;
        
        // Declare variable number initialized to array bingoCard at index idx
        var number = bingoCard[idx];

        // Return variable number
        return number;
    }

    render() { 
        return ( 
            <div id="bingo-container">
                <div id="board">
                    <div className="row">
                        <div className="bingo">
                            <span>{this.getNumber(0)}</span>
                        </div>
                        <div className="bingo">
                            <span>{this.getNumber(5)}</span>
                        </div>
                        <div className="bingo">
                            <span>{this.getNumber(10)}</span>
                        </div>
                        <div className="bingo">
                            <span>{this.getNumber(15)}</span>
                        </div>
                        <div className="bingo">
                            <span>{this.getNumber(20)}</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="bingo">
                            <span>{this.getNumber(1)}</span>
                        </div>
                        <div className="bingo">
                            <span>{this.getNumber(6)}</span>
                        </div>
                        <div className="bingo">
                            <span>{this.getNumber(11)}</span>
                        </div>
                        <div className="bingo">
                            <span>{this.getNumber(16)}</span>
                        </div>
                        <div className="bingo">
                            <span>{this.getNumber(21)}</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="bingo">
                            <span>{this.getNumber(2)}</span>
                        </div>
                        <div className="bingo">
                            <span>{this.getNumber(7)}</span>
                        </div>
                        <div className="bingo">
                            <span>FREE</span>
                        </div>
                        <div className="bingo">
                            <span>{this.getNumber(17)}</span>
                        </div>
                        <div className="bingo">
                            <span>{this.getNumber(22)}</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="bingo">
                            <span>{this.getNumber(3)}</span>
                        </div>
                        <div className="bingo">
                            <span>{this.getNumber(8)}</span>
                        </div>
                        <div className="bingo">
                            <span>{this.getNumber(13)}</span>
                        </div>
                        <div className="bingo">
                            <span>{this.getNumber(18)}</span>
                        </div>
                        <div className="bingo">
                            <span>{this.getNumber(23)}</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="bingo">
                            <span>{this.getNumber(4)}</span>
                        </div>
                        <div className="bingo">
                            <span>{this.getNumber(9)}</span>
                        </div>
                        <div className="bingo">
                            <span>{this.getNumber(14)}</span>
                        </div>
                        <div className="bingo">
                            <span>{this.getNumber(19)}</span>
                        </div>
                        <div className="bingo">
                            <span>{this.getNumber(24)}</span>
                        </div>
                    </div>
                </div>
            </div>
      );
   }
}

export default Bingo;