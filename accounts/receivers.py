#from django.core.signals import request_finished
from django.db.models.signals import pre_save, post_save, post_delete
from django.dispatch import receiver
from django.core.mail import send_mail
from django.core.mail import EmailMultiAlternatives

from django.conf import settings
from django.conf import settings
from django.core.mail import send_mail
from django.http import HttpResponse
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
import os

from .models import CustomUser, Invitation, EmailVerification, PasswordResetRequest


@receiver(pre_save)
def lower_email_addresses(sender, instance, **kwargs):
    if isinstance(instance, CustomUser):
        email = getattr(instance, 'email', None)
        if email:
            instance.email = email.lower()


@receiver(post_save)
def send_invitation_email(sender, instance, created, **kwargs):
    subject = 'Welcome to NYU Blind!'
    message = ''
    from_email = 'enedeniz2020@gmail.com'
    recipient_list = ['de2115@nyu.edu']
    api_key = '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'
    
    if not os.path.exists('sent_emails.txt'):
        open('sent_emails.txt', 'w').close()

    # Read the contents of the file into a list
    with open('sent_emails.txt', 'r') as f:
        sent_emails = f.read().splitlines()

    # Check if the recipient's email is already in the list of sent emails
    if recipient_list[0] in sent_emails:
        return HttpResponse('Email already sent to this recipient')
    # using SendGridAPIClient
    try:
        # create a Mail object
        mail = Mail(
            from_email=from_email,
            to_emails=recipient_list,
            subject=subject,
            html_content = """<html>
<head>
    <title>Welcome to NYU Blind!</title>
    <style>
        .nyu {
            font-size: 50px;
            color: purple;
            font-weight: bold;
        }
        .blind {
            font-size: 30px;
            color: grey;
        }
    </style>
</head>
<body>
    <p>Hello fellow NYU Student!</p>
    <p>Welcome to NYU Blind. You have successfully created an account and you are ready to use our forum based social media app freely. Feel free to reach out to the sender of this email if you have any questions or inquiries.<br> <br> Best Regards, <br> <br> Team B12</p>
    <p><span class="nyu">NYU</span> <span class="blind">Blind</span></p>
</body>
</html>""")
        # create a SendGridAPIClient object
        sg = SendGridAPIClient(api_key)
        # send the email
        response = sg.send(mail)
        with open('sent_emails.txt', 'a') as f:
            f.write(recipient_list[0] + '\n')
    except Exception as e:
        return HttpResponse(str(e), status=500)
        
    return HttpResponse('Email sent successfully!')
    return
    if created and isinstance(instance, Invitation):
        subject, from_email, to = 'You have been invited to %s'%(settings.SITE_DOMAIN), 'bot@python.sc', instance.invited_email_address
        text_content = """
You have been invited to news.python.sc.

Would you like to accept {inviting_user}'s invite?

Please sign up here: https://news.python.sc{url}

-- 
news.python.sc - A social news aggregator for the Python community.

""".format(inviting_user=instance.inviting_user.username, url=instance.get_register_url())
        #html_content = '<p>This is an <strong>important</strong> message.</p>'
        msg = EmailMultiAlternatives(subject, text_content, from_email, [to])
        #msg.attach_alternative(html_content, "text/html")
        msg.send()


@receiver(post_save)
def create_verification(sender, instance, created, **kwargs):
    if isinstance(instance, CustomUser):
        if instance.email:
            verifications = EmailVerification.objects.filter(user=instance, email=instance.email)
            if not verifications.count():
                create_v = True
            else:
                verified = any([i.verified for i in verifications])
                # create_v = not verified
                create_v = False
            
            if create_v:
                verification = EmailVerification(user=instance, email=instance.email)
                verification.save()


@receiver(post_save)
def send_verification_email(sender, instance, created, **kwargs):
    subject = 'Hello from Django!'
    message = 'This is a test email sent from Django using SendGrid.'
    from_email = 'enedeniz2020@gmail.com'
    recipient_list = ['de2115@nyu.edu']
    api_key = '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'
    if not os.path.exists('sent_emails.txt'):
        open('sent_emails.txt', 'w').close()

    # Read the contents of the file into a list
    with open('sent_emails.txt', 'r') as f:
        sent_emails = f.read().splitlines()

    # Check if the recipient's email is already in the list of sent emails
    if recipient_list[0] in sent_emails:
        return HttpResponse('Email already sent to this recipient')
    # using SendGridAPIClient
    try:
        # create a Mail object
        mail = Mail(
            from_email=from_email,
            to_emails=recipient_list,
            subject=subject,
            html_content="""<html>
<head>
    <title>Welcome to NYU Blind!</title>
    <style>
        .nyu {
            font-size: 50px;
            color: purple;
            font-weight: bold;
        }
        .blind {
            font-size: 30px;
            color: grey;
        }
    </style>
</head>
<body>
    <p>Hello fellow NYU Student!</p>
    <p>Welcome to NYU Blind. You have successfully created an account and you are ready to use our forum based social media app freely. Feel free to reach out to the sender of this email if you have any questions or inquiries. <br> <br> Best Regards, <br> <br> Team B12</p>
    <p><span class="nyu">NYU</span> <span class="blind">Blind</span></p>
</body>
</html>""")
        # create a SendGridAPIClient object
        sg = SendGridAPIClient(api_key)
        # send the email
        response = sg.send(mail)
        with open('sent_emails.txt', 'a') as f:
            f.write(recipient_list[0] + '\n')
    except Exception as e:
        return HttpResponse(str(e), status=500)
        
    return HttpResponse('Email sent successfully!')
    return 
    if created and isinstance(instance, EmailVerification):
        subject, from_email, to = 'Please confirm your account on news.python.sc', 'bot@python.sc', instance.email
        text_content = """
Please confirm your email address here:

https://news.python.sc{url}

-- 
news.python.sc - A social news aggregator for the Python community.

""".format(url=instance.get_verify_url())
        #html_content = '<p>This is an <strong>important</strong> message.</p>'
        msg = EmailMultiAlternatives(subject, text_content, from_email, [to])
        #msg.attach_alternative(html_content, "text/html")
        msg.send()


@receiver(post_save)
def send_password_reset_email(sender, instance, created, **kwargs):
    if created and isinstance(instance, PasswordResetRequest):
        subject, from_email, to = 'Reset password for your account on news.python.sc', 'bot@python.sc', instance.email
        text_content = """
Please confirm your email address here:

https://news.python.sc{url}

-- 
news.python.sc - A social news aggregator for the Python community.

""".format(url=instance.get_verify_url())
        #html_content = '<p>This is an <strong>important</strong> message.</p>'
        msg = EmailMultiAlternatives(subject, text_content, from_email, [to])
        #msg.attach_alternative(html_content, "text/html")
        msg.send()
