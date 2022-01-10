from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, Http404, HttpResponseNotFound, HttpResponseBadRequest
from .models import *
import json
from datetime import datetime as dt
from django.contrib.auth.decorators import login_required


# @login_required(login_url = '/login')
def get_customers(request):
    users = User.objects.filter(role=0)
    res = {
        "users": []
    }
    for user in users:
        res['users'].append({
            "username": user.username,
            "tag": user.tag,
            "email": user.email,
            "firstName": user.first_name,
            "lastName": user.last_name,
            "billTo1": user.bill_to1,
            "billTo2": user.bill_to2,
            "billTo3": user.bill_to3,
            "billTo4": user.bill_to4
        })
    return JsonResponse(res)


# @login_required(login_url = '/login')
def info(request):
    try:
        tag = request.GET.get('tag', '')

        try:
            user = User.objects.get(tag=tag)
        except Exception as e:
            print (e)

        histories = Current.objects.filter(unit = user).order_by('-date')[:12]
        cur = histories[0]
        historicalGasUse = []
        for history in histories:
            historicalGasUse.insert(0, {
                "date": str(history.date),
                "amount": history.cost
            })
        
        settings = Setting.objects.first()
        
        info = {
            "title": settings.title,

            "client": {
                "id": user.tag,
                "name": user.first_name + ' ' + user.last_name,
                "billTo1": user.bill_to1,
                "billTo2": user.bill_to2,
                "billTo3": user.bill_to3,
                "billTo4": user.bill_to4,
                "phone": user.phone,
                "fax": user.fax,
                "email": user.email,
            },

            "invoice": settings.invoice + user.unique_no - 1,

            "dateDue": settings.dateDue,
            "gas": {
                "prev": cur.prev_minutes,
                "current": cur.minutes,
                "therms": cur.therms,
                "rate": 1.2,
                "amount": cur.cost
            },

            "payableTo": "Your Owner/Landlord",

            "notice": "Please Remember to clean or change your heater filter",

            "gasCost": historicalGasUse
        }

        return JsonResponse(info)
    except Exception as e:
        print (e)
        # raise Http404("Please contact administrator")
        return HttpResponseNotFound('<h1>Not found</h1>')


def bulk_settings(request):
    try:
        settings = json.loads (request.body)
        obj = Setting.objects.first()
        
        if obj is None:
            obj = Setting()
        
        obj.title = settings['title']
        obj.invoice = settings['invoice']
        obj.dateDue = settings['dateDue']

        obj.save()

        return HttpResponse("Settings Ok")
    except:
        return HttpResponseBadRequest('invalid parameters')


def bulk_currents(request):
    try:
        currents = json.loads (request.body)
        year = int(currents["year"])
        month = int(currents["month"])
        cur_date = dt(year, month, 1)
        try:
            Current.objects.filter(date=cur_date).delete()
        except Exception as e:
            print (e)
        
        for current in currents["data"]:
            # print (current)
            unit = current['Unit']
            if current['Unit'].startswith('C'):
                unit = '1' + current['Unit'][1:]
            obj = Current.create(cur_date, current['BTU'], current['Prev Minutes'], current['Minutes'], current['RunTime'], 
                current['Therms'], current['Cost'], current['Status'], unit)
            if obj:
                obj.save()

        return HttpResponse("Currents Ok")
    except:
        return HttpResponseBadRequest('invalid parameters')


def bulk_historicals(request):
    try:
        Historical.objects.all().delete()

        historicals = json.loads (request.body)
        for historical in historicals:
            print (historical)
            obj = Historical.create(dt.strptime(historical['date'], '%m/%d/%Y').date(), 
                historical['quantity'], float(historical['amount']), historical['customer'])
            if obj:
                obj.save()

        return HttpResponse("Historicals Ok")
    except:
        return HttpResponseBadRequest('invalid parameters')
