<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Chat;

class ChatController extends Controller
{
    public $request;

    public function __construct(Request $request) {
      $this->request = $request;
    }

    public function getConversationWithUser() {
      $userId = $this->request->input('user_id');
      $companions = [
        $userId, $this->request->user()->id
      ];

      $chat = Chat::whereIn('sender_id', $companions)
                  ->whereIn('receiver_id', $companions)
                  ->orderBy('created_at')
                  ->get();

      return response(['data' => $chat]);
    }

    public function sendNewMessage() {
      $receiverId = $this->request->input('receiver_id');
      $message = $this->request->input('message');

      $newMessage = [
        'sender_id' => $this->request->user()->id,
        'receiver_id' => $receiverId,
        'title' => '',
        'message' => $message,
        'read' => 0
      ];

      $msg = Chat::create($newMessage);

      $result = Chat::where('id', $msg->id)->first();

      return response(['data' => $result]);

    }
}
