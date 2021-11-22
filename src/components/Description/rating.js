import React from 'react';
import './rate.css'
class Rater extends React.Component {
  render() {
      console.log("rating")
    let items = [];
    for (var i = 1; i < this.props.maxlength; i++) {
        console.log("gdgdas")
      let clickHandler = this.props.onSelected && this.props.onSelected.bind(null, i);
      items.push(<li key={i} className={i <= this.props.value ? 'filled' : ''} onClick={clickHandler}>{'\u2605'}</li>)
    }
    return (
      <ul className="rating">hello{items}</ul>
    )
  }
}
export default Rater;