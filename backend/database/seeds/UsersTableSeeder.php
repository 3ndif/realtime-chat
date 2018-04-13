<?php

use Illuminate\Database\Seeder;
use App\User;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user1 = [
          'email' => 'first@mail.ru',
          'password' => Hash::make('password'),
          'name' => 'John Brute'
        ];

        $user2 = [
          'email' => 'second@mail.ru',
          'password' => Hash::make('password'),
          'name' => 'Peter Bush'
        ];

        $user3 = [
          'email' => 'third@mail.ru',
          'password' => Hash::make('password'),
          'name' => 'Alexander Great'
        ];

        User::create($user1);
        User::create($user2);
        User::create($user3);
    }
}
