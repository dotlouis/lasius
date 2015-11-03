// thx https://gist.github.com/rishabhmhjn/7028079
angular.module('lasius')
.filter('hashtags',[
  '$filter',
  '$sce',
  function($filter, $sce) {
    return function(text, target) {
      if(!text) return text;

      // replace #hashtags and send them to twitter
      var replacePattern1 = /#(\w*[a-zA-Z_]+\w*)/gim;
      replacedText = text.replace(replacePattern1, '<a class="hashtag" ui-sref="app.search({query: \'#$1\'})">#$1</a>');

      // replace @mentions but keep them to our site
      var replacePattern2 = /\@(\w*[a-zA-Z_]+\w*)/gim;
      replacedText = replacedText.replace(replacePattern2, '<a class="hashtag" ui-sref="app.search({query: \'@$1\'})>#$1</a>');

      // not needed since we use angular-bind-html-compile
      // var trustedHtml = $sce.trustAsHtml(replacedText);
      // return trustedHtml;
      return replacedText;
    };
  }
]);
