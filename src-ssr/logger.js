// eslint-disable-next-line @typescript-eslint/no-var-requires
const gelf = require("graygelf")({
	host: "52.166.77.71",
	port: 12201
});

const log = function(msg) {
	if (process.env.APP_ENV === "production") {
		gelf.raw(msg);
	} else if (process.env.APP_DEBUG) {
		console.log(msg);
	} else {
		console.log(msg.short_message);
	}
};

module.exports = log;
