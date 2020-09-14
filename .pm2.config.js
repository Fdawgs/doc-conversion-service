// Used by PM2 for deployment
module.exports = {
	apps: [
		{
			cwd: __dirname,
			env: {
				NODE_ENV: 'development'
			},
			env_production: {
				NODE_ENV: 'production'
			},
			exec_mode: 'cluster',
			instances: 16,
			name: 'doc-conv-api',
			script: './src/index.js',
			watch: ['./src/config.js', '.env.production']
		}
	]
};
