import json
from channels.generic.websocket import AsyncWebsocketConsumer
from .models import Note
from .serializers import NoteSerializer
from asgiref.sync import sync_to_async

class NoteConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.channel_layer.group_add("notes", self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard("notes", self.channel_name)

    async def receive(self, text_data):
        # Use ORM call inside an async context properly
        notes = await self.get_all_notes()
        serializer = NoteSerializer(notes, many=True)
        await self.channel_layer.group_send(
            "notes",
            {
                "type": "note_update",
                "notes": serializer.data
            }
        )

    async def note_update(self, event):
        await self.send(text_data=json.dumps({
            "type": "note_update",
            "notes": event["notes"]
        }))

    @sync_to_async
    def get_all_notes(self):
        return Note.objects.all()