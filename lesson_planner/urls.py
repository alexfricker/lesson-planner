from django.contrib import admin
from django.urls import include
from django.urls import path
from rest_framework import routers

from lesson_planner.lessons.views import LessonViewSet
from lesson_planner.lessons.views import LessonNoteViewSet
from lesson_planner.lessons.views import ReminderViewSet
from lesson_planner.lessons.views import StudentViewSet

router = routers.DefaultRouter(trailing_slash=False)
router.register(r"lessons", LessonViewSet)
router.register(r"lesson_notes", LessonNoteViewSet)
router.register(r"students", StudentViewSet)
router.register(r"reminders", ReminderViewSet)

urlpatterns = [path("admin/", admin.site.urls), path("api/", include(router.urls))]
