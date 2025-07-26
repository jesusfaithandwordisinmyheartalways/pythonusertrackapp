from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from .models import Note
from .serializers import NoteSerializer
import json

channel_layer = get_channel_layer()

def broadcast_notes():
    notes = Note.objects.all()
    serializer = NoteSerializer(notes, many=True)
    async_to_sync(channel_layer.group_send)(
        "notes",
        {
            "type": "note_update",
            "notes": serializer.data
        }
    )

@receiver(post_save, sender=Note)
def on_note_save(sender, instance, created, **kwargs):
    broadcast_notes()

@receiver(post_delete, sender=Note)
def on_note_delete(sender, instance, **kwargs):
    broadcast_notes()