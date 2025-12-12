module.exports = {
  apps: [
    {
      name: 'cms-psychology',
      script: 'pnpm',
      args: 'run start',
      cwd: '/var/www/cms.psychology',
      interpreter: 'none',
      exec_mode: 'fork',
      watch: false,
      env: {
        NODE_ENV: 'development',
        NODE_OPTIONS: '--no-deprecation',
        PORT: 4208
      },
      env_production: {
        NODE_ENV: 'production',
        NODE_OPTIONS: '--no-deprecation',
        PORT: 4208,
        HOSTNAME: '0.0.0.0'
      },
      error_file: './logs/error.log',
      out_file: './logs/out.log',
      time: true
    }
  ]
}
