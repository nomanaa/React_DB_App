import React, { useState } from 'react';
import axios from 'axios';
import tb from '../table.css';




class DbApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            task: "",
            refreelist: [],
            stadiumList: [],
            queryList: [],
            visible: false,
            showStadium: false,
            showQuery: false
        };
    }

    onSubmitClick = () => {
        axios.get('http://localhost:4000/task')
            .then(res => {

                console.log(res.data)
                this.setState({
                    refreelist: res.data

                })
            }).catch(error => {
                console.log(error)
            })
        this.setState({ visible: !this.state.visible })
    }
    onShowClick = () => {
        axios.get('http://localhost:4000/stadiumList')
            .then(res => {

                console.log(res.data)
                this.setState({
                    stadiumList: res.data

                })
            }).catch(error => {
                console.log(error)
            })
        this.setState({ showStadium: !this.state.showStadium })
    }
    onQueryClick = () => {
        axios.get('http://localhost:4000/queryList')
            .then(res => {

                console.log(res.data)
                this.setState({
                    queryList: res.data

                })
            }).catch(error => {
                console.log(error)
            })
        this.setState({ showQuery: !this.state.showQuery })
    }




    render() {
        const buttonText1 = this.state.visible ? "hide" : "show"
        const buttonText2 = this.state.showStadium ? "hide" : "show"
        const buttonText3 = this.state.showQuery ? "hide" : "show"
        return (
            <div>
                <h1> Welcome to European Soccer Database</h1>
                <div className='query'>
                    <p>Show me the Refree table</p>
                    <button className='Submit Button' onClick={
                        () => this.onSubmitClick()
                    }>{buttonText1}</button>
                </div>

                {this.state.visible ?
                    <div className='RefreeList' >
                        <div className='table-container'>
                            <table >
                                <thead>
                                    <tr>
                                        <th>Refree_ID</th>
                                        <th>Person_ID</th>
                                        <th>Refree_name</th>
                                        <th>Birthday</th>
                                        <th>Height</th>
                                        <th>Weight</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.refreelist.map((list) => (
                                        <tr>
                                            <td>{list.Refree_ID}</td>
                                            <td>{list.Person_ID}</td>
                                            <td>{list.Refree_name}</td>
                                            <td>{list.Birthdate}</td>
                                            <td>{list.Height}</td>
                                            <td>{list.Weight}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    : null
                }
                <div className='query1'>
                    <p>Show me the Stadium table</p>
                    <button className='Show ' onClick={
                        () => this.onShowClick()
                    }>{buttonText2}</button>
                </div>
                {this.state.showStadium ?
                    <div className='StadiumList' >
                        <div className='table-container'>
                            <table >
                                <thead>
                                    <tr>
                                        <th>Stadium_name</th>
                                        <th>Stadium_city</th>
                                        <th>Capacity</th>
                                        <th>Country_name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.stadiumList.map((list) => (
                                        <tr>
                                            <td>{list.Stadium_name}</td>
                                            <td>{list.Stadium_city}</td>
                                            <td>{list.Capacity}</td>
                                            <td>{list.Country_name}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    : null
                }
                <div className='query2'>
                    <p>Give me name of the cities in ascending order where Liverpool won a match as an away team</p>
                    <button className='Query1' onClick={
                        () => this.onQueryClick()
                    }>{buttonText3}</button>
                </div>

                {this.state.showQuery ?
                    <div className='QueryList' >
                        <div className='table-container'>
                            <table >
                                <thead>
                                    <tr>
                                        <th>Stadium_City</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.queryList.map((list) => (
                                        <tr>
                                            <td>{list.Stadium_city}</td>
                                            
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    : null
                }
            </div>
        )
    }
}

export default DbApp;