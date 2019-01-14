> Studying [ELK Stack](https://www.elastic.co/elk-stack)

So, I wanted to visualize all my services' logs in a single place. The idea here is to have a RabbitMQ
to queue all my application's logs, a Logstash consuming this queue, indexing the info on Elasticsearch
and visualizing it on Kibana. My RabbitMQ publisher is just an infinite loop so I could have data to see.

Running
```bash
$ docker-compose up --build
```

Shutting down
```
$ docker-compose down -v
```