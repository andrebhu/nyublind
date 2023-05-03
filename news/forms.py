from django import forms

from .models import Comment, Story

import requests
API_URL = "https://api-inference.huggingface.co/models/kingsotn/finetuned_cyberbullying"
headers = {"Authorization": "Bearer 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"}

TOXIC_THRESHOLD = 0.3


# Call API model to detect toxicity in post
def query(payload):
    response = requests.post(API_URL, headers=headers,
                             json=payload, timeout=30)

    for item in response.json()[0]:
        if item['score'] >= TOXIC_THRESHOLD:
            return True

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
