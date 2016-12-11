import React from 'react';
import $ from 'jquery';

class Singup extends React.Component{
  constructor(props){
    super(props);
    this.addUser = this.addUser.bind(this);
    this.state = { user }
  }

  componentDidMount(){
    
  }

  addUser(e){
    e.preventDefault();
    $.ajax('/')
  }


  render(){
    return (
      <div className="row">
        <form ref="form" className="col m4" onSubmit={this.addUser}>
          <input type="text" ref="user" placeholder="user" />
          <input type="password" ref="password" placeholder="password" />
          <button className="btn">Sing up</button>
        </form>

      </div>
    )
  }
}

export default Singup
