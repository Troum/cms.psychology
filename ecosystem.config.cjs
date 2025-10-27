module.exports = {
  apps: [
    {
      name: 'cms-psychology',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 4208',
      cwd: '/var/www/cms.psychology',
      interpreter: 'node',
      exec_mode: 'fork',
      instances: 1,
      env: {
        NODE_ENV: 'production',
        NODE_OPTIONS: '--no-deprecation',
        PORT: 4208
      },
      error_file: './logs/error.log',
      out_file: './logs/out.log',
      time: true
    }
  ]
}
