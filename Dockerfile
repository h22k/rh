FROM php:8-fpm-alpine

RUN docker-php-ext-install pdo pdo_mysql curl

WORKDIR /var/www/html
COPY ./web .

RUN php artisan migrate
RUN php artisan migrate --database:pgsql

CMD php artisan serve