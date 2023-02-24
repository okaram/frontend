# Memory Card Game

This is my solution to [this task](https://www.theodinproject.com/lessons/node-path-javascript-memory-card) from the Odin project.

## Code

The code is in the [src/components/SimpleMemoryGame.js](src/components/SimpleMemoryGame.js) file.

## Components

I created the following components:

* Card - to display one card
* Scoreboard - to display the current score
* MemoryGame - this one keeps all the state, and uses the others.

### Card component

This component keeps no state, and displays one card.

```
function Card(props) {
    let url=`PNG-cards-1.3/${props.rank}_of_${props.suit}.png`;
    return <img 
        alt={`card for ${props.rank} of ${props.suit}`} 
        src={url} 
        className="Card" 
        onClick={props.onClick}
    />;
}
```
