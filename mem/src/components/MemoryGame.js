import React,{useState} from 'react';
import './MemoryGame.css'

function getDeck() {
    let ranks=[
        "ace", "2", "3","4","5","6","7","8",
        "9", "10", "jack", "queen", "king"
    ];
    let suites=["clubs","diamonds","hearts","spades"];

    var deck=[];
    for(var rank of ranks) {
        for(var suite of suites) {
            deck.push({rank: rank, suite: suite});
        }
    }
    return deck;
}

function Card(props) {
    let url=`PNG-cards-1.3/${props.rank}_of_${props.suite}.png`;
    return <img alt={`card for ${props.rank} of ${props.suite}`} src={url} className="Card" onClick={props.onClick}/>
}

let ScoreDialog=React.forwardRef((props,ref)=> <dialog ref={ref}>
        <div>
            Sorry, that card was already taken.
            <div>Games: {props.games}
</div>
            <div>Score: {props.score}</div>
            <div>Best: {props.maxScore}</div>
            <div><button onClick={()=>props.resetGame()}>Play again</button></div>            
        </div>
    </dialog>
);

function ScoreBoard(props) {
    let r=React.createRef();
    React.useEffect(()=>{
        console.log('SB',r);
        if(r.current) 
            r.current.showModal();
    });
    if(!props.playing){
        return <ScoreDialog {...props} ref={r}/>
    }
    return <div>
        Games: {props.games}
        Score: {props.score}
        Best: {props.maxScore} 
    </div>;
}

function shuffleArray(array,n) {
    for(let i=0; i<array.length-1 && i<n; ++i) {
        const j = Math.floor(Math.random() * (array.length-i));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function getSome(n,used,full, numCards) {
    full=shuffleArray(full,numCards);
    let ans=[];
    for(let j=0; j<n; ++j)
        ans.push(full[j]);
    return ans;     
}

function contains(card, cardList) {
    for(var i=0; i<cardList.length;++i) {
        if(card.rank===cardList[i].rank && card.suite===cardList[i].suite)
            return true;
    }
    return false; 
}

function mergeDicts(f,s) {
    return Object.assign({},f,s);
}


export function MemoryGame(props) {
    let firstStats={
        games:0,
        maxScore: 0
    }
    let numCards=props.numCards || 15;

    let [game,setGame]=useState({used: [], full: getDeck(), playing: true, score:0});
    let [stats, setStats]=useState(firstStats);

    function resetGame() {
        console.log("Resetting game");
        setGame({used: [], full: getDeck(), playing: true, score:0});
    }

    function cardClicked(c) {
        console.log('clicked',c,game.used);
        if(!game.playing)
            return;
        if(contains(c,game.used)) {
            let max=game.score>stats.maxScore?game.score:stats.maxScore;
            console.log("max=",max, game.score, stats.maxScore);
            setStats({games:stats.games+1, maxScore:max});
            setGame(mergeDicts(game,{playing:false}));            
        } else {
            game.used.push(c);
            game.score+=1;
            setGame(Object.assign({},game));
            console.log('NOT used',c);
        }
    }
    let cards=getSome(numCards,game.used,game.full,numCards);
    console.log("Rendering", stats, game,cards);
    return <div >
        <ScoreBoard games={stats.games} score={game.score} playing={game.playing} 
            maxScore={stats.maxScore} 
            resetGame={resetGame}
        />
        <div className='CardContainer'>
            {cards.map(
                (c,i)=><Card rank={c.rank} suite={c.suite} key={i}
                    onClick={()=>cardClicked(c)}
                />
            )}
        </div>
    </div>;
}