import React from 'react'

const names = require('../baby-names.json')

class BabyNames extends React.Component {
    constructor() {
        super()
        this.initState = {
            names
        }
        this.state = this.initState
    }
    render() {
        return (
            <div>
                <table>
                    <th>Rank</th>
                    <th>Name</th>
                    <th>Syllables</th>
                {
                    this.state.names.map(nameObj => {
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
                    })
                }
                </table>

            </div>
        )
    }
}

export default BabyNames;