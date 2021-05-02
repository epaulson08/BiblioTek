# EventTrackerProject

### Description
This is a an academic reference management application built with Angular, JPA, Spring Boot, Spring Data, and Spring REST. The user can enter bibliographic information about journal articles, with full CRUD functionality. Future directions will include citation generation in various formats (AMA, APA, Chicago, IEEE, MLA, etc.).

Part 1: Built back end repositories, services, and controllers for REST API.

Part 2: Built an (ugly) front end using Javascript and XMLHttpRequest objects to consume said REST API. Added a couple of additional full-stack CRUD implementations.

Part 3: Converted the front end to a (beautiful) Angular project.

### How to Run
* Currently the app is hosted on a local server, but it will soon be deployed on AWS.

### Topics and Technologies Used
Part 1:
* RESTful web design
* Spring framework, including Spring Boot, Spring Data, and Spring REST
* Test-driven design with JUnit
* Relational databases: MySQL, Java Persistence API with Hibernate
* Dependency management: Gradle

Part 2:
* Consuming a REST API
* JavaScript
* XMLHttpRequest objects
* HTML

Part 3:
* TypeScript
* Angular
* Bootstrap

### API
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

### Lessons Learned
Part 1:
This project illustrates some differences between Spring MVC and Spring Data and REST:
* Data access: in prior projects with Spring MVC, we have used a "data access object" that interfaced with the database. JPQL was used as a level of abstraction away from writing literal SQL queries and directly interfacing with JDBC. With Spring Data, there is yet another level of abstraction: a "repository" extends `JpaRespository` and abstracts away most of the "boilerplate" code otherwise needed for CRUD functionality.
* Front end: With Spring MVC, "models" and "views" are used to generate `jsp`s to which data is passed. With Spring REST, the controller exposes an API to be used in further front end development, instead of specifying "views".

Part 2:
* This was a first taste of dynamically building front-end HTML via JavaScript.
* The project was also a chance to consume a REST API from the front-end.
* Here, the full stack comes together: SQL, JPA with Hibernate, Spring Boot, Spring REST, Spring Data, a REST API, Javascript, HTML.

Part 3:
* Angular gives a more dynamic feel to the front end than previous projects using JSPs.
* Angular is a lot less tedious than writing pure JavaScript XMLHttpRequests!
* The type-safety of Typescript is a nice check on my worst developer impulses.
* Having already built the back end of the REST API, it is easy to completely refactor the front end. The REST development model allows a nice "separation of concerns."
* Angular/Bootstrap is helpful for making things look pretty.
* Angular: I am now a fan!