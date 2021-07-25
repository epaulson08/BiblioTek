# AcademicReferenceManager

## Description
This application, in the same genre as apps like [Mendeley](https://www.mendeley.com/guides/desktop) or [EndNote](https://endnote.com/),
assists the user in managing references for academic papers they are writing. The user can enter bibliographic information about journal articles, save this information within their account, and generate properly formatted citations in a variety of citation styles.

I am developing this project to practice the following fundamental software development skills:
* Creation of a database layer with MySQL, MySQL Workbench, and SQL scripts and queries.
* Object-relational mapping (ORM): ORM is the process of correlating entities from a relational database (the "R" in ORM) with the objects ("O") of an object-oriented programming language like Java. Academic references are a good use case because there are a large number of relationships to be mapped: many `JournalArticle`s to one `Journal`, many `Author`s to many `JournalArticle`s, and so on. I manage this application layer with the Java Persistence API (JPA) as implemented by Hibernate.
* Test-driven design with JUnit.
* Design and implementation of microservices via a REST API (specification [here](REST-API/REST-endpoints.md)), and corresponding Java controller classes that return RESTful HTTP response codes.
* Full-stack implementation of Create, Read, Update, Delete (CRUD) functionality.
* Creating an intuitive and dynamic user interface with Angular, TypeScript, and Bootstrap.
* Building and deployment of a web application with Gradle, Spring Boot, and Amazon Web Services (AWS) services including EC2 instances and Route 53.

## How to Access
Navigate to http://apps.ericpaulsondev.com:8080/RefTracker.

## REST API Endpoints
Described in detail [here](REST-API/REST-endpoints.md).

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