import tweepy
from flask import jsonify
from data_structures import TweetSearch
import json
from collections import namedtuple

auth = tweepy.OAuthHandler((open('source\\server\\consumer_key.txt','r').read()), (open('source\\server\\consumer_secret.txt','r').read()))
auth.set_access_token((open('source\\server\\access_token.txt','r').read()), (open('source\\server\\access_token_secret.txt','r').read()))

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
