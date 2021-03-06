# BiblioTek

![](./docs/images/demo-landing-page.png)

## Description
BiblioTek, in the vein of [Mendeley](https://www.mendeley.com/guides/desktop) or [EndNote](https://endnote.com/),
enables the user to manage references for academic papers. The user can enter bibliographic information about journal articles, save this information within their account, and generate citations formatted in a variety of citation styles.

## How to Access
Navigate to http://apps.ericpaulsondev.com:8080/BiblioTek.

## Features 

### Citation Formatting
For each journal article in a user's account, BiblioTek can generate citations based on rules for various citation standards:

[(Notes on implementation)](./docs/coming-soon.md)

![](./docs/images/demo-citation.png)

![](./docs/images/demo-citation-apa.png)

![](./docs/images/demo-citation-ieee.png)

![](./docs/images/demo-citation-nlm.png)


### My Collections
A user can organize subsets of their journal article collection by theme.

[(Notes on implementation)](./docs/coming-soon.md)

![](docs/images/demo-my-collections.png)

### Customized Palettes
A user can choose a color theme for their UI.

[(Notes on implementation)](./docs/impl-notes/color-palettes.md)

![](./docs/images/demo-palette-settings.png)

#### Based on their selection, the site could look like:
![](./docs/images/demo-palette-A.png)
![](./docs/images/demo-palette-C.png)
![](./docs/images/demo-palette-Y.png)

## Purpose
I am using this project as a prototype to practice full stack web development in a language- and framework-agnostic fashion. Academic citations lend themselves well to the create, read, update, delete (CRUD) operations that underlie most software. 

I have designed a REST API ([specification here](REST-API/REST-endpoints.md)), which will allow me to swap out different back and front end implementations as I learn new technologies.

## Project Architecture
### Implemented Technologies:
* Testing: JUnit, Jasmine, Postman
* Database: MySQL
* Object-relational mapping (ORM): Java Persistence API (JPA) implemented with Hibernate
* Back end: Java/Spring Boot
* Front end: TypeScript/Angular
* Styling: Bootstrap, Sass

### Database Layer
The database is implemented with MySQL, and developed with MySQL Workbench.

#### Schema:
![](./docs/images/db-schema.png)

### REST API Endpoints
Described in detail [here](REST-API/REST-endpoints.md).

### Testing Frameworks
I have implemented testing with JUnit, Jasmine, and Postman. Documentation is coming soon about some lessons learned.

## In Progress
### Features In Progress
* Improve accessibility for users. Fulfill Web Content Accessibility Guidelines (WCAG).
* Improve UI for smaller screens and mobile devices.
* Add create/update/delete functionality for `Journal` entities.
* The user can interact with more information on their dashboard:
    * Updating registration details
    * Viewing the date they joined the site
    * Customizing citation style options
* The user can access a tutorial explaining site functionality.
* If the user has no articles, they are prompted with a tutorial option for adding articles.
* The user can copy their citations to the clipboard.
* Admins can access a separate admin dashboard.
* Improve existing color palette choices and add more.

### Pending Fixes
* Find and fix bugs in citation formatting.
* Fix Edit button on `#/my-collections` page.
* Prettify UI on `#/my-collection/{collId}` page.
* When editing a `JournalArticle`, allow the user to add and remove authors.
* Improve test coverage throughout.

### Planned Refactors
* Remove all references to old name ("RefTracker")
* Break down and modularize excessively long Angular components (e.g. `DisplayArticleComponent`'s template currently weighs in at 342 lines).
    * This refactor may have been misguided. It creates complexity through two-way bindings in parent/child components (`DisplayArticle`, `ArticleCardBody`, and `ArticleCardFooter`). It might make sense to "defactor" back into one large component, but improve variable naming to show which variables reflect UI actions, and which reflect changes to models.