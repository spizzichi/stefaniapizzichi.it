import os
import time

import webapp2
import jinja2
from google.appengine.ext import vendor
import logging

import json

# Add any libraries installed in the "lib" folder.
vendor.add('lib')

#import requests
from google.appengine.api import urlfetch

from collections import OrderedDict

from user_agents import parse

JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)

class MainPage(webapp2.RequestHandler):
    def get(self):
        logging.info('Starting Main handler')

        imgpath = 'large'

        ua_string = self.request.headers['User-Agent']

        user_agent = parse(ua_string)

        if user_agent.is_mobile:
            imgpath = 'small'
        elif user_agent.is_tablet:
            imgpath = 'medium'

        '''
        template_values = {
            'imgpath': imgpath,
        }
        '''
        with open('sp.json', 'r') as myfile:
            model=json.loads(myfile.read().replace('\n', ''))
            
        model["imgpath"] = imgpath
        model["works"] = OrderedDict(sorted(model["works"].items(), key= lambda x: x[1]['thumbindex'], reverse=False))

        template = JINJA_ENVIRONMENT.get_template('index-partial.html')
        self.response.write(template.render(model))

class Works(webapp2.RequestHandler):

    def get(self, work):
        
        headers = {
                   "Content-Type" : "application/json",
                   "Accept" : "application/json"
        }
        
        url = 'https://jsonblob.com/api/jsonBlob/56928c77e4b01190df48a7df?t=' + str(time.time())
        #result = urlfetch.fetch(url=url, headers=headers)
        #if result.status_code == 200:
        #model=json.loads(result.content)
        
        with open('sp.json', 'r') as myfile:
            model=json.loads(myfile.read().replace('\n', ''))
        
        
        '''
        model = {
            'works': {
                "arya" : {
                    "topbar" : "Arya",
                    "template" : "works/cover-text-imgs.html",
                    "h1" : "Arya",
                    "h3" : "fatto @ NABA",
                    "tag" : "packaging, web",
                    "imgs" : [{
                        "src" : "//src"
                    }]
                }
            }
         }
        '''
        
        tmodel = model["works"][work]
        tmodel["work"] = work
        template = JINJA_ENVIRONMENT.get_template(tmodel["template"])
        
        self.response.write(template.render(tmodel))

app = webapp2.WSGIApplication([
    ('/index-partial', MainPage),
    webapp2.Route(r'/works/<work>', handler=Works)
], debug=True)
