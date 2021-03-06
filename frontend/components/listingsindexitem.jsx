var React = require('react');
var MarkerStore = require('../stores/marker');
var SessionStore = require('../stores/session');
var ReactRouter = require('react-router');
var ApiUtil = require('../util/api_util');
var ApiActions = require('../actions/api_action');
var hashHistory = ReactRouter.hashHistory;


function numberWithCommas(x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

var Listing = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return {saved: this.props.listing.saved};
  },

  place_marker: function () {
    var pos = {};
    pos.lat = this.props.listing.lat;
    pos.lng = this.props.listing.lng;
    var marker = new google.maps.Marker({
      position: pos,
    });
    ApiActions.updateMarker(marker, pos);
  },

  showListing: function (e) {
    e.preventDefault();
    target = e.target.className;
    if (target !== "save_button" && target !== "delete_button" ) {
      this.context.router.push('/listing/' + this.props.listing.id);
    }
  },
  saveListing: function () {
      if (this.props.loggedIn) {
        ApiUtil.saveListing(this.props.listing.id);
        this.setState({saved: !this.state.saved});
      } else {
        window.showModal();
      }
  },
  deleteListing: function () {
    ApiUtil.deleteListing(this.props.listing.id);
    this.setState({saved: !this.state.saved});
  },
  render: function () {
    var button;
    if (this.state.saved) {
      button = <button className="delete_button" onClick={this.deleteListing}> Delete </button>;
    } else {
      button = <button className="save_button" onClick={this.saveListing}> Save </button>;
    }


    return(
    <li onClick={this.showListing} onMouseEnter={this.place_marker} className="idx_listing group">
			<img className="idx_image" src={this.props.listing.image}></img>
			<p className="idx_address detail"> {this.props.listing.address}</p>
      <p className="idx_price detail"> ${numberWithCommas(this.props.listing.price)} FOR SALE</p>
      <p className="idx_beds detail"> {this.props.listing.beds} beds</p>
      <p className="idx_baths detail"> {this.props.listing.baths} bath</p>
      <p className="idx_category detail"> {this.props.listing.category} in {this.props.listing.neighborhood}</p>
      <p className="idx_company detail"> Listed by {this.props.listing.company}</p>
      {button}
  </li>);
 }
});

module.exports = Listing;
