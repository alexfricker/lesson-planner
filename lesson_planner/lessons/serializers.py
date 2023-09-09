from rest_framework.serializers import ModelSerializer
from rest_framework.serializers import SerializerMethodField
from rest_framework import serializers

from lesson_planner.lessons.models import Lesson
from lesson_planner.lessons.models import LessonNote
from lesson_planner.lessons.models import Reminder
from lesson_planner.lessons.models import Student


class StudentSerializer(ModelSerializer):
    class Meta:
        model = Student
        fields = "__all__"


class StudentMinimizedSerializer(ModelSerializer):
    class Meta:
        model = Student
        fields = ["id", "first_name", "last_name", "primary_instrument"]


class LessonSerializer(ModelSerializer):
    class Meta:
        model = Lesson
        fields = "__all__"


class LessonWithStudentSerializer(ModelSerializer):
    student = serializers.SerializerMethodField()

    def get_student(self, obj):
        return str(obj.student)

    class Meta:
        model = Lesson
        fields = [
            "student",
            "id",
            "is_trial",
            "lesson_datetime",
            "lesson_duration_minutes",
            "location",
            "room",
        ]


class StudentLessonSerializer(ModelSerializer):
    lesson_number = serializers.IntegerField()

    class Meta:
        model = Lesson
        fields = [
            "id",
            "lesson_number",
            "is_trial",
            "lesson_datetime",
            "lesson_duration_minutes",
            "location",
            "room",
        ]


class LessonNoteSerializer(ModelSerializer):
    class Meta:
        model = LessonNote
        fields = "__all__"


class LessonDetailSerializer(ModelSerializer):
    student = StudentMinimizedSerializer()
    notes = LessonNoteSerializer(many=True)
    previous_lesson = SerializerMethodField()
    next_lesson = SerializerMethodField()

    def get_previous_lesson(self, obj):
        # note: this is not very effecient. but its just me so idc
        prev_lesson = (
            obj.student.lessons.filter(lesson_datetime__lte=obj.lesson_datetime)
            .order_by("-lesson_datetime")
            .exclude(pk=obj.pk)
            .first()
        )
        if prev_lesson:
            return prev_lesson.pk
        return None

    def get_next_lesson(self, obj):
        # note: this is not very effecient. but its just me so idc
        next_lesson = (
            obj.student.lessons.filter(lesson_datetime__gte=obj.lesson_datetime)
            .order_by("lesson_datetime")
            .exclude(pk=obj.pk)
            .first()
        )
        if next_lesson:
            return next_lesson.pk
        return None

    class Meta:
        model = Lesson
        fields = "__all__"


class ReminderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reminder
        fields = "__all__"
