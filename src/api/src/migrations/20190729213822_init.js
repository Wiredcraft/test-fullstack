exports.up = function(knex) {
  return knex.schema

    .createTable("users", function(table) {
      table
        .uuid("id")
        .unique()
        .primary()
        .notNullable()
      table
        .string("username")
        .unique()
        .notNullable()
      table.string("password").notNullable()
      table.timestamps(true, true)
    })

    .createTable("articles", function(table) {
      table
        .uuid("id")
        .unique()
        .primary()
        .notNullable()
      table
        .string("slug")
        .unique()
        .notNullable()
      table.string("title").notNullable()
      table.string("description").notNullable()
      table
        .uuid("author")
        .notNullable()
        .references("users.id")
        .onDelete("CASCADE")
      table.timestamps(true, true)
    })
    	  
    .createTable("voting", function(table) {
    	table
        .increments()
      table
        .string("articleid")
        .notNullable()
      table
        .string("authorid")
        .notNullable()
      table.timestamps(true, true)
    })

}

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("users")
    .dropTableIfExists("articles")
    .dropTableIfExists("voting")
}
