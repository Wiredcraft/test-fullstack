dataSource {
    pooled = true
    jmxExport = true
    driverClassName = "org.h2.Driver"
    username = "sa"
    password = ""
}
hibernate {
    cache.use_second_level_cache = true
    cache.use_query_cache = false
//    cache.region.factory_class = 'net.sf.ehcache.hibernate.EhCacheRegionFactory' // Hibernate 3
    cache.region.factory_class = 'org.hibernate.cache.ehcache.EhCacheRegionFactory' // Hibernate 4
    singleSession = true // configure OSIV singleSession mode
    flush.mode = 'manual' // OSIV session flush mode outside of transactional context
}

// environment specific settings
environments {
    development {
        dataSource {
            dbCreate = "update" // one of 'create', 'create-drop', 'update', 'validate', ''
            username = "flyingant"
            driverClassName = "com.mysql.jdbc.Driver"
            password = "flyingant"
            dialect = "org.hibernate.dialect.MySQL5InnoDBDialect"
            url = "jdbc:mysql://flyingant.mysql.rds.aliyuncs.com:3306/demo?characterEncoding=utf8"
            properties {
                maxActive = 100
                minIdle = 0
                initialSize = 0
                minEvictableIdleTimeMillis = 3 * 60 * 1000
                timeBetweenEvictionRunsMillis = 60 * 1000
                maxWait = 60000
                testOnBorrow = true
                testWhileIdle = false
                testOnReturn = false
                validationQuery = "select 1 from dual"
            }
        }
    }
    test {
        dataSource {
            dbCreate = "update"
            url = "jdbc:h2:mem:testDb;MVCC=TRUE;LOCK_TIMEOUT=10000;DB_CLOSE_ON_EXIT=FALSE"
        }
    }
    production {
        dataSource {
            dbCreate = "update" // one of 'create', 'create-drop', 'update', 'validate', ''
            username = "flyingant"
            driverClassName = "com.mysql.jdbc.Driver"
            password = "flyingant"
            dialect = "org.hibernate.dialect.MySQL5InnoDBDialect"
            url = "jdbc:mysql://flyingant.mysql.rds.aliyuncs.com:3306/demo?characterEncoding=utf8"
            properties {
                maxActive = 100
                minIdle = 0
                initialSize = 0
                minEvictableIdleTimeMillis = 3 * 60 * 1000
                timeBetweenEvictionRunsMillis = 60 * 1000
                maxWait = 60000
                testOnBorrow = true
                testWhileIdle = false
                testOnReturn = false
                validationQuery = "select 1 from dual"
            }
        }
    }
}
