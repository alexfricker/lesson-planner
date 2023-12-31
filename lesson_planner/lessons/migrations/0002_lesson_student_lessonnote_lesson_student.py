# Generated by Django 4.2.4 on 2023-08-17 22:10

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("lessons", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Lesson",
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
                ("lesson_datetime", models.DateTimeField()),
                ("lesson_duration_minutes", models.IntegerField()),
                ("location", models.CharField(max_length=500)),
                ("room", models.CharField(blank=True, max_length=100, null=True)),
            ],
        ),
        migrations.CreateModel(
            name="Student",
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
                ("first_name", models.CharField(max_length=250)),
                ("last_name", models.CharField(blank=True, max_length=250, null=True)),
                (
                    "parent_first_name",
                    models.CharField(blank=True, max_length=250, null=True),
                ),
                (
                    "parent_last_name",
                    models.CharField(blank=True, max_length=250, null=True),
                ),
                ("contact_email", models.CharField(max_length=500)),
                (
                    "contact_phone",
                    models.CharField(blank=True, max_length=20, null=True),
                ),
                ("primary_instrument", models.CharField(max_length=20)),
                ("level", models.CharField(max_length=20)),
                (
                    "grade_school",
                    models.CharField(blank=True, max_length=200, null=True),
                ),
                ("age", models.IntegerField(blank=True, null=True)),
                ("grade", models.IntegerField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name="LessonNote",
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
                ("note_text", models.TextField()),
                (
                    "lesson",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="lessons.lesson"
                    ),
                ),
            ],
        ),
        migrations.AddField(
            model_name="lesson",
            name="student",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.PROTECT, to="lessons.student"
            ),
        ),
    ]
