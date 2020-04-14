# DjangoBoard

[![Build Status](https://travis-ci.org/joojaeyoon/DjangoBoard.svg?branch=master)](https://travis-ci.org/joojaeyoon/DjangoBoard)

[API Doc](api_doc.md)


#### ToUse

```
~# cd frontend
~/frontend# yarn
~/frontend# yarn build
~/frontend# mv build ../app/

~# docker-compose build
~# docker-compose run app sh -c "python manage.py collectstatic"
~# docker-compose up
```

#### Environment

- Python3
- Django / Django-REST-Framework
- Docker / Docker-Compose
- React
- PostgresQL
