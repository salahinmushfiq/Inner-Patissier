import uuid
from django.utils.deprecation import MiddlewareMixin

# class GuestTokenMiddleware:
#     def __init__(self, get_response):
#         self.get_response = get_response
#
#     def __call__(self, request):
#         # Check if the request has a guest token
#         guest_token = request.COOKIES.get('guest_token')  # or however you're storing it
#
#         if not guest_token:
#             # Create a new guest token if it doesn't exist
#             guest_token = str(uuid.uuid4())
#             request.COOKIES['guest_token'] = guest_token
#
#         # Pass the guest token to the request
#         request.guest_token = guest_token
#
#         response = self.get_response(request)
#         return response







class GuestTokenMiddleware(MiddlewareMixin):
    def process_request(self, request):
        guest_token = request.COOKIES.get("guest_token")

        if not guest_token:
            guest_token = str(uuid.uuid4())
            request.guest_token = guest_token  # Attach it to request
        else:
            request.guest_token = guest_token

    def process_response(self, request, response):
        if not request.COOKIES.get("guest_token"):
            response.set_cookie("guest_token", request.guest_token, httponly=True, samesite="Lax")
        return response

