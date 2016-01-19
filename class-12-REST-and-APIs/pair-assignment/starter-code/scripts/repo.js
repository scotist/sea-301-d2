(function(module) {
  var repos = {};

  repos.all = [];

  repos.requestRepos = function(callback) {
    // DONE: How would you like to fetch your repos? Don't forget to call the callback.
    // fetch repos with ajax - 1st requirement done
    // write a success function to do something - 2nd requirement

    var qs = '?per_page=100&sort=updated';
    $.ajax({url:'https://api.github.com/users/scotist/repos' + qs,  type: 'GET', headers: {Authorization: 'token ' + token.githubToken}})
    .done(function(data, message, xhr) {
      repos.all = data;
      console.log(repos.all);
    })
    .done(callback);



  };

  // DONE: Model method that filters the full collection for repos with a particular attribute.
  // You could use this to filter all repos that have a non-zero `forks_count`, `stargazers_count`, or `watchers_count`.
  repos.with = function(attr) {
    return repos.all.filter(function(repo) {
      return repo[attr];
    });
  };

  module.repos = repos;
})(window);

// use this object-oriented style (using repo view) to access data via requests and update DOM
