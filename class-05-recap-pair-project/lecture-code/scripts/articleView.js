// Configure a view object, to hold all our functions for dynamic updates and article-related event handlers.
var articleView = {};

articleView.initNewArticlePage = function() {
    // Show the HTML form

    // Hide export field (but show it later when article content exists)

    // Add event handlers
    //   . Highlight selected input area
    //   . Update article (live preview)
  $('.tab-content').show();
  $('#export-field').hide();
  $('#article-json').on('focus', function(){
    this.select();
  });
  $('#new-form').on('change', 'input, textarea', articleView.create);
};

articleView.create = function() {
    // Remove existing article draft
  var article;
  $('#articles').empty();

  // Instantiate an article using data the user entered in the form fields

  article = new Article({
    title: $('#article-title').val(),
    author: $('#article-author').val(),
    authorUrl: $('#article-author-url').val(),
    category: $('#article-category').val(),
    body: $('#article-body').val(),
    publishedOn: $('#article-published:checked').length ? util.today() : null
  });

    // Call article's method that uses Handblebars to add this new article to the DOM
  $('#articles').append(article.toHtml());
  $('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
  });
    // Apply color/font syntax highlighting to all code blocks in the article

    // Show the export field and Export the new article as a JSON
    // string so it's ready to copy/paste into blogArticles.js
  $('#export-field').show();
  $('#article-json').val(JSON.stringify(article) + ',');
};
