from django.shortcuts import render


def index(request):
    return render(request, 'client/dist/index.html')
