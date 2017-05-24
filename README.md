## Requirements

- PostgreSQL
- Node.js # `yarn`
- Python # 3

## Notes

- change `app/settings.py` => `DATABASES` fits your PostgreSQL setting
- need a *migrate* first, `python manage.py makemigrations lightning_talk` `python manage.py migrate`

## How to

- go `lightning_talk/static` directory and run `yarn && yarn run build` # bundle js/css file
- `pip install -r requirements.txt` # all Django needs
- `python manage.py runserver` # 8000 was the default port
