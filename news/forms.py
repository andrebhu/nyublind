from django import forms
from dotenv import load_dotenv
from .models import Comment, Story

import os

load_dotenv()
import requests
API_URL = "https://api-inference.huggingface.co/models/kingsotn/finetuned_cyberbullying"
HF_KEY = os.environ['HF_KEY']
headers = {"Authorization": f"Bearer {HF_KEY}"}

TOXIC_THRESHOLD = 0.3


# Call API model to detect toxicity in post
# Return True means it is toxic
def query(payload):

    response = requests.post(API_URL, headers=headers,
                             json=payload, timeout=30)

    # Remove later, used for demoing
    try:
        print(response.json()[0])
        for item in response.json()[0]:
            if item['score'] >= TOXIC_THRESHOLD:
                return True
    except:
        return False

    return False



class CommentForm(forms.ModelForm):
    class Meta:
        model = Comment
        fields = ['text']

    def clean(self):
        cleaned_data = super().clean()
        text = self.cleaned_data.get('text')

        title_output = query(text)

        if title_output:
            raise forms.ValidationError(
                "Toxicity Detected, comment will not continue")


class AddStoryForm(forms.ModelForm):
    class Meta:
        model = Story
        fields = ['title', 'url', 'text']

    def clean(self):
        cleaned_data = super().clean()

        title = self.cleaned_data.get('title')
        text = self.cleaned_data.get('text')
        url = self.cleaned_data.get('url')

        # query title and text for toxicity
        title_output = query(title)
        text_output = query(text)

        if title_output or text_output:
            raise forms.ValidationError(
                "Toxicity Detected, Post will not continue")
        if not title:
            raise forms.ValidationError("Please provide a title.")
        if (not text) and (not url):
            raise forms.ValidationError(
                "Please provide either a text or a URL.")


class StoryForm(forms.ModelForm):
    class Meta:
        model = Story
        fields = ['title', 'text']
