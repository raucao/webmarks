Frequently Asked Questions
==========================

## Why does the bookmarklet not work on some sites, like e.g. github.com?

The issue is caused by some site operators setting extremely strict CSP rules
for which scripts can execute on their pages.

However, according to the [CSP specification][1] these rules are not supposed
to stop user scripts like bookmarklets from executing:

> Enforcing a CSP policy should not interfere with the operation of
> user-supplied scripts such as third-party user-agent add-ons and JavaScript
> bookmarklets.

Unfortunately, most browsers do not adhere to that part of the specification
and thus make bookmarklets fail, when strict CSP rules are set.

Hence, the sorry answer is that there is nothing we can do in Webmarks to fix
this issue.

[1]: https://www.w3.org/TR/CSP/#processing-model
