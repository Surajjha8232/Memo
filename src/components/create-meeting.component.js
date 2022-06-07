import React, { Component } from 'react';  
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import Navbar from './navbar.component';


export default class CreateMeeting extends Component{
    constructor(props){
        super(props); 
        this.onChangeNOM=this.onChangeNOM.bind(this);
        this.onChangeTOM=this.onChangeTOM.bind(this);
        this.onChangeDate=this.onChangeDate.bind(this); 
        this.onChangeDuration=this.onChangeDuration.bind(this); 


        
        this.onSubmit=this.onSubmit.bind(this);
        this.state={
            NOM: '', 
            tomValue:'',
            date: new Date(),
            duration:0,

            
            ddlTOM:[],
            ddlStatus:[],
            ddlCriticality:[]

        }

    }

    componentDidMount(){
        
            axios.get('http://localhost:5000/ddl/findTOM/')
            .then(response => {
                if(response.data.length > 0){
                    this.setState({
                        ddlTOM: response.data.map(ddltype => ddltype.value),
                        tomValue: response.data[0].value
                    })
                }
            })

    }

    onChangeNOM(e) {
        this.setState({
            NOM: e.target.value
        });
    }

    onChangeTOM(e) {
        this.setState({
            tomValue: e.target.value
        });
    }

   
   





    
    onChangeDate(date) {
        this.setState({
            date: date
        });
    }
    onChangeDuration(e) {
        this.setState({
            duration: e.target.value
        });
    }










    onSubmit(e){
        e.preventDefault();
        const meeting={
            NOM:this.state.NOM,
            tomValue:this.state.tomValue,
            date:this.state.date,
            duration:this.state.duration,


            
        }
        console.log(meeting)
        axios.post('http://localhost:5000/meeting/add',meeting)
            .then(res => console.log(res.data));
        window.location='/';
    }
    render(){
        return (
            
            <div>
                <Navbar />
                <h3> Create New Meeting </h3> 
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name Of Meeting: </label> 
                        <input 
                            type="text" 
                            className="form-control" 
                            value={this.state.NOM} 
                            onChange={this.onChangeNOM} 
                            /> 
                    </div>

                    <div className='form-group'>
                        <label>Type Of Meeting: </label>
                        <select ref="userTOM" 
                            required 
                            className="form-control" 
                            value={this.state.tomValue} 
                            onChange={this.onChangeTOM} >
                            {
                                this.state.ddlTOM.map(function(tom){
                                    return <option 
                                    key={tom} 
                                    value={tom}>{tom}
                                    </option>;
                                })
                            }        
                        </select>
                    </div>

                    
                    <div className="form-group">
                        <label>Date: </label> 
                        <div>
                        <DatePicker
                            selected={this.state.date} 
                            onChange={this.onChangeDate} 
                            /> 
                        </div>
                    </div> 

                    <div className="form-group">
                        <label>Duration (in minutes): </label> 
                        <input 
                            type="text" 
                            className="form-control" 
                            value={this.state.duration} 
                            onChange={this.onChangeDuration} 
                            /> 
                    </div>
                    <div className="form-group"> 
                    <input
                        type="submit" 
                        value="Create Meeting Log" className='btn btn-primary'  
                    />
                    </div>
                </form>
            </div> 
        )
        
    }
}
