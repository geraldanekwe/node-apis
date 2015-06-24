# node-apis

API Endpoints

Gravitar Url:   /gravatarUrl/youremailaddress@something.com

When your server receives a request sent to  [server url]/gravatarUrl/[email address] , it will accept an email address from the url, and respond with the corresponding Gravatar url.

You can create this url by making an MD5 hash of the email address given, and then putting it into this example url:

http://www.gravatar.com/avatar/[HASH]



Math Calculator:  /Calc/4+5

This endpoint will take accept an arithmetic calculation in the URL, evaluate it, and then return the result.  It will take the form of two positive integers with one operator in between them.

It can accept addition, subtraction, multiplication, and division.




Sentence Counter:  /Counts/write something like this

This endpoint will accept a sentence string, and then count up the letters, spaces, words, and numbers in that string. Your server will return an object with all of the required counts.  