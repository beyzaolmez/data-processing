=====================
HTML coding standards
=====================

.. Note::
  Parts of this convention is taken from: 
  `https://docs.ckan.org/en/2.9/contributing/css.html`_


------
Naming
------

Naming of the document must be with camelCase lettering. ::

    /* GOOD */
    userLogin.html

    /* BAD */
    Userlogin.html
    user-login.html
    userlogin.html

----------
Formatting
----------

All HTML documents must use **four spaces** for indentation and there should be
no trailing whitespace. HTML5 syntax must be used and all attributes must use
double quotes around attributes. ::

    <video autoplay="autoplay" poster="poster_image.jpg">
      <source src="foo.ogg" type="video/ogg">
    </video>

HTML5 elements should be used where appropriate reserving ``<div>`` and
``<span>`` elements for situations where there is no semantic value (such as
wrapping elements to provide styling hooks).

------------------
Doctype and layout
------------------

All documents must be using the HTML5 doctype and the ``<html>`` element should
have a ``"lang"`` attribute. The ``<head>`` should also at a minimum include
``"viewport"`` and ``"charset"`` meta tags. ::

    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Example Site</title>
      </head>
      <body></body>
    </html>

-----
Forms
-----

Form fields must always include a ``<label>`` element with a ``"for"`` attribute
matching the ``"id"`` on the input. This helps accessibility by focusing the
input when the label is clicked, it also helps screen readers match labels to
their respective inputs. ::

    <label for="field-email">email</label>
    <input type="email" id="field-email" name="email" value=""/>

Each ``<input>`` should have an ``"id"`` that is unique to the page. It does not
have to match the ``"name"`` attribute.

Forms should take advantage of the new HTML5 input types where they make sense
to do so, placeholder attributes should also be included where relevant. ::

    <div>
      <label for="field-email">Email</label>
      <input type="email" id="field-email" name="email" value="name@example.com"/>
    </div>
    <div>
      <label for="field-phone">Phone</label>
      <input type="phone" id="field-phone" name="phone" value="" placeholder="+44 077 12345 678"/>
    </div>
    <div>
      <label for="field-url">Homepage</label>
      <input type="url" id="field-url" name="url" value="" placeholder="http://example.com"/>
    </div>

----
i18n
----

Don't include line breaks within ``<p>`` blocks.  ie do this: ::

  <p>Blah foo blah</p>
  <p>New paragraph, blah</p>

And **not**: ::

  <p>Blah foo blah
     New paragraph, blah</p>
