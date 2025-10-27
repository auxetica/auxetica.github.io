#!/usr/bin/python
print('Content-type: text/html\n')

import cgitb #
cgitb.enable() #These 2 lines will allow error messages to appear on a web page in the browser

import cgi
import random

q_template = open('data/question_template.html')
question_html = q_template.read()

print(question_html)