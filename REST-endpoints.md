# REST API Endpoints for Testing

Note:
- API endpoints starting with `all` will obtain results across all users, and are not intended to be exposed to users. They may be accessed by admins.
- Admins will have the option to navigate the site as a user and have their own `JournalArticle`s. Thus they may also be accessing endpoints not starting with `all`.


## `JournalArticle`



### `GET api/all/articles`
Admin can get all `JournalArticle`s in the database regardless of who they belong to. Non-admin users should not be able to access this.

| HTTP Request Type | Path | User Role | Request Body | Route Parameter | Expected HTTP Response Code | Expected Response Body |
| --- | --- | --- | --- | --- | --- | --- |
| GET | api/all/articles | admin only | `null` | n/a | 200 OK | `List<JournalArticle>` including all articles for all users |
| GET | api/all/articles | user (unauthorized) | `null` | n/a | 403 Forbidden |`null` |
| GET | api/all/articles | any | bad data: arbitrary JSON | n/a | 400 Bad Request | `null` |



### `GET api/articles`
A user can get all of their own `JournalArticle`s but not those of other users. An admin can get all of their own personal articles.

| HTTP Request Type | Path | User Role | Request Body | Route Parameter | Expected HTTP Response Code | Expected Response Body |
| --- | --- | --- | --- | --- | --- | --- |
| GET | api/articles | admin or user | `null` | n/a | 200 OK | `List<JournalArticle>` representing all of user's articles (or admin's personal articles) |



### `GET api/all/articles/{articleId}`
An admin can look up any `JournalArticle` by its database ID.

| HTTP Request Type | Path | User Role | Request Body | Route Parameter | Expected HTTP Response Code | Expected Response Body |
| --- | --- | --- | --- | --- | --- | --- |
| GET | api/all/articles/{id} | admin only | `null` | `JournalArticle` id | 200 OK | `JournalArticle` with given id |



### `GET api/all/articles/journals/{journalId}`
An admin can access all `JournalArticle`s in the database regardless of which user owns them. They are filtered by `Journal` ID.



### `GET api/articles/journals/{journalId}`
A user can access all of their `JournalArticle`s filtered by a given `Journal`. An admin can do the same for their personal `JournalArticles`.



### `GET api/all/articles/search/{searchTerm}`
An admin can search all `JournalArticle`s in the database by author or title.



### `GET api/articles/search/{searchTerm}`
A user can search all of the `JournalArticle`s belonging to them by author or title; an admin can search their personal `JournalArticle`s.



### `GET api/all/articles/aggregates/count`
An admin can view the total number of `JournalArticle`s in the database, regardless of what user owns them.



### `GET api/articles/aggregates/count`
A user can view the total number of `JournalArticle`s belonging to them. An admin can view the total count of their personal `JournalArticle`s.



### `POST api/articles`
A user can create a `JournalArticle` that they then own. An admin can add a `JournalArticle` to their personal collection.



### `PUT api/articles/{id}`
A user can update a `JournalArticle`. An admin may only update their own personal `JournalArticle`s (though they can delete those of other users).



### `PUT api/articles/{jaId}/authors/{authorId}`
A user can add or remove an author from a `JournalArticle`. Admins can only edit their own articles (though they can delete those of other users).



### `DELETE api/all/articles/{id}`
An admin can delete any user's articles. This is a "soft delete" that maintains the record but sets its "enabled" status to false.



### `DELETE api/articles/{id}`
An user can delete any if their own articles. This is a "soft delete" that maintains the record but sets its "enabled" status to false.



### Deprecated:
- GET api/articles/{id}: an article's ID in the database is arbitrary will generally not be useful to a user.
