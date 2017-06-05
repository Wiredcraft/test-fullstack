## Features

- user sign in
- submit post
- upvote post => after upvote current page will reloading, you may find the post *disapper* (posts order changed)

## Not included

- user sign up => use Django's admin dashboard create user
- model level permission => so user A can delete user B's post (haven't try)
- and so on

## Requirements

- PostgreSQL
- Node.js & yarn
- Python 3

## How to

- go `lightning_talk/static` directory and run `yarn && yarn run build` => bundle js/css file
- `pip install -r requirements.txt`
- `python manage.py runserver` # open http://localhost:8000

## Notes

- before run server, you need a *migrate* first, `python manage.py makemigrations lightning_talk` && `python manage.py migrate`
- change `app/settings.py` `DATABASES` fits your PostgreSQL setting
- when test command runs, Django will create a test database with 'test_' prefix, and use role 'django' to connect PostgreSQL, so you need create role 'django' first, also give it 'createdb' permission.
