var React = require('react');
var ApiUtil = require('../util/api_util');
var ApiActions = require('../actions/api_action');
var Costs = [100000, 150000, 200000, 300000, 400000, 500000, 600000, 700000, 800000, 900000, 1000000, 1250000, 1500000, 1750000, 2000000];
var Beds = [0, 1, 2, 3, 4];
var Baths = [1, 1.5, 2, 2.5, 3, 3.5, 4];


function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

var SearchForm = React.createClass({
	getInitialState: function () {
		return ({
			location: "",
			category: "",
			pricelow: 0,
			pricehigh: 10000000,
			beds: 0,
			baths: 0,
			userid: null
		});
	},

	render: function() {

		var cost_selector = [];
		var bed_selector = [];
		var bath_selector = [];
		for (var x = 0; x < Costs.length; x++) {
			cost_selector.push(
				<option key={x} value={Costs[x]}>${numberWithCommas(Costs[x])}</option>
			);
		}
		for (var y = 0; y < Beds.length; y++) {
			if (Beds[y] === 0){
				bed_selector.push(
					<option key={y} value={Beds[y]}>Studio</option>
				);
			} else {
				bed_selector.push(
					<option key={y} value={Beds[y]}>{Beds[y]} bedrooms</option>
				);
			}
		}
		for (var z = 0; z < Baths.length; z++) {
			bath_selector.push(
				<option key={z} value={Baths[z]}>{Baths[z]} or more</option>
			);
		}

		return (

			<div className="search-field group">

					<form className="search group" onSubmit={this.handleSubmit}>
					<h1 className="search-header"> New York City Real Estate</h1>
					<label className="label-location">Location</label>


					<input className="location" onChange={this.updateLocation} type="text" placeholder="Neighborhood / Address / Building / Keyword" value={this.state.location}/>

					<label className="label-type">Type</label>
					<select className="type-select">
						<option value="condo">Condos</option>
						<option value="coop">Co-ops</option>
						<option value="house">Houses</option>
					</select>

					<label className="label-price">Price</label>
					<select className="cost-select">
						{cost_selector}
					</select>
					<p> to </p>
					<select className="cost-select">
						{cost_selector}
					</select>

					<label className="label-bed">Bedrooms</label>
					<select className="bed-select">
						{bed_selector}
					</select>

					<label className="label-bath">Bathrooms</label>
					<select className="bath-select">
						{bath_selector}
					</select>


						<button className="button">SEARCH</button>
					</form>
				</div>

		);
	},

	handleSubmit: function(e) {
		e.preventDefault();
		var user = {username: this.state.name, password: this.state.password};
		ApiUtil.login(user);
		this.hide();
	},

	updateLocation: function(e) {
		this.setState({ location: e.currentTarget.value });
	},
	updateCategory: function(e) {
		this.setState({ category: e.currentTarget.value });
	},
	updatePriceLow: function(e) {
		this.setState({ pricelow: e.currentTarget.value });
	},
	updatePriceHigh: function(e) {
		this.setState({ pricehigh: e.currentTarget.value });
	},
	updateBeds: function(e) {
		this.setState({ beds: e.currentTarget.value });
	},
	updateBaths: function(e) {
		this.setState({ baths: e.currentTarget.value });
	},
	updateUserId: function(e) {
		this.setState({ userid: e.currentTarget.value });
	}

});

module.exports = SearchForm;