module.exports = {
	apps: [
		{
			name: "Mett4",
			script: "./index.js",

			// Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
			exec_mode: "cluster",
			instances: -1,
			autorestart: true,
			watch: false,
			error_file: "./logs/pm2-error.log",
			out_file: "./logs/pm2-output.log",
			log_file: "./logs/pm2-combined.log",
			time: true,
			max_memory_restart: "200M",
			env: {
				APP_ENV: "production",
				PORT: 8080
			}
		}
	]
};
