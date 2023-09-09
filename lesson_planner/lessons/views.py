from django.db.models.expressions import Window
from django.db.models.functions import RowNumber
from django.db.models import F
from django.http import HttpResponseBadRequest
from django.shortcuts import get_object_or_404
from django.utils import timezone
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

from lesson_planner.lessons.models import Lesson
from lesson_planner.lessons.models import LessonNote
from lesson_planner.lessons.models import Reminder
from lesson_planner.lessons.models import Student
from lesson_planner.lessons.serializers import LessonSerializer
from lesson_planner.lessons.serializers import LessonDetailSerializer
from lesson_planner.lessons.serializers import LessonNoteSerializer
from lesson_planner.lessons.serializers import LessonWithStudentSerializer
from lesson_planner.lessons.serializers import ReminderSerializer
from lesson_planner.lessons.serializers import StudentLessonSerializer
from lesson_planner.lessons.serializers import StudentSerializer

viewsets.GenericViewSet


class StudentViewSet(viewsets.ViewSet):
    queryset = Student.objects.all().order_by("pk")
    serializer = StudentSerializer

    def split_lessons(self, lessons):
        cutoff = timezone.now() - timezone.timedelta(minutes=50)
        upcoming_lessons = []
        previous_lessons = []

        for lesson in lessons.order_by("-lesson_datetime"):
            if lesson.lesson_datetime >= cutoff:
                upcoming_lessons.append(lesson)
            else:
                previous_lessons.append(lesson)

        return upcoming_lessons, previous_lessons[:20]

    def list(self, request):
        pagination = PageNumberPagination()
        queryset = pagination.paginate_queryset(self.queryset, request)
        serializer = self.serializer(queryset, many=True)
        return pagination.get_paginated_response(serializer.data)

    def retrieve(self, request, pk=None):
        instance = get_object_or_404(Student, pk=pk)
        serializer = self.serializer(instance=instance)
        data = serializer.data

        lessons_queryset = instance.lessons.annotate(
            lesson_number=Window(
                expression=RowNumber(),
                partition_by=None,
                order_by=[F("lesson_datetime")],
            )
        )
        upcoming_lessons, previous_lessons = self.split_lessons(lessons_queryset)

        data["upcoming_lessons"] = StudentLessonSerializer(
            instance=upcoming_lessons, many=True
        ).data
        data["previous_lessons"] = StudentLessonSerializer(
            instance=previous_lessons, many=True
        ).data
        return Response(data)

    def create(self, request):
        if request.method == "POST":
            serializer = self.serializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            else:
                return Response(
                    {
                        "errors": serializer.errors,
                    },
                    status=HttpResponseBadRequest.status_code,
                )

        return HttpResponseBadRequest()


class LessonViewSet(viewsets.ViewSet):
    queryset = Lesson.objects.all().order_by("pk")
    serializer = LessonSerializer

    def list(self, request):
        query_params = request.query_params.dict()
        if (
            query_params.get("upcoming")
            and query_params.get("upcoming").upper() == "TRUE"
        ):
            queryset = (
                Lesson.objects.all()
                .filter(
                    lesson_datetime__gte=timezone.now() - timezone.timedelta(minutes=15)
                )
                .select_related("student")
                .order_by("lesson_datetime")[:3]
            )
            serializer = LessonWithStudentSerializer(queryset, many=True)
            return Response(serializer.data)

        pagination = PageNumberPagination()
        queryset = pagination.paginate_queryset(self.queryset, request)
        serializer = self.serializer(queryset, many=True)
        return pagination.get_paginated_response(serializer.data)

    def retrieve(self, request, pk=None):
        instance = get_object_or_404(Lesson, pk=pk)
        serializer = LessonDetailSerializer(instance=instance)
        return Response(serializer.data)

    def create(self, request):
        if request.method == "POST":
            serializer = self.serializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            else:
                return Response(
                    {
                        "errors": serializer.errors,
                    },
                    status=HttpResponseBadRequest.status_code,
                )

        return HttpResponseBadRequest()

    @action(detail=True, methods=["POST"])
    def add_note(self, request, pk=None):
        # self.get_object() ?
        instance = get_object_or_404(Lesson, pk=pk)
        data = request.data
        data["lesson"] = instance.pk
        serializer = LessonNoteSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=HttpResponseBadRequest.status_code)


class LessonNoteViewSet(viewsets.ViewSet):
    queryset = LessonNote.objects.all().order_by("pk")
    serializer = LessonNoteSerializer

    def destroy(self, request, pk=None):
        instance = get_object_or_404(LessonNote, pk=pk)
        instance.delete()
        return Response()


class ReminderViewSet(viewsets.ViewSet):
    queryset = Reminder.objects.all().filter(dismissed=False).order_by("pk")
    serializer = ReminderSerializer

    def list(self, request):
        pagination = PageNumberPagination()
        queryset = pagination.paginate_queryset(self.queryset, request)
        serializer = self.serializer(queryset, many=True)
        return pagination.get_paginated_response(serializer.data)

    def destroy(self, request, pk=None):
        instance = get_object_or_404(Reminder, pk=pk)
        instance.dismissed = True
        instance.dismissed_date = timezone.now()
        instance.save()
        return Response()

    def create(self, request):
        if request.method == "POST":
            serializer = self.serializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            else:
                return Response(
                    {
                        "errors": serializer.errors,
                    },
                    status=HttpResponseBadRequest.status_code,
                )

        return HttpResponseBadRequest()
