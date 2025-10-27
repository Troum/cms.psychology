module.exports = {
    apps: [
        {
            name: 'CMS Rozenkrants',
            port: '4208',
            exec_mode: 'cluster',
            instances: 'max',
            script: './.output/server/index.mjs',
        }
    ]
}
