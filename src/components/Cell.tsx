import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Cell.css";

class Cell extends Component<{state: number}, {}> {

    cellState = "";

    updateState(state) {
        if (state === 0) { this.cellState = "cellDead"}
        else {this.cellState = "cellAlive"}
    }

    constructor(props) {
        super(props);
        this.updateState(props.state);
    }

    componentDidUpdate(prevProps: Readonly<{ state: number; }>): void {
        if (this.props.state !== prevProps.state) {
            this.updateState(this.props.state);
        }
    }

    render() {
        return (
            <td className={this.cellState}></td>
        )
    }
}

export default Cell;