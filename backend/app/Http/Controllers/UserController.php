<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class UserController extends Controller
{
    public $request;

    public function __construct(Request $request) {
      $this->request = $request;
    }

    public function getUserList() {
      $users = User::where('id', '!=', $this->request->user()->id)->get();

      return response(['data' => $users]);
    }
}
