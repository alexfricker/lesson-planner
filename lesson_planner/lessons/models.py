from django.contrib.auth.models import AbstractUser
from django.db import models


class ApiUser(AbstractUser):
    use_dark_mode = models.BooleanField(default=False)


class Student(models.Model):
    first_name = models.CharField(max_length=250)
    last_name = models.CharField(max_length=250, blank=True, null=True)
    parent_first_name = models.CharField(max_length=250, blank=True, null=True)
    parent_last_name = models.CharField(max_length=250, blank=True, null=True)
    contact_email = models.CharField(max_length=500)
    contact_phone = models.CharField(max_length=20, blank=True, null=True)
    primary_instrument = models.CharField(max_length=20)
    level = models.CharField(max_length=20)
    grade_school = models.CharField(max_length=200, blank=True, null=True)
    age = models.IntegerField(blank=True, null=True)
    grade = models.IntegerField(blank=True, null=True)

    def __str__(self) -> str:
        return self.first_name + (f" {self.last_name}" if self.last_name else "")


class Semester(models.Model):
    name = models.CharField(max_length=80)
    start_date = models.DateField()
    end_date = models.DateField()

    def __str__(self) -> str:
        return self.name


class Lesson(models.Model):
    student = models.ForeignKey(
        Student, on_delete=models.PROTECT, related_name="lessons"
    )
    lesson_datetime = models.DateTimeField()
    lesson_duration_minutes = models.IntegerField()
    location = models.CharField(max_length=500, default="WPMA")
    room = models.CharField(max_length=100, blank=True, null=True)
    is_trial = models.BooleanField(default=False)
    semester = models.ForeignKey(
        Semester, on_delete=models.PROTECT, blank=True, null=True
    )

    def __str__(self) -> str:
        return f"{str(self.student)} ({self.lesson_duration_minutes} min): {self.lesson_datetime.isoformat()}"


class LessonNote(models.Model):
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE, related_name="notes")
    note_text = models.TextField()


class Reminder(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    reminder_text = models.TextField()
    dismissed = models.BooleanField(default=False, db_index=True)
    dismissed_date = models.DateTimeField(null=True, blank=True)

    def __str__(self) -> str:
        return f"{self.pk}: {self.reminder_text[:100]}"
