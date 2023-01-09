from rest_framework import serializers
from users.models import CustomUser

from custom_urls.models import EmergencyQR, EmergencyName, EmergencyPhoneNumbers, EmergencyAddress

class NestedEmergencyQRSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmergencyQR
        fields = ('id', 'unique_key', 'image', 'dot_options_type', 'dot_options_color', 'background_options_color', 'corner_square_options_type', 'corner_square_options_color', 'corner_dot_options_type', 'corner_dot_options_color', 'author')

class NestedUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'username')

class NestedEmergencyNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmergencyName
        fields = ('id', 'descriptor', 'name', 'qr_code')

class NestedEmergencyPhoneNumbersSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmergencyPhoneNumbers
        fields = ('id', 'descriptor', 'phone_number', 'qr_code')

class NestedEmergencyAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmergencyAddress
        fields = ('id', 'descriptor', 'street', 'city', 'state', 'zip_code', 'qr_code')




class EmergencyQRSerializer(serializers.ModelSerializer):
    author_detail = NestedUserSerializer(read_only=True, source='author')
    name_detail = NestedEmergencyNameSerializer(many=True, read_only=True, source='emergency_name')
    phone_detail = NestedEmergencyPhoneNumbersSerializer(many=True, read_only=True, source='emergency_phone')
    address_detail = NestedEmergencyAddressSerializer(many=True, read_only=True, source='emergency_address')
    class Meta:
        model = EmergencyQR
        fields = fields = ('id', 'unique_key', 'image', 'dot_options_type', 'dot_options_color', 'background_options_color', 'corner_square_options_type', 'corner_square_options_color', 'corner_dot_options_type', 'corner_dot_options_color', 'author', 'author_detail', 'name_detail', 'phone_detail', 'address_detail')

class UserSerializer(serializers.ModelSerializer):
    qr_code_detail = NestedEmergencyQRSerializer(many=True, source='custom_urls', read_only=True)
    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'first_name', 'last_name', 'email', 'qr_code_detail')

class EmergencyNameSerializer(serializers.ModelSerializer):
    qr_code_detail = NestedEmergencyQRSerializer(many=True, source='custom_urls', read_only=True)
    class Meta:
        model = EmergencyName
        fields = ('id', 'descriptor', 'name', 'qr_code', 'qr_code_detail')

class EmergencyPhoneNumbersSerializer(serializers.ModelSerializer):
    qr_code_detail = NestedEmergencyQRSerializer(many=True, source='custom_urls', read_only=True)
    class Meta:
        model = EmergencyPhoneNumbers
        fields = ('id', 'descriptor', 'phone_number', 'qr_code', 'qr_code_detail')

class EmergencyAddressSerializer(serializers.ModelSerializer):
    qr_code_detail = NestedEmergencyQRSerializer(many=True, source='custom_urls', read_only=True)
    class Meta:
        model = EmergencyAddress
        fields = ('id', 'descriptor', 'street', 'city', 'state', 'zip_code', 'qr_code', 'qr_code_detail')
