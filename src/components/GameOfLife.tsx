import React, { Component } from "react";
import { number, bool } from "prop-types";
import Cell from "./Cell";
import "./GameOfLife.css";

class GameOfLife extends Component<{ height: number, width: number, start: boolean }, {turn: number}> {

    static propTypes = {
        height: number,
        width: number,
        start: bool
    }

    static defaultProps = {
        height: 10,
        width: 10,
        start: true
    }

    game:number[][];
    timerID:NodeJS.Timer;
    update:boolean;

    updateGame():void {
        if (this.update) {
            this.setState({turn: this.state.turn+1});
            const next = this.game;
            for (let i = 0; i < this.props.height; i++) {
                for (let j = 0; j < this.props.width; j++) {
                    let count = 0;
                    // Check cells
                    for (let r = i-1; r<=i+1; r++) {
                        for (let c = j - 1; c<=j+1; c++) {
                            if ( r >=0 && r < this.props.height && c >= 0 && c < this.props.width && (r !== i || c !== j)) {
                                if (this.game[r][c] !== 0) { count++; }
                            }
                        }
                    }
                    if (this.game[i][j] !== 0 && (count == 2 || count == 3)) { next[i][j] = 1}
                    else if (this.game[i][j] == 0 && count == 3) { next[i][j] = 1}
                    else { next[i][j] = 0 } 
                }
            }
            //if (this.game === next && this.state.turn > 10) { this.update = false; }
            this.game = next;
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            turn: 0
        }
        this.game = new Array(this.props.height).fill(0).map(row => new Array(this.props.width).fill(0));
    }

    componentDidMount(): void {
        for (let i = 0; i < this.props.height; i++) {
            for (let j = 0; j < this.props.width; j++) {
                let r = Math.random();
                this.game[i][j] = r > 0.5 ? 1 : 0;
            }
        }
        this.update = this.props.start;
        this.timerID = setInterval(
            () => this.updateGame(),
            1000
        );
        
    }

    componentWillUnmount(): void {
        clearInterval(this.timerID);
    }

    render() {
        return (
            <div className="board">
                <table>
                    <tbody>
                    {this.game.map((row) => {
                        return (
                        <tr>
                            {row.map((col) => {
                                return (
                                    <Cell state={col} />
                                )
                            })}    
                        </tr>
                        )
                    })}
                    </tbody>
                </table>
                <h2 style={{color: "white"}}>Turn: {this.state.turn}</h2>
            </div>
        );
    }
}

export default GameOfLife;