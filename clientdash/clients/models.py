from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    tag = models.CharField(max_length=20, blank=True)

    bill_to1 = models.CharField(max_length=50, blank=True)
    bill_to2 = models.CharField(max_length=50, blank=True)
    bill_to3 = models.CharField(max_length=50, blank=True)
    bill_to4 = models.CharField(max_length=50, blank=True)

    phone = models.CharField(max_length=20, blank=True)
    fax = models.CharField(max_length=20, blank=True)

    role = models.PositiveSmallIntegerField(default=0, verbose_name="Role - 0: customer, 1: manager")
    unique_no = models.SmallIntegerField(default=0)


class Current(models.Model):
    SHORT = 'Short'
    ON = 'On'
    OFF = 'Off'
    STATUS_CHOICES = [
        (SHORT, 'Short status'),
        (ON, 'On status'),
        (OFF, 'Off status'),
    ]

    date = models.DateField()
    btu = models.IntegerField(default=0)
    prev_minutes = models.IntegerField(default=0)
    minutes = models.IntegerField(default=0)
    run_time = models.IntegerField(default=0)
    therms = models.FloatField(default=0)
    cost = models.FloatField(default=0)

    status = models.CharField(
        max_length = 10,
        choices = STATUS_CHOICES,
        default = OFF,
    )

    unit = models.ForeignKey(
        User, related_name="customer_unit", on_delete=models.CASCADE, null=True)

    def __str__(self):
        if hasattr(self.unit, 'username'):
            return self.unit.username + ' ' + str(self.date)
        return str(self.id) + ' ' + str(self.date)

    @classmethod
    def create(cls, date, btu, prev, cur, run, therms, cost, status, unit):
        try:
            tmp = User.objects.get(tag=unit)
            current = cls(date=date, btu=btu, prev_minutes=prev, minutes=cur, 
                run_time=run, therms=therms, cost=cost, status=status, unit=tmp)
            return current
        except:
            return None


class Historical(models.Model):
    date = models.DateField()
    amount = models.FloatField(default=0)
    quantity = models.FloatField(default=0)
    
    customer = models.ForeignKey(
        User, related_name="customer", on_delete=models.CASCADE, null=True)

    def __str__(self):
        if hasattr(self.customer, 'username'):
            return self.customer.username + ' ' + str(self.date)
        return str(self.id) + ' ' + str(self.date)
    
    @classmethod
    def create(cls, date, quantity, amount, customer):
        try:
            tmp = User.objects.get(tag=customer)
            historical = cls(date=date, quantity=quantity, amount=amount, customer=tmp)
            return historical
        except:
            return None


class Setting(models.Model):
    title = models.CharField(max_length=50, blank=True)
    invoice = models.IntegerField(default=0)
    dateDue = models.DateField()

    def __str__(self):
        return ('settings for ' + self.title)