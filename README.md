# Image Search Abstraction Layer

+ User Story: I can get the image URLs, alt text and page urls for a set of images relating to a given search string.

+ User Story: I can paginate through the responses by adding a ?offset=2 parameter to the URL.

+ User Story: I can get a list of the most recently submitted search strings.

***

## Routes

**/api/imagesearch/lolcats%20funny?offset=10**
Returns a JSON object including url, snippet, thumbnail, context

?offset=x paginates the results

**/api/latest/imagesearch/**

Lists recently submitted strings
