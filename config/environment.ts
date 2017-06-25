export default function environmentConfig(environment: 'development' | 'test' | 'production') {
  let config: any = {
    server: {
      port: process.env.PORT || 3000
    },
    database: {
      // url: 'sqlite://./db/backend.sqlite'
    },
    bodyParser: {
      type: 'application/*'
    }
  };

  if (environment === 'test') {
    // test-specific config
    config.github = {
      clientId: 'foo',
      clientSecret: 'bar'
    };
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
