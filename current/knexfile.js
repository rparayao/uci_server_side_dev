module.exports  = {
    development__: {
        client: 'mysql',
        connection: {
            host: 'localhost',
            database: 'monthly-bills',
            user: 'root',
            password: ''
        }
    },
    production: {
        client: 'postgresql',
        connection: 
            process.env.DATABASE_URL
    },
    development: {
        client: 'postgresql',
        connection: {
            database: 'monthly-bills',
            user: 'postgres',
            password: 'xxxx'
        }
    },
    test: {
        client: 'postgresql',
        connection: {
            database: 'monthly-bills-test',
            user: 'postgres',
            password: 'xxxxx'
        }
    }

};