from django.contrib.auth import update_session_auth_hash
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required

@login_required
def change_password(request):
    if request.method == 'POST':
        old_password = request.POST.get('old_password')
        new_password = request.POST.get('new_password')
        user = request.user  # Assuming the user is already authenticated

        if user.check_password(old_password):
            user.set_password(new_password)
            user.save()
            update_session_auth_hash(request, user)  # Keep the session active after password change
            return JsonResponse({'success': 'Password changed successfully'})
        else:
            return JsonResponse({'error': 'Old password is incorrect'}, status=400)

    return JsonResponse({'error': 'Invalid request'}, status=400)
