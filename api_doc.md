## DjangoBoard API Doc

### 1. Article list

```
GET /api/articles/
```

- 전체 글 리스트를 반환합니다.
- 다음 페이지와 이전 페이지의 주소를 포함합니다.

##### Parameters

| Parameter | Types  | Description             |
| :-------- | :----- | :---------------------- |
| serach    | string | (선택) 검색할 글의 제목 |

##### Response Body

```
{
    "count": 38,
    "next": "http://localhost:8000/api/articles/?page=3",
    "previous": "http://localhost:8000/api/articles/",
    "results": [
        {
            "id": 28,
            "author": "root",
            "title": "dd",
            "created_at": "2020-02-15T13:48:57.264294+09:00",
        },
        {
            "id": 27,
            "author": "root",
            "title": "ss",
            "created_at": "2020-02-15T13:48:40.461911+09:00",
        },
        ...
        {
            "id": 14,
            "author": "root",
            "title": "ff",
            "created_at": "2020-02-15T13:48:17.016524+09:00",
        }
    ]
}
```

### 2. Article create

```
POST /api/articles/
```

- 새 글을 추가할 수 있습니다.

##### Parameters

| Parameter | Types  | Description                 |
| :-------- | :----- | :-------------------------- |
| author    | string | (필수) 작성자의 이름        |
| title     | string | (필수) 추가하려는 글의 제목 |
| text      | string | (필수) 추가하려는 글의 내용 |

##### Response Body

```

{
    "id": 47,
    "author": "User",
    "title": "New Article!!",
    "text": "New Text!!",
    "created_at": "2020-02-16T16:17:52.004901+09:00",
}
```

### 3. Article detail

```
GET  /api/articles/<article_pk>/
```

- 특정 글을 조회할 수 있습니다.
- 특정 글의 댓글들을 함께 조회합니다.

##### Parameters

| Parameter  | Types | Description               |
| :--------- | :---- | :------------------------ |
| article_pk | int   | (필수) 조회하려는 글의 id |

##### Response Body

```
{
    "id": 47,
    "author": "newuser",
    "comments": [
        {
            "id": 40,
            "author": "root",
            "text": "new comment!",
            "created_at": "2020-02-16T16:19:12.188078+09:00",
            "article": 47
        }
    ],
    "title": "New Article!!",
    "text": "New Text!!",
    "created_at": "2020-02-16T16:17:52.004901+09:00",
}
```

### 4. Comment create

```
POST /api/articles/<article_pk>/comment/
```

- 특정 글에 댓글을 추가합니다.

##### Parameters

| Parameter  | Types  | Description                      |
| :--------- | :----- | :------------------------------- |
| text       | string | (필수) 추가하려는 댓글의 내용    |
| article_pk | int    | (필수) 댓글을 추가하려는 글의 id |

##### Response Body

```
{
    "id": 40,
    "text": "new comment!",
    "created_at": "2020-02-16T16:19:12.188078+09:00",
    "article": 47,
    "author": "test"
}
```
