# REST API Endpoints

Endpoints are organized by entity type:

- [`Authentication`](#authentication)
- [`Author`](#author)
- [`CitationStyle`](#citationstyle)
- [`CitationStyleLink`](#citationstylelink)
- [`Journal`](#journal)
- [`JournalArticle`](#journalarticle)
- [`MyCollection`](#mycollection)
- [`User`](#user)

Endpoints have different access based on user role:
- API endpoints starting with `api/all/` will obtain results across all users, and are not intended to be exposed to users. They may be accessed by admins.
- Admins will not function as users (i.e. will not have their own personal collections of articles), to discourage unnecessary exposure of admin credentials. They can register for a separate user account to function as a user.

[Back to readme](README.md)

---
## `JournalArticle`


### `GET api/articles`
A user can get all of their own `JournalArticle`s but not those of other users.

| HTTP Request Type | Path | User Role | Request Body | Route Parameter | Expected HTTP Response Code | Expected Response Body |
| --- | --- | --- | --- | --- | --- | --- |
| GET | api/articles | user | `null` | n/a | 200 OK | `List<JournalArticle>` representing all of user's articles (or admin's personal articles) |
| GET | api/articles | admin | `null` | n/a | 404 Not Found | `null` |


---
### `GET api/all/articles`
An admin can get all `JournalArticle`s in the database regardless of what user they belong to. Non-admin users should not be able to access this.

| HTTP Request Type | Path | User Role | Request Body | Route Parameter | Expected HTTP Response Code | Expected Response Body |
| --- | --- | --- | --- | --- | --- | --- |
| GET | api/all/articles | admin | `null` | n/a | 200 OK | `List<JournalArticle>` including all articles for all users |
| GET | api/all/articles | user | `null` | n/a | 403 Forbidden |`null` |


---
### `GET api/all/articles/{articleId}`
An admin can look up any `JournalArticle` by its database ID. A user cannot.

| HTTP Request Type | Path | User Role | Request Body | Route Parameter | Expected HTTP Response Code | Expected Response Body |
| --- | --- | --- | --- | --- | --- | --- |
| GET | api/all/articles/{id} | admin | `null` | `JournalArticle` ID | 200 OK | `JournalArticle` with given id |
| GET | api/all/articles/{id} | user | `null` | `JournalArticle` ID | 403 Forbidden | `null` |


---
### `GET api/articles/journals/{journalId}`
A user can access all of their `JournalArticle`s filtered by a given `Journal`.

| HTTP Request Type | Path | User Role | Request Body | Route Parameter | Expected HTTP Response Code | Expected Response Body |
| --- | --- | --- | --- | --- | --- | --- |
| GET | api/articles/journals/{journalId} | user | `null` | `Journal` ID | 200 OK | `List<JournalArticle>` associated with given `Journal` ID |
| GET | api/articles/journals/{journalId} | admin | `null` | `Journal` ID | 404 Not Found | `null` |


---
### `GET api/articles/search/{searchTerm}`
A user can search all of the `JournalArticle`s belonging to them by author or title.

| HTTP Request Type | Path | User Role | Request Body | Route Parameter | Expected HTTP Response Code | Expected Response Body |
| --- | --- | --- | --- | --- | --- | --- |
| GET | api/articles/search/{searchTerm} | user | n/a | search term | 200 OK | `List<JournalArticle>` with author or title matching search term |
| GET | api/articles/search/{searchTerm} | admin | n/a | search term | 404 Not Found | `null` |


---
### `GET api/all/articles/search/{searchTerm}`
An admin can search all `JournalArticle`s in the database by author or title (regardless of what user the article belongs to).

| HTTP Request Type | Path | User Role | Request Body | Route Parameter | Expected HTTP Response Code | Expected Response Body |
| --- | --- | --- | --- | --- | --- | --- |
| GET | api/all/articles/search/{searchTerm} | admin | n/a | search term | 200 OK | `List<JournalArticle>` with author or title matching search term |
| GET | api/all/articles/search/{searchTerm} | user | n/a | search term | 403 Forbidden | `null` |


---
### `GET api/all/articles/aggregates/count`
An admin can view the total number of `JournalArticle`s in the database, regardless of what user owns them.

| HTTP Request Type | Path | User Role | Request Body | Route Parameter | Expected HTTP Response Code | Expected Response Body |
| --- | --- | --- | --- | --- | --- | --- |
| GET | api/all/articles/aggregates/count | admin | n/a | n/a | 200 OK | `number` representing total articles |
| GET | api/all/articles/aggregates/count | user | n/a | n/a | 403 Forbidden | `null` |


---
### `GET api/articles/aggregates/count`
A user can view the total number of `JournalArticle`s belonging to them.

| HTTP Request Type | Path | User Role | Request Body | Route Parameter | Expected HTTP Response Code | Expected Response Body |
| --- | --- | --- | --- | --- | --- | --- |
| GET | api/articles/aggregates/count | user | n/a | n/a | 200 OK | `number` representing total articles |
| GET | api/articles/aggregates/count | admin | n/a | n/a | 404 Not Found | `null` |


---
### `POST api/articles`
A user can create a `JournalArticle` that they then own. Admins cannot create `JournalArticle`s.

| HTTP Request Type | Path | User Role | Request Body | Route Parameter | Expected HTTP Response Code | Expected Response Body |
| --- | --- | --- | --- | --- | --- | --- |
| POST | api/articles | user | `JournalArticle` | n/a | 201 Created | `JournalArticle` |
| POST | api/articles | admin | `JournalArticle` | n/a | 405 Method Not Allowed | `null` |


---
### `PUT api/articles/{journalArticleId}`
A user can update a `JournalArticle` belonging to them. An admin cannot.

| HTTP Request Type | Path | User Role | Request Body | Route Parameter | Expected HTTP Response Code | Expected Response Body |
| --- | --- | --- | --- | --- | --- | --- |
| PUT | api/articles/{journalArticleId} | user | `JournalArticle` | ID of a `JournalArticle` belonging to user | 200 OK | `JournalArticle` |
| PUT | api/articles/{journalArticleId} | user | `JournalArticle` | ID of a `JournalArticle` *not* belonging to user | 403 Forbidden | `null` |
| PUT | api/articles/{journalArticleId} | admin | `JournalArticle` | `JournalArticle` ID | 405 Method Not Allowed | `null` |


---
### `PUT api/articles/{journalArticleId}/add-author/{authorId}`
A user can add an `Author` to a `JournalArticle` if the `JournalArticle` belongs to them. Admins cannot add `Author`s.

| HTTP Request Type | Path | User Role | Request Body | Route Parameter | Expected HTTP Response Code | Expected Response Body |
| --- | --- | --- | --- | --- | --- | --- |
| PUT | api/articles/{journalArticleId}/add-author/{authorId} | user | n/a | ID of `JournalArticle` belonging to user and ID of `Author` to add to article | 200 OK | `JournalArticle` |
| PUT | api/articles/{journalArticleId}/add-author/{authorId} | user | n/a | ID of `JournalArticle` *not* belonging to user, and any `Author` ID | 403 Forbidden | `null` |
| PUT | api/articles/{journalArticleId}/add-author/{authorId} | admin | n/a | any `JournalArticle` ID and `Author` ID | 405 Method Not Allowed | `null` |


---
### `PUT api/articles/{journalArticleId}/remove-author/{authorId}`
A user can delete an `Author` from a `JournalArticle` if the `JournalArticle` belongs to them. Admins cannot remove `Author`s.

| HTTP Request Type | Path | User Role | Request Body | Route Parameter | Expected HTTP Response Code | Expected Response Body |
| --- | --- | --- | --- | --- | --- | --- |
| PUT | api/articles/{journalArticleId}/remove-author/{authorId} | user | n/a | ID of `JournalArticle` belonging to user and ID of `Author` to remove from article | 200 OK | `JournalArticle` |
| PUT | api/articles/{journalArticleId}/remove-author/{authorId} | user | n/a | ID of `JournalArticle` *not* belonging to user, and any `Author` ID | 403 Forbidden | `null` |
| PUT | api/articles/{journalArticleId}/remove-author/{authorId} | admin | n/a | Any `JournalArticle` ID and `Author` ID | 405 Method Not Allowed | `null` |


---
### `DELETE api/articles/{journalArticleId}`
An user can delete any if their own `JournalArticle`s. This is a "soft delete" that maintains the record but sets its "enabled" status to false.

| HTTP Request Type | Path | User Role | Request Body | Route Parameter | Expected HTTP Response Code | Expected Response Body |
| --- | --- | --- | --- | --- | --- | --- |
| DELETE | api/articles/{journalArticleId} | user | n/a | ID of `JournalArticle` belonging to user | 204 No Content | `JournalArticle` |
| DELETE | api/articles/{journalArticleId} | user | n/a | ID of `JournalArticle` *not* belonging to user | 403 Forbidden | `null` |
| DELETE | api/articles/{journalArticleId} | admin | n/a | ID of any `JournalArticle` | 405 Method Not Allowed | `null` |

---
### `DELETE api/all/articles/{id}`
An admin can delete any user's `JournalArticle`s. This is a "soft delete" that maintains the record but sets its "enabled" status to false.

| HTTP Request Type | Path | User Role | Request Body | Route Parameter | Expected HTTP Response Code | Expected Response Body |
| --- | --- | --- | --- | --- | --- | --- |
| DELETE | api/all/articles/{journalArticleId} | admin | n/a | ID of `JournalArticle` to delete | 204 No Content | `JournalArticle` |
| DELETE | api/all/articles/{journalArticleId} | user | n/a | Any `JournalArticle` ID | 403 Forbidden | `null` |



---
## `MyCollection`


### `GET api/collections`
A user can view all of their collections. An admin will use a different endpoint for this functionality.

| HTTP Request Type | Path | User Role | Request Body | Route Parameter | Expected HTTP Response Code | Expected Response Body |
| --- | --- | --- | --- | --- | --- | --- |



---
### `GET api/all/collections/{myCollectionId}`
An admin can view any `MyCollection` by `myCollection` ID.

| HTTP Request Type | Path | User Role | Request Body | Route Parameter | Expected HTTP Response Code | Expected Response Body |
| --- | --- | --- | --- | --- | --- | --- |


---
### `GET api/all/collections/users/{userId}`
An admin can view all `MyCollection`s owned by a particular user.

| HTTP Request Type | Path | User Role | Request Body | Route Parameter | Expected HTTP Response Code | Expected Response Body |
| --- | --- | --- | --- | --- | --- | --- |


---
### `POST api/collections`
A user can create a `MyCollection`.

| HTTP Request Type | Path | User Role | Request Body | Route Parameter | Expected HTTP Response Code | Expected Response Body |
| --- | --- | --- | --- | --- | --- | --- |


---
### `PUT api/collections/{myCollectionId}`
A user can update a `MyCollection` if it belongs to them.

| HTTP Request Type | Path | User Role | Request Body | Route Parameter | Expected HTTP Response Code | Expected Response Body |
| --- | --- | --- | --- | --- | --- | --- |


---
### `PUT api/collections/{myCollectionId}/add-article/{journalArticleId}`
A user can add a `JournalArticle` to a `MyCollection` if if belongs to them.

| HTTP Request Type | Path | User Role | Request Body | Route Parameter | Expected HTTP Response Code | Expected Response Body |
| --- | --- | --- | --- | --- | --- | --- |


---
### `PUT api/collections/{myCollectionId}/remove-article/{journalArticleId}`
A user can remove a `JournalArticle` from a `MyCollection` if it belongs to them.

| HTTP Request Type | Path | User Role | Request Body | Route Parameter | Expected HTTP Response Code | Expected Response Body |
| --- | --- | --- | --- | --- | --- | --- |


---
### `DELETE api/collections/{myCollectionId}`
A user can delete a `MyCollection` if it belongs to them.

| HTTP Request Type | Path | User Role | Request Body | Route Parameter | Expected HTTP Response Code | Expected Response Body |
| --- | --- | --- | --- | --- | --- | --- |


---
### `DELETE api/all/collections/{myCollectionId}`
An admin can delete a `MyCollection` belonging to any user.

| HTTP Request Type | Path | User Role | Request Body | Route Parameter | Expected HTTP Response Code | Expected Response Body |
| --- | --- | --- | --- | --- | --- | --- |


---

## Documentation coming soon: 
## `Authentication`
## `Author`
## `CitationStyle`
## `CitationStyleLink`
## `Journal`
## `MyCollection`
## `User`