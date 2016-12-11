import React from 'react';
import { Link } from 'react-router';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.links = this.links.bind(this);
  }

  componentDidMount() {
    window.jQuery('.button-collapse').sideNav();
  }

  links() {
    let navs = [
      {path: '/', text: 'Home'},
      {path: '/about', text:'About'}
      // {path: '/singup', text: 'Sing Up'}
    ]

    return navs.map( (nav, i) => {
      let active = this.props.location.pathname === nav.path ? 'active' : ''
      return (<li className={active} key={i}><Link to={nav.path}>{nav.text}</Link></li>);
    });
  }

  render() {
    return (
      <div>
        <nav className="grey darken-3">
          <div className="nav-wrapper">
            <Link to="/" className="brand-logo">Budget Boss</Link>
            <a href="#" data-activates="mobile" className="button-collapse">
              <i className="material-icons">menu</i>
            </a>
            <ul className="right hide-on-med-and-down">
              {this.links()}
            </ul>
            <ul className="side-nav" id="mobile">
              {this.links()}
            </ul>
          </div>
        </nav>
        {this.props.children}
      </div>
    )
  }
};

export default App;
