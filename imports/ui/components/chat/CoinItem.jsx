import React            from 'react';
import { Meteor }       from 'meteor/meteor';
import { check }        from 'meteor/check';

export default class CoinItem extends React.Component {

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    let number = this.refs.number.value;
    if (number > 0) {
      Meteor.call('coins.donate', this.props.coin._id, number);
      this.refs.number.value = '';
    }
  }

  render() {

    const { coin } = this.props;

    return (
      <div className="chat-special-bubble chat-special-bubble-coin">
          <div className="bubble-content">
              <i className="big-icon icon icon-euro"/>
              <div className="bubble-header">
                  <i className="icon icon-euro"/>
                  <span>Nouveau CoinZ !</span>
              </div>
              <h3>{coin.purpose}</h3>
              <h4>{coin.totalEarned} / {coin.goal} reçu</h4>
              <form className="merged" onSubmit={this.handleSubmit}>
                <input
                  className="small"
                  type="number"
                  ref="number"
                />
                <button className="small primary button"onClick={this.handleSubmit}>
                  Financer
                </button>
              </form>


          </div>
      </div>
    );
  }

}
