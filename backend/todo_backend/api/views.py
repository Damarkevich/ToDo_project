from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response


from tasks.models import Product, Material, MaterialProduct
from .serializers import ProductDisplaySerializer, ProductCreateSerializer, MaterialSerializer


class Products(APIView):
    def get(self, request, format=None):
        products = Product.objects.all()
        serializer = ProductDisplaySerializer(products, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = ProductCreateSerializer(data=request.data)
        if serializer.is_valid():
            saved_obj = serializer.save()
            response_data = ProductDisplaySerializer(saved_obj).data
            return Response(response_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class Materials(APIView):
    def get(self, request, format=None):
        products = Material.objects.all()
        serializer = MaterialSerializer(products, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = MaterialSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
