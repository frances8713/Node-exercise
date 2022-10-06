//curl https://jsonplaceholder.typicode.com/posts/1/comments --include 

//il valore del content-type è 
//content-type: application/json; charset=utf-8


MacBook-Air-di-Fabio:node francescafoglietta$ curl https://jsonplaceholder.typicode.com/posts/1/comments --include
HTTP/2 200 
date: Thu, 06 Oct 2022 08:13:07 GMT
content-type: application/json; charset=utf-8
x-powered-by: Express
x-ratelimit-limit: 1000
x-ratelimit-remaining: 997
x-ratelimit-reset: 1665037146
vary: Origin, Accept-Encoding
access-control-allow-credentials: true
cache-control: max-age=43200
pragma: no-cache
expires: -1
x-content-type-options: nosniff
etag: W/"5e6-4bSPS5tq8F8ZDeFJULWh6upjp7U"
via: 1.1 vegur
cf-cache-status: HIT
age: 6858
report-to: {"endpoints":[{"url":"https:\/\/a.nel.cloudflare.com\/report\/v3?s=bjh5HJ7sFLg2g9eznTVi7kNP9%2FEWIN1otnTCX4NVDEjmNl6o8YvJ2aZHvFex6KCvzDOwbMQP0pCo24nkHdb5VtY9fUMEy0T0CbwNHohfqkahiFZvWxlHs2dfLTwdPq5RUPwef3UBrgcSMURjXDsU"}],"group":"cf-nel","max_age":604800}
nel: {"success_fraction":0,"report_to":"cf-nel","max_age":604800}
server: cloudflare
cf-ray: 755cef994c7bbacf-MXP
alt-svc: h3=":443"; ma=86400, h3-29=":443"; ma=86400

[
  {
    "postId": 1,
    "id": 1,
    "name": "id labore ex et quam laborum",
    "email": "Eliseo@gardner.biz",
    "body": "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
  },
  {
    "postId": 1,
    "id": 2,
    "name": "quo vero reiciendis velit similique earum",
    "email": "Jayne_Kuhic@sydney.com",
    "body": "est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et"
  },
  {
    "postId": 1,
    "id": 3,
    "name": "odio adipisci rerum aut animi",
    "email": "Nikita@garfield.biz",
    "body": "quia molestiae reprehenderit quasi aspernatur\naut expedita occaecati aliquam eveniet laudantium\nomnis quibusdam delectus saepe quia accusamus maiores nam est\ncum et ducimus et vero voluptates excepturi deleniti ratione"
  },
  {
    "postId": 1,
    "id": 4,
    "name": "alias odio sit",
    "email": "Lew@alysha.tv",
    "body": "non et atque\noccaecati deserunt quas accusantium unde odit nobis qui voluptatem\nquia voluptas consequuntur itaque dolor\net qui rerum deleniti ut occaecati"
  },
  {
    "postId": 1,
    "id": 5,
    "name": "vero eaque aliquid doloribus et culpa",
    "email": "Hayden@althea.biz",
    "body": "harum non quasi et ratione\ntempore iure ex voluptates in ratione\nharum architecto fugit inventore cupiditate\nvoluptates magni quo et"
  }
