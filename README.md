# AcademicReferenceManager

## Description
This is a an academic reference management application which allows the user to enter bibliographic information about journal articles, persist this information within their account, and generate properly formatted citations in a variety of citation styles.

I have developed this project to practice "bread and butter" fundamentals of web development: an Angular user interface implementing Create, Read, Update, Delete (CRUD) functionality; REST APIs; object-relational mapping; and persistence to a relational database.

## How to Run
* Navigate to http://apps.ericpaulsondev.com:8080/RefTracker

## Topics and Technologies Used
* Database/ORM:
    * SQL
    * MySQL
    * JPA with Hibernate
* Back end:
    * Java 8
    * Spring Boot
    * Spring Data
    * Spring Security
    * Test-driven design with JUnit
    * Gradle
* REST API
* Front end:
    * Angular, TypeScript
    * Bootstrap
    * HTML/CSS

## API
| HTTP Method | Resource URI | Request Body | Returns | Functionality |
|-------------|--------------|--------------|---------|--------|
| GET         | `api/articles` |   void           | `List<JournalArticle>` | void | Gets all journal articles |
| GET | `api/articles/{id}` | void | `JournalArticle` | Gets one article by ID |
| GET | `api/articles/aggregates/count` | void | void | Obtains a total number of journal articles in the user's collection |
| POST | `api/articles` | `PayloadUtility`| `JournalArticle` | Creates a new journal article record |
| PUT | `api/articles/{id}` | `JournalArticle` |   `JournalArticle` | Replaces an existing journal article by ID |
| PUT | `api/articles/{jaId}/authors/{authorId}` | void | Associates an existing author with an existing journal article |
| DELETE | `api/articles/{id}` | void | `boolean` | Deletes an existing article by ID |
| GET | `api/journals` | void | `List<Journal>` | Gets all journals and orders by name |
| GET | `api/journals/search/{searchTerm}` | void | `List<Journal>` | Gets all journals with title or author containing the String `searchTerm` |