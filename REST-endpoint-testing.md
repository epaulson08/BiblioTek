# REST API Endpoints for Testing

## `JournalArticle`

Note: API endpoints starting with `all` will obtain results across all users, and are not intended to be exposed to users. They may be accessed by admins.

| HTTP Request Type | Path | User Role | Request Body | Route Parameter | Expected HTTP Response Code | Expected Response Body |
| --- | --- | --- | --- | --- | --- | --- |
| GET | api/all/articles | admin | `null` | n/a | 200 OK | `List<JournalArticle>` including all articles for all users|
| GET | api/all/articles | user | `null` | n/a | 403 Forbidden |`null` |
| GET | api/articles | admin or user | `null` | n/a | 200 OK | `List<JournalArticle>` |  
| GET | api/all/articles/{jid} | 
| GET | api/articles |
| GET | api/all/articles/{id} |
| GET | api/articles/{id} |
| GET | api/articles/journals/{journalId} |
| GET | api/all/articles/search/{searchTerm}
| GET | api/articles/search/{searchTerm}
| GET | api/all/articles/aggregates/count
| POST | api/articles
| PUT | api/articles/{id}
| PUT | api/articles/{jaId}/authors/{authorId}
| DELETE | api/articles/{id}