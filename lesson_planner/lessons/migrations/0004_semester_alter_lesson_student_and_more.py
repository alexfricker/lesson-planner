# Generated by Django 4.2.4 on 2023-09-08 03:43

from django.apps import apps
from django.db import migrations, models
from django.utils import timezone
import django.db.models.deletion

from lesson_planner.lessons.models import Lesson


def create_semester(*args, **kwargs):
    semester_model = apps.get_model("lessons", "semester")
    instance, created = semester_model.objects.get_or_create(
        name="Fall 2023",
        defaults={
            "start_date": timezone.datetime(year=2023, month=7, day=31),
            "end_date": timezone.datetime(year=2023, month=12, day=17),
        },
    )
    Lesson.objects.update(semester=instance)


class Migration(migrations.Migration):
    dependencies = [
        ("lessons", "0003_lesson_is_trial_alter_lesson_location"),
    ]

    operations = [
        migrations.CreateModel(
            name="Semester",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=80)),
                ("start_date", models.DateField()),
                ("end_date", models.DateField()),
            ],
        ),
        migrations.AlterField(
            model_name="lesson",
            name="student",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.PROTECT,
                related_name="lessons",
                to="lessons.student",
            ),
        ),
        migrations.AlterField(
            model_name="lessonnote",
            name="lesson",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="notes",
                to="lessons.lesson",
            ),
        ),
        migrations.AddField(
            model_name="lesson",
            name="semester",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.PROTECT,
                to="lessons.semester",
            ),
        ),
        migrations.RunPython(create_semester),
    ]