export default function environmentConfig(environment) {
  let config = {
    server: {
      port: process.env.PORT || 3000
    },
    ormAdapter: 'node-orm2',
    database: {
      url: 'sqlite://../db/backend.sqlite'
    },
    webhookSecret: process.env.WEBHOOK_SECRET || 'oursecrethere'
  };

  if (environment === 'development') {
    // development-specific config
  }

  if (environment === 'production') {
    // production-specific config

    // You can start Denali in SSL mode by providing your private key and
    // certificate, or your pfx file contents
    //
    //   config.server.ssl = {
    //     key: fs.readFileSync('privatekey.pem'),
    //     cert: fs.readFileSync('certificate.pem')
    //   };
    //
    // or,
    //
    //   config.server.ssl = {
    //     pfx: fs.readFileSync('server.pfx')
    //   };
    //
  }

  return config;
}
