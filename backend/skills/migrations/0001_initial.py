# Generated by Django 4.2.10 on 2024-03-18 22:38

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Skill',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('acquired', models.BooleanField(default=False)),
                ('searching', models.BooleanField(default=False)),
            ],
        ),
    ]
