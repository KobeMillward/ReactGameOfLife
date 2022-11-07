import React, { Component } from "react";
import PropTypes, { number } from "prop-types";
import Cell from "./Cell";
import "./GameOfLife.css";

class GameOfLife extends Component<{ height: number, width: number}, {turn: number}> {

    static propTypes = {
        height: number,
        width: number
    }

    static defaultProps = {
        height: 10,
        width: 10
    }

    game:number[][];
    timerID:NodeJS.Timer;

    updateGame():void {
        this.setState({turn: this.state.turn+1});
        for (let i = 0; i < this.props.height; i++) {
            for (let j = 0; j < this.props.width; j++) {
                const r = Math.random();
                if (r > 0.5) { this.game[i][j] = 1}
                else {this.game[i][j] = 0 }
            }
        }
    };

    constructor(props) {
        super(props);
        this.game = new Array(props.height).fill(0).map(row => new Array(props.width).fill(0));
        this.state = {
            turn: 0
        }
    }

    componentDidMount(): void {
        this.timerID = setInterval(
            () => this.updateGame(),
            1000
        )
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