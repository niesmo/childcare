Package.describe({
	name: 'core',
	version: '0.0.1',
	// Brief, one-line summary of the package.
	summary: 'The main package that will be used to rendering the content',
	// URL to the Git repository containing the source code for this package.
	git: '',
	// By default, Meteor will default to using README.md for documentation.
	// To avoid submitting documentation, set this field to null.
	documentation: 'README.md'
});

Package.onUse(function(api) {
	api.use('meteor-platform');
	api.use('iron:router');

	api.versionsFrom('1.1.0.3');

	// Files that will be added to the api
	var clientFiles = [
		'client/templates/home.html',
		'client/main.html',
		'client/templates/app/layouts/layout.html',
		'client/templates/app/navbars/navbar.html',
		'client/templates/waitlist/waitlist.html',
		'client/templates/applications/applications.html'
	];
	api.addFiles(clientFiles, 'client');

	var libFiles = [
    'lib/routing/waitlist.js',
		'lib/routing/home.js',
		'lib/routing/applications.js'
  ];
  api.addFiles(libFiles);

  var serverFiles = [
    
  ];
  api.addFiles(serverFiles, 'server');
});

Package.onTest(function(api) {
	api.use('tinytest');
	api.use('core');
	api.addFiles('core-tests.js');
});
