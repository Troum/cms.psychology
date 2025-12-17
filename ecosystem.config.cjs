module.exports = {
  apps: [
    {
      name: 'cms-psychology',
      script: 'pnpm',
      args: 'run dev',
      cwd: '/var/www/cms.rozenkrants.online',
      interpreter: 'none',
      exec_mode: 'fork',
      watch: false,
      env: {
        NODE_ENV: 'development',
        NODE_OPTIONS: '--no-deprecation',
        PORT: 4208,
      },
      error_file: './logs/error.log',
      out_file: './logs/out.log',
      time: true,
    },
  ],
}
