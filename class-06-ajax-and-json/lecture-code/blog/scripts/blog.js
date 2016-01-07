var blog = {};
blog.articles = [];

blog.sortArticles = function() {
  blog.rawData.sort(function(a,b) {
    return a.publishedOn < b.publishedOn;
  });
};

blog.importArticles = function() {
  blog.rawData.forEach(function(ele) {
    blog.articles.push(new Article(ele));
  });
};

blog.appendArticle = function(a) {
  $('#articles').append(a.toHtml());
};

blog.setTeasers = function() {
  $('.article-body p:nth-of-type(n+2)').hide();
  $('#articles').on('click', 'a.read-on', function(e) {
    e.preventDefault();
    $(this).parent().find('p').show();
    $(this).hide();
  });
};

blog.populateFilters = function() {
  $('article').each(function() {
    if (!$(this).hasClass('draft')) {
      var val = $(this).find('address a').text();
      var option = '<option value="' + val + '">' + val + '</option>';
      $('#author-filter').append(option);

      val = $(this).data('category');
      option = '<option value="' + val + '">' + val + '</option>';
      if ($('#category-filter option[value=' + val + ']').length === 0) {
        $('#category-filter').append(option);
      }
    }
  });
};

blog.handleAuthorFilter = function() {
  $('#author-filter').on('change', function() {
    if ($(this).val()) {
      $('article').hide();
      $('article[data-author="' + util.slug($(this).val()) + '"]').fadeIn();
    } else {
      $('article').fadeIn();
      $('article.draft').hide();
    }
    $('#category-filter').val('');
  });
};

blog.handleCategoryFilter = function() {
  $('#category-filter').on('change', function() {
    if ($(this).val()) {
      $('article').hide();
      $('article[data-category="' + util.slug($(this).val()) + '"]').fadeIn();
    } else {
      $('article').fadeIn();
      $('article.draft').hide();
    }
    $('#author-filter').val('');
  });
};

blog.handleMainNav = function() {
  $('.main-nav').on('click', '.tab', function() {
    $('.tab-content').hide();
    $('#' + $(this).data('content')).fadeIn();
  });
  $('.main-nav .tab:first').click();
};

blog.initNewArticlePage = function() {
  $('.tab-content').show();
  $('#export-field').hide();
  $('#article-json').on('focus', function(){
    this.select();
  });
  blog.watchNewForm();
};

blog.watchNewForm = function() {
  $('#new-form').on('change', 'input, textarea', blog.buildPreview);
};

blog.buildPreview = function() {
  $('#articles').empty();

  var article = blog.buildArticle();
  blog.appendArticle(article);

  $('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
  });

  blog.exportJSON();
};

blog.buildArticle = function() {
  return new Article({
    title: $('#article-title').val(),
    author: $('#article-author').val(),
    authorUrl: $('#article-author-url').val(),
    category: $('#article-category').val(),
    markdown: $('#article-body').val(),
    publishedOn: $('#article-published:checked').length ? util.today() : null
  });
};

blog.exportJSON = function() {
  $('#export-field').show();
  $('#article-json').val(JSON.stringify(blog.buildArticle()) + ',');
};
