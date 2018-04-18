<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Redis;
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

      $conversation = Chat::updateReadStatusAndGetConversation($companions);

      return response(['data' => $conversation->reverse()->values()]);
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

      $redis = Redis::connection();
      $redis->publish('message', $result);

      return response(['data' => $result]);

    }
}
