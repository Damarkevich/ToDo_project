from rest_framework import serializers

from tasks.models import Product, Material, MaterialProduct


class MaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Material
        fields = '__all__'


class ProductMaterialRateSerializer(serializers.ModelSerializer):
    material = MaterialSerializer(read_only=True)
    material_id = serializers.PrimaryKeyRelatedField(
        write_only=True, source='material', queryset=Material.objects.all())

    class Meta:
        model = MaterialProduct  # attention!!!
        fields = ('material', 'material_id', 'rate')


class ProductCreateSerializer(serializers.ModelSerializer):
    '''To create a product with existed material and a material rate(extra field) '''
    materials = ProductMaterialRateSerializer(many=True)

    class Meta:
        model = Product
        fields = ('id', 'name', 'materials')

    def create(self, validated_data):
        materials_data = validated_data.pop('materials')
        product = Product.objects.create(**validated_data)
        for material_data in materials_data:
            MaterialProduct.objects.create(
                product=product,
                material=material_data.get('material'),
                rate=material_data.get('rate'))
        return product


class MaterialProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = MaterialProduct
        fields = ('material_id', 'rate')


class ProductDisplaySerializer(serializers.ModelSerializer):
    '''To display product with related materials '''
    materials = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ('id', 'name', 'materials')

    def get_materials(self, product_instance):
        query_datas = MaterialProduct.objects.filter(product=product_instance)
        return [MaterialProductSerializer(material).data for material in query_datas]
