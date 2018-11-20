import React from 'react'

const names = require('../baby-names.json')

class BabyNames extends React.Component {
    constructor() {
        super()
        this.initState = {
            names,
            spelling: "",
            sort: "rank",
            reversed: false,
            syllables: "0"
        }
        this.state = this.initState
    }

    handleSpellChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSortChange = (e) => {
        this.setState({sort: e.target.value});
    }

    handleSyllablesChange = (e) => {
        this.setState({syllables: e.target.value});
    }

    handleReverseChange = (e) => {
        this.setState((prevState) => (
            {
                names: prevState.names.reverse(),
                reversed: !prevState.reversed
            }
        ));
    }

    syllableCheck = (syllables) => {
        if (this.state.syllables == 0) {
            return true;
        } else {
            if (this.state.syllables == syllables) {
                return true;
            }
            return false;
        }
    }

    sortingMethod = (a,b) => { // I know this is not the right way to sort, this is just quick and dirty
        if (this.state.sort === 'alpha' && !this.state.reversed) {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
        } else if (this.state.sort === 'rank' && !this.state.reversed) {
            return a.rank - b.rank
        } else if (this.state.sort === 'length' && !this.state.reversed) {
            return a.name.length - b.name.length
        } else if (this.state.sort === 'syllables' && !this.state.reversed) {
            return a.syllables - b.syllables
        } else if (this.state.sort === 'alpha' && this.state.reversed) {
            if (a.name < b.name) return 1;
            if (a.name > b.name) return -1;
            return 0;
        } else if (this.state.sort === 'rank' && this.state.reversed) {
            return b.rank - a.rank
        } else if (this.state.sort === 'length' && this.state.reversed) {
            return b.name.length - a.name.length
        } else if (this.state.sort === 'syllables' && this.state.reversed) {
            return b.syllables - a.syllables
        }
    }

    render() {
        return (
            <div>
                <form>
                    <div id="spelling-inputs">
                        <label htmlFor="spelling">Names that contain: </label>
                        <input
                            type="text"
                            id="spelling"
                            name="spelling"
                            value={this.state.spelling}
                            onChange={this.handleSpellChange}
                        />
                    </div>
                    <div id="syllable-inputs">
                        <label htmlFor="syllables">Number of syllables:</label>
                        <select value={this.state.syllables} onChange={this.handleSyllablesChange} id="syllables">
                            <option value="0">Any</option>
                            <option value="5">5</option>
                            <option value="4">4</option>
                            <option value="3">3</option>
                            <option value="2">2</option>
                            <option value="1">1</option>
                        </select>
                    </div>
                    <div id="sorting-inputs">
                        <label htmlFor="sort">Sort by:</label>
                        <select value={this.state.sort} onChange={this.handleSortChange} id="sort">
                            <option value="rank">Rank</option>
                            <option value="alpha">Alphabetically</option>
                            <option value="length">Length</option>
                            <option value="syllables">Syllables</option>
                        </select>
                    </div>
                    <div id="reverse-inputs">
                        <label htmlFor="reverse">Reverse Sort: </label>
                        <input
                            id="reverse"
                            name="reverse"
                            type="checkbox"
                            checked={this.state.reversed}
                            onChange={this.handleReverseChange}
                        />
                    </div>
                </form>
                <div id="name-holder">
                    <div id="fake-table">
                        <div id="t-header">
                            <h2>Rank</h2>
                            <h2>Name</h2>
                            <h2>Syllables</h2>
                        </div>
                        <div id="t-body">
                            {
                                this.state.names.sort(this.sortingMethod).map(nameObj => {
                                    if (nameObj.name.toLowerCase().includes(this.state.spelling.toLowerCase()) && this.syllableCheck(nameObj.syllables)) {
                                        return (
                                            <div class="row">
                                                <div class="data">
                                                    {nameObj.rank}
                                                </div>
                                                <div class="data">
                                                    {nameObj.name}
                                                </div>
                                                <div class="data">
                                                    {nameObj.syllables}
                                                </div>
                                            </div>
                                        )
                                    }
                                })
                            }
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default BabyNames;