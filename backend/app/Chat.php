<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use App\User;

class Chat extends Model
{
    protected $fillable = [
      'sender_id', 'receiver_id', 'title', 'message', 'read'
    ];

    protected $appends = [
      'sender', 'receiver'
    ];

    public function getSenderAttribute() {
      return User::where('id', $this->sender_id)->first();
    }

    public function getReceiverAttribute() {
      return User::where('id', $this->receiver_id)->first();
    }

    public function getCreatedAtAttribute($value)
    {
        return Carbon::parse($value)->diffForHumans();
    }

    /**
    * @param array $companionsId
    */
    public static function updateReadStatusAndGetConversation($companionsId){
      self::whereIn('sender_id', $companionsId)
                        ->whereIn('receiver_id', $companionsId)
                        ->where('read', 0)
                        ->update(['read' => 1]);

      $conversationTarget = self::whereIn('sender_id', $companionsId)
                        ->whereIn('receiver_id', $companionsId)
                        ->orderBy('created_at', 'desc')
                        ->limit(10)
                        ->get();

      return $conversationTarget;
    }
}
