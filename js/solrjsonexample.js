
// derived from http://www.degraeve.com/reference/simple-ajax-example.php
function xmlhttpPost(strURL) {
    var xmlHttpReq = false;
    var self = this;
    if (window.XMLHttpRequest) { // Mozilla/Safari
        self.xmlHttpReq = new XMLHttpRequest(); 
    }
    else if (window.ActiveXObject) { // IE
        self.xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
    }
    self.xmlHttpReq.open('POST', strURL, false);
    self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    self.xmlHttpReq.onreadystatechange = function() {
        if (self.xmlHttpReq.readyState == 4) {
        	log.debug(self.xmlHttpReq.responseText);
            updatepage(self.xmlHttpReq.responseText);
        }
    }

    var params = getstandardargs().concat(getquerystring());
    var strData = params.join('&');
    self.xmlHttpReq.send(strData);
}

function getstandardargs() {
    var params = [
        'wt=json'
        , 'indent=on'
        , 'hl=true'
        , 'hl.fl=name,features'
        ];

    return params;
}
function getquerystring() {
  var form = document.forms['searchForm'];
  var query = form.search_field.value;
  qstr = 'q=' + escape(query);
  log.debug(qstr);
  return qstr;
}

// this function does all the work of parsing the solr response and updating the page.
function updatepage(str){
  document.getElementById("raw").innerHTML = str;
  var rsp = eval("("+str+")"); // use eval to parse Solr's JSON response
  var html= "<br>numFound=" + rsp.response.numFound;
  var first = rsp.response.docs[0];
  html += "<br>product name="+ first.name;
  var hl=rsp.highlighting[first.id];
  if (hl.name != null) { html += "<br>name highlighted: " + hl.name[0]; }
  if (hl.features != null) { html += "<br>features highligted: " + hl.features[0]; }
  alert(html);
  document.getElementById("result").innerHTML = html;
}
