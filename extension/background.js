function getCurrentTabUrl(callback) {
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    var tab = tabs[0];
    var url = new URL(tab.url)
    callback(url);
  });
}

chrome.browserAction.onClicked.addListener(function() {

    getCurrentTabUrl(function(url) {
    
        window.open('http://web.archive.org/save/'+encodeURI(url));

        if (url.hostname == 'www.reddit.com') {
            
            var commentsec = new RegExp("\/r\/([A-Za-z0-9][A-Za-z0-9_]{2,20})\/comments\/[0-9a-z]{6}\/.*"); /* full comment page or single comment */
            var singlecom = new RegExp("\/r\/([A-Za-z0-9][A-Za-z0-9_]{2,20})\/comments\/[0-9a-z]{6}\/.+\/[0-9a-z]{7}\/"); /* direct link to a single comment */
            
            if (commentsec.test(url.pathname)) {
                window.open('http://ceddit.com'+encodeURI(url.pathname+url.search));
            }
            
            if (!singlecom.test(url.pathname)) {
                window.open('http://megalodon.jp/pc/get_simple/decide?url='+encodeURI(url));
            }
            
            window.open('https://archive.is/?run=1&url=http://www.reddit.com'+encodeURIComponent(url.pathname+url.search));
        }
        else {
            window.open('http://megalodon.jp/pc/get_simple/decide?url='+encodeURI(url));
            window.open('https://archive.is/?run=1&url='+encodeURIComponent(url));
        }
    });
});