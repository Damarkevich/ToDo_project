from django.contrib import admin

from .models import Material, Product, MaterialProduct

admin.site.register(Material)
admin.site.register(Product)
admin.site.register(MaterialProduct)
