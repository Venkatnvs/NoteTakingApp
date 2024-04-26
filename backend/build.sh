set -o errexit

python manage.py collectstatic --no-input

# check for database readiness and run migrations
if [ "$DATABASE" = "postgres" ]
then
    echo "Waiting for postgres..."

    while ! nc -z $DB_HOST $DB_PORT; do
        sleep 0.1
    done

    echo "PostgreSQL started"
fi

python manage.py makemigrations --no-input
python manage.py migrate --no-input

exec "$@"