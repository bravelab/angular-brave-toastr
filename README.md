ngBraveAjaxloader - Customizable preloader for all ajax-requests
================================================================


Use
---

1. Add `ngBraveAjaxloader` to your app modules
2. Add `<div brave-ajaxloader id="brave-ajaxloader">loading</div>` to HTML body


Development
-----------
To run the code in your development environment:

1. Run `git clone --recursive git@bitbucket.org:sizeof/angular-brave-ajaxloader.git angular-brave-ajaxloader`
2. Run `npm install`
3. Run `gulp` for watch changes in code

For development module on local

1. Run `bower link` on component directory
2. Go to the app root directory and run `bower link angular-brave-app-sceleton` 

Notice! You must re-link your bower module in app after changes in component 


Testing
-------

Run `gulp test` for karma tests
