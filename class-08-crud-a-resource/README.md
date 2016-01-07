# Assignment for Class 8 - Intro to SQL

Databases power web applications everywhere by enabling them to persist, modify, and query datasets to great effect. While there are many types of database options available now, Structured Query Language (SQL) remains the de facto standard for communicating with relational database systems. Let's build some SQL skills!

## User Stories
 - As a developer, I want article data to persist with SQL, so that I can store more and have more query flexibility.
 - As a developer, I want a more flexible editor page (editor/articles.html) that can add, update, or delete entries.
 - As an author, I want an admin mode with an edit link on each article (index.html?admin=true).
 - As an author, I want to load an existing article in the editor (editor/articles.html?id=42).
 - As an author, I want to have draft posts, so that I can save my writing without publishing.

## Technical Requirements and Grading Rubric
 - Keep your code linted, as you work. Clean up all concerns before submitting.
 - Continue to make good use of SMACSS principles.
 - Utilize webSQL (the via provided wrapper) to load and store articles information
 - Import the data into WebSQL from your JSON source.
 - Use browser query strings to determine if admin mode is enabled.
 - Ensure that draft posts are not viewable on index.html unless admin mode is enabled.

## Useful resources.
 - [SQLBolt](http://sqlbolt.com/) -- Interactive SQL Tutorial
 - [WebSQL introduction and example](http://html5doctor.com/introducing-web-sql-databases/)
 - [html5sql library](http://html5sql.com/) -- Consider including this library in your project to facilitate working with WebSQL
 - [Query String Primer](https://en.wikipedia.org/wiki/Query_string)
