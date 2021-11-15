const express = require('express');
const request = require('request');

const router = express.Router();

router.get('/', (req, res) => {
	let symbol = req.query.symbol;
	let amount = req.query.amount;

	var options = {
		url: `https://pro-api.coinmarketcap.com/v1/tools/price-conversion?symbol=${symbol}&amount=${amount}`,
		method: 'GET',
		headers: { 
			'Content-Type': 'application/json', 
			'X-CMC_PRO_API_KEY': '36af9ea3-b8fc-445e-8ec2-d13e841ef482' 
		}
	};

	request.get(options, (err, resp, body) => {
		if (err) { return console.log(err); }

		var obj = JSON.parse(body);

		res.send({ 
			updated: obj.data.last_updated,
			symbol: obj.data.symbol,
			price: obj.data.quote["USD"].price
		 });
	});
});

module.exports = router;
