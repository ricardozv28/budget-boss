import React from 'react';
import $ from 'jquery';
import { Link } from 'react-router';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie} from 'recharts';


class Budgets extends React.Component {
  constructor(props) {
    super(props);
    this.addBudget = this.addBudget.bind(this);
    this.categories = this.categories.bind(this);
    this.state = { budgets: [] }
  }



  componentDidMount() {
    window.jQuery('select').material_select();

    $.ajax({
      url: '/api/budgets',
      type: 'GET',
      dataType: 'JSON'
    }).done( budgets => {
      this.setState({ budgets });
    });
  }

  categories() {
    let cate = [
      "Rent/Mortgage",
      "Utilities",
      "Debt Payment",
      "Transportation",
      "Health Care",
      "Food",
      "Household Supplies",
      "Gifts/Donations",
      "Personal",
      "Child Care",
      "Pets",
      "Recreation/Entertainment",
      "Others"
    ]

    return cate.map( (ca, i) => {
      return (<option key={i} defaultValue={ca}>{ca}</option>);
    });
  }

  addBudget(e) {
    e.preventDefault();
    let { category, cost, form} = this.refs;
    $.ajax({
      url: '/api/budgets',
      type: 'POST',
      data: { category: category.value, cost:cost.value }
    }).done( budget => {
      form.reset();
      this.setState({ budgets: [...this.state.budgets, {_id:budget._id, category:budget.category, cost:budget.cost}] });
      if(budget.category === "Gifts/Donations"){
        Materialize.toast('You are so Generous!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',4000)
      }
      else if(budget.category === "Pets"){
        Materialize.toast('Food for the little Boss',4000)
      }

      if(budget.cost <= 3){
        Materialize.toast('Get a second job, boss!', 4000)
      }
      else if( budget.cost >= 5000 ){
        Materialize.toast('Big Spender!!!!!!',4000)
      }
    });
  }

  byCategory(budgets) {
    let categories = [];
    budgets.map( budget => {
      let index = categories.findIndex( c => c.category === budget.category)
      if (index !== -1) {
        categories[index].cost += budget.cost
      } else {
        categories.push(budget);
      }
    })

    return categories;
  }

  render() {
    let budgets = this.state.budgets.map( budget => {
      return (
        <tr key={budget._id}>
          <td>{budget.category}</td>
          <td>{budget.cost}</td>
        </tr>
      )
    });

    return (
      <div className="row center">
        <div className="col m4">
        <form ref="form" onSubmit={this.addBudget}>
          <div className="input-field col s8">
            <select ref="category">
              <option defaultValue="Choose-your-category">Choose your category LIKE A BOSS</option>
              {this.categories()}
            </select>
            <label>Category</label>
          </div>
          <input ref="cost" required="true" placeholder="Cost $:" />
          <button className="btn red">Add Expense...like a boss</button>
        </form>
        <BarChart width={700} height={500} style={{marginTop: '100px'}} data={this.byCategory(this.state.budgets)}
          margin={{top: 5, right: 30, left: 20, bottom: 5}}>
          <XAxis dataKey="category"/>
          <YAxis/>
          <CartesianGrid strokeDasharray="3 3"/>
          <Tooltip/>
          <Legend />
          <Bar dataKey="cost" fill="#000000"/>
        </BarChart>
        </div>
        <div className="col offset-m2 m6">
          <h4>Spending History</h4>
          <div className="history" style={{height: '800px'}}>
          <table className="striped">
            <thead>
              <tr>
                <th>Category</th>
                <th>Cost ($)</th>
              </tr>
            </thead>
            <tbody>
              {budgets}
            </tbody>
          </table>
        </div>
        </div>
      </div>
    )
  }

}

export default Budgets;
