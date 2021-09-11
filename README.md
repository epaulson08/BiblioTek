# BiblioTek

## Description
BiblioTek, in the vein of [Mendeley](https://www.mendeley.com/guides/desktop) or [EndNote](https://endnote.com/),
enables the user to manage references for academic papers. The user can enter bibliographic information about journal articles, save this information within their account, and generate citations formatted in a variety of citation styles.

I am developing this project to practice the following skills:
* Design and implementation of a MySQL relational database.
* Object-relational mapping (ORM): correlating entities from a relational database with objects from an object-oriented programming language (Java). I use the Java Persistence API (JPA) as implemented by Hibernate.
* Test-driven design with JUnit and Jasmine.
* Design and implementation of microservices and a REST API (specification [here](REST-API/REST-endpoints.md)).
* Full-stack implementation of create, read, update, delete (CRUD) functionality.
* Creation of an intuitive and dynamic user interface with Angular and TypeScript.
* Styling with Bootstrap.
* Deployment of a web application with Gradle, Spring Boot, and Amazon Web Services (AWS).

## How to Access
Navigate to http://apps.ericpaulsondev.com:8080/RefTracker.

## REST API Endpoints
Described in detail [here](REST-API/REST-endpoints.md).

## Features In Progress
* The user can download their citations in .docx format.
* The user can copy their citations to the clipboard.
* The user can customize the color scheme of the interface.
* The user can interact with more information on their dashboard:
    * Updating registration details
    * Viewing the date they joined the site
* Admins can access a separate admin dashboard.
* Deploying with Terraform?
* Changing the web container from Apache Tomcat to Docker?
* Deploying with HTTPS

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