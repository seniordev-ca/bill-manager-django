from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand
import csv
from django.contrib.auth.hashers import make_password


class Command(BaseCommand):
    def handle(self, *args, **options):
        User = get_user_model()
        users = []
        with open('customers.csv') as csvfile:
            readCSV = csv.reader(csvfile, delimiter=',')
            next(readCSV, None)
            for row in readCSV:
                if not User.objects.filter(tag=row[0]).exists():
                    users.append(User(
                        username = 'u{}'.format(row[0]),
                        first_name = row[2],
                        last_name = row[3],
                        email = row[4],
                        password = make_password(row[9]),
                        tag = row[0],
                        bill_to1 = row[1],
                        bill_to2 = row[5],
                        bill_to3 = "{0}, {1} {2}".format(row[6], row[7], row[8]),
                        bill_to4 = '',
                        role = 0,
                        unique_no = row[10]
                    ))
        print ('inserting {} users'.format(len(users)))
        print ('inserted {} users'.format(len(User.objects.bulk_create(users))))
