import tweepy
from flask import jsonify
from collections import namedtuple
import json


auth = tweepy.OAuthHandler((open('consumer_key.txt','r').read()), (open('consumer_secret.txt','r').read()))
auth.set_access_token((open('access_token.txt','r').read()), (open('access_token_secret.txt','r').read()))

api = tweepy.API(auth)
def search_timeline(query):
    temp_list = []
    for tweet in tweepy.Cursor(api.search, q=query).items(20):
        status = api.get_status(tweet.id, tweet_mode="extended")
        try:
            temp_list.append({'name':tweet.user.screen_name,'tweet':status.retweeted_status.full_text,'location':tweet.user.location})
        except AttributeError:  # Not a Retweet
            temp_list.append({'name':tweet.user.screen_name,'tweet':status.full_text,'location':tweet.user.location})


    return jsonify(((temp_list)))
