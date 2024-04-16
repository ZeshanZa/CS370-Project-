# Generated by Django 4.2.10 on 2024-04-16 01:23

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('skills', '0010_master_skills'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='master_skills',
            name='category',
        ),
        migrations.RemoveField(
            model_name='master_skills',
            name='name',
        ),
        migrations.AddField(
            model_name='master_skills',
            name='DB',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=100), blank=True, default=list, size=None),
        ),
        migrations.AddField(
            model_name='master_skills',
            name='Exp',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=100), blank=True, default=list, size=None),
        ),
        migrations.AddField(
            model_name='master_skills',
            name='Lang',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=100), blank=True, default=list, size=None),
        ),
        migrations.AddField(
            model_name='master_skills',
            name='Pers',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=100), blank=True, default=list, size=None),
        ),
    ]