
# nyublind

A Hacker News lookalike written in Python/Django, modified for
NYU students

### Set up virtual environment
```shell script
python -m venv venv/
source venv/bin/activate
```

### Install Dependencies
```shell script
pip install -r requirements.txt
```

### Migrate Database
```shell script
python manage.py migrate
```

### Extra setup work
* Set ```DEBUG=True``` if necessary
* Add ```127.0.0.1``` to ```ALLOWED_HOSTS```

### Run Django Server
```shell script
python manage.py runserver
```
Now you can access the website at ```127.0.0.1:8000```.
