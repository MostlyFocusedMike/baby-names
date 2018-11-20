import React from 'react'

const names = require('../baby-names.json')

class BabyNames extends React.Component {
    constructor() {
        super()
        this.initState = {
            names,
            spelling: "",
            sort: "rank",
            reversed: false
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

    handleReverseChange = (e) => {
        this.setState((prevState) => (
            {
                names: prevState.names.reverse(),
                reversed: !prevState.reversed
            }
        ));
    }

    sortingMethod = (a,b) => {
        if (this.state.sort === 'alpha' && !this.state.reversed) {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
        } else if (this.state.sort === 'rank' && !this.state.reversed) {
            return a.rank - b.rank
        } else if (this.state.sort === 'length' && !this.state.reversed) {
            return a.name.length - b.name.length
        } else if (this.state.sort === 'alpha' && this.state.reversed) {
            if (a.name < b.name) return 1;
            if (a.name > b.name) return -1;
            return 0;
        } else if (this.state.sort === 'rank' && this.state.reversed) {
            return b.rank - a.rank
        } else if (this.state.sort === 'length' && this.state.reversed) {
            return b.name.length - a.name.length
        }
    }

    render() {
        return (
            <div>
                <form>
                    <label htmlFor="spelling">Names that contain: </label>
                    <input 
                        type="text"
                        id="spelling"
                        name="spelling"
                        value={this.state.spelling}
                        onChange={this.handleSpellChange}
                    />
                    <label htmlFor="sort">Sort by:</label>
                    <select value={this.state.sort} onChange={this.handleSortChange} id="sort">
                        <option value="rank">Rank</option>
                        <option value="alpha">Alphabetically</option>
                        <option value="length">Length</option>
                    </select>
                    <label htmlFor="reverse">Reverse</label>
                    <input
                        id="reverse"
                        name="reverse"
                        type="checkbox"
                        checked={this.state.reversed}
                        onChange={this.handleReverseChange}
                    />
                </form>
                <table>
                    <th>Rank</th>
                    <th>Name</th>
                    <th>Syllables</th>
                {
                    this.state.names.sort(this.sortingMethod).map(nameObj => {
                        if (nameObj.name.toLowerCase().includes(this.state.spelling)) {
                            return (
                                <tr>
                                    <td>
                                        {nameObj.rank}
                                    </td>
                                    <td>
                                        {nameObj.name}
                                    </td>
                                    <td>
                                        {nameObj.syllables}
                                    </td>
                                </tr>
                            )
                        }
                    })
                }
                </table>

            </div>
        )
    }
}

export default BabyNames;