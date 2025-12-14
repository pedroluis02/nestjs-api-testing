docker run -d \
    --name nestjs-api-postgresql-db \
    -p 5432:5432 \
    -v nestjs-api-postgresql-data:/var/lib/postgresql/data \
    -e POSTGRES_USER=postgres \
    -e POSTGRES_PASSWORD=postgres \
    -e POSTGRES_DB=nestjs-api-db \
    -e PGDATA=/var/lib/postgresql/data/pgdata \
    postgres:latest