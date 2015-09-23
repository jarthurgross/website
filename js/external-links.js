/* JavaScript to force links to external domains to open in a new tab. Taken
 * from http://stackoverflow.com/a/4425214
 */

var links = document.links;

for (var i = 0, linksLength = links.length; i < linksLength; i++) {
   if (links[i].hostname != window.location.hostname) {
       links[i].target = '_blank';
   } 
}
