from django.db import models


class Material(models.Model):
    name = models.CharField(max_length=120)


class Product(models.Model):
    name = models.CharField(max_length=120)
    materials = models.ManyToManyField(Material, through='MaterialProduct')


class MaterialProduct(models.Model):
    material = models.ForeignKey(Material, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    rate = models.FloatField(default=100)
