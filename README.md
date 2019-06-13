Issue Tracker
==================

On the front-end,
- edit `public/client.js`, `public/style.css` and `views/index.html`
- drag in `assets`, like images or music, to add them to your project

On the back-end,
- your app starts at `server.js`
- add frameworks and packages in `package.json`
- safely store app secrets in `.env` (nobody can see this but you and people you invite)


Directions to use
-------------------
1. Website
    * **Note**:  All issues on the page are related to project ```apitest```
    * Fill the forms to submit, edit or delete an issue
    * Go to ```/api/issues/apitest``` to see all the issues

2. API
    * Request URL: ```/api/issues/{projectname}```
    * To submit issue: **POST** request to project URL
    * To get issue(s): **GET** request to project URL
    * To update issue(s): **PUT** request to project URL
    * To delete issue: **DELETE** request to project URL



Objectives
-------------------
- [x] Prevent cross site scripting(XSS attack).
- [x] I can POST /api/issues/{projectname} with form data containing required issue_title, issue_text, created_by, and optional assigned_to and status_text.
- [x] The object saved (and returned) will include all of those fields (blank for optional no input) and also include created_on(date/time), updated_on(date/time), open(boolean, true for open, false for closed), and _id.
- [x] I can PUT /api/issues/{projectname} with a _id and any fields in the object with a value to object said object. Returned will be 'successfully updated' or 'could not update '+_id. This should always update updated_on. If no fields are sent return 'no updated field sent'.
- [x] I can DELETE /api/issues/{projectname} with a _id to completely delete an issue. If no _id is sent return '_id error', success: 'deleted '+_id, failed: 'could not delete '+_id.
- [x] I can GET /api/issues/{projectname} for an array of all issues on that specific project with all the information for each issue as was returned when posted.
- [x] I can filter my get request by also passing along any field and value in the query(ie. /api/issues/{project}?open=false). I can pass along as many fields/values as I want.
- [x] All 11 functional tests are complete and passing


Testing
-------------------
For testing, the ```NODE_ENV``` variable needs to be set to testin the **.env** file


Live Project
-------------------
[\ ゜o゜)ノ](https://get-me-issues.glitch.me)
