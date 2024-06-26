# Generated by Django 4.2.10 on 2024-04-08 02:47

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="FriendRequest",
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
                ("friendRequest_id", models.CharField(default="0", max_length=255)),
                (
                    "status",
                    models.CharField(
                        choices=[
                            ("pending", "Pending"),
                            ("accepted", "Accepted"),
                            ("rejected", "Rejected"),
                        ],
                        default="pending",
                        max_length=10,
                    ),
                ),
                (
                    "reqReceiver",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="reqReceiver",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
                (
                    "reqSender",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="reqSender",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Friend",
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
                ("friend_id", models.CharField(default="null", max_length=255)),
                (
                    "friend1",
                    models.ForeignKey(
                        default="null",
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="friend1",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
                (
                    "friend2",
                    models.ForeignKey(
                        default="null",
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="friend2",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
    ]
