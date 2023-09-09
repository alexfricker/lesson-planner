from django.contrib import admin

from lesson_planner.lessons.models import Lesson
from lesson_planner.lessons.models import LessonNote
from lesson_planner.lessons.models import Reminder
from lesson_planner.lessons.models import Semester
from lesson_planner.lessons.models import Student


admin.site.register(Lesson)
admin.site.register(LessonNote)
admin.site.register(Reminder)
admin.site.register(Semester)
admin.site.register(Student)
